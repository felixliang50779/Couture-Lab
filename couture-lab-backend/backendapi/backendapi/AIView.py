from langchain.schema import BaseOutputParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import AISerializer
from dotenv import load_dotenv
from openai import OpenAI
from django.http import StreamingHttpResponse

import json
import requests
import django
import concurrent.futures
import os


valid_countries = ["US", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "IT", "MX", 
"NL", "SG", "ES", "TR", "AE", "GB", "JP", "SA", "PL", "SE", "BE", "EG"]

# Fetch country code of user
def get_country_code():
    url = "https://ip-geo-location.p.rapidapi.com/ip/check"

    querystring = {"format":"json"}

    headers = {
    	"X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
    	"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        country_dict = response.json()

        country = country_dict["country"]["code"]

        return country

    return f"Error: Unable to fetch country data. Status code: {response.status_code}"

# Fetch local (to user) weather data
def get_local_weather():
    url = "https://ip-geo-location.p.rapidapi.com/ip/check"

    querystring = {"format":"json"}

    headers = {
        "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
        "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        geolocation_dict = response.json()

        latitude, longitude = geolocation_dict["location"]["latitude"], geolocation_dict["location"]["longitude"]

        url = "https://weatherapi-com.p.rapidapi.com/current.json"

        querystring = {"q":f"{latitude},{longitude}"}

        headers = {
            "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            response = response.json()

            wind_speed_in_kilometers_per_hour, precipitation_in_inches, temperature_in_celsius = response["current"]["wind_kph"], response["current"]["precip_in"], response["current"]["temp_c"]

            weather_dict = {"wind_speed_in_kilometers_per_hour": wind_speed_in_kilometers_per_hour, 
            "precipitation_in_inches": precipitation_in_inches,
            "temperature_in_celsius": temperature_in_celsius}

            return json.dumps(weather_dict)

        return f"Error: Unable to fetch weather data. Status code: {response.status_code}"

    return f"Error: Unable to fetch geolocation data. Status code: {response.status_code}"

# Retrieves real-time amazon product info
def get_amazon_data(
    clothing_items, 
    country="US",
    sort_by=None,
    max_price=None,
    brand=None
    ):
        url = "https://real-time-amazon-data.p.rapidapi.com/search"

        querystring = {"query": clothing_items,
        "page":"1",
        "country": country,
        "category_id":"aps"}

        headers = {
            "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
            "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            result = response.json()

            return result['data']['products'][:3]
        
        return f"Error: Unable to fetch product listings. Status code: {response.status_code}"

# Fetch weather data of a given location
def get_weather_data(location):
    url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places"

    querystring = {"text":location,"language":"en"}

    headers = {
        "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
        "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com"
    }

    response = requests.get(url, headers=headers, params=querystring)

    if response.status_code == 200:
        location_dict = response.json()

        location_id = location_dict[0]["place_id"]

        url = "https://ai-weather-by-meteosource.p.rapidapi.com/current"

        querystring = {"place_id": location_id,"timezone":"auto","language":"en","units":"metric"}

        headers = {
            "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
            "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            weather_dict = response.json()

            temperature_in_celsius, wind_chill, wind_speed_in_meters_per_second, precipitation_in_cm = weather_dict["current"]["temperature"], weather_dict["current"]["wind_chill"], weather_dict["current"]["wind"]["speed"], weather_dict["current"]["precipitation"]["total"]

            response_dict = {"temperature_in_celsius": temperature_in_celsius, "wind_chill": 
            wind_chill, "wind_speed_in_meters_per_second": wind_speed_in_meters_per_second, "precipitation_in_cm": precipitation_in_cm}

            return json.dumps(response_dict)

        return f"Error: Unable to fetch weather data. Status code: {response.status_code}"

    return f"Error: Unable to fetch location data. Status code: {response.status_code}"

# Generate response based on user query
def send_stylist_response(user_query):

    # Providing descriptions of all
    # available functions for the stylist to call
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_amazon_data",
                "description": "Get specific clothing item recommendations",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "clothing_items": {
                            "type": "string",
                            "description": "The name of one or more clothing items, e.g. t-shirt, t-shirt and jeans"
                        }
                    },
                    "required": ["clothing_items"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "get_local_weather",
                "description": "Get real-time weather data of local area",
                "parameters": {
                    "type": "object",
                    "properties": {},
                    "required": []
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "get_weather_data",
                "description": "Get real-time weather data of a given location",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "location": {
                            "type": "string",
                            "description": "The name of a location. Can be a city, e.g. New York City"
                        }
                    },
                    "required": ["location"]
                }
            }
        }
    ]

    # High-level instructions for the stylist
    system_message = '''
    You are an expert fashion stylist. Draw on all your
    knowledge to provide concise and detailed answers to what users ask.

    Always try to cite examples of specific clothing items from particular brands,
    using knowledge of current fashion trends and real-time product data to better influence
    your recommendations.

    You only have one chance of providing all the necessary information, so call the following
    functions in one go - do not expect follow-up opportunities:
    1. 'get_local_weather' whenever you specifically need weather conditions of the user's local area
    2. 'get_weather_data' whenever you need weather conditions of a specific location
    3. 'get_amazon_data' whenever making a general or specific style recommendation

    When citing specific examples using the provided functions, be sure to extract
    all items when there are multiple. Always extract product links and images.

    Only respond to fashion-related questions.

    Address the user as "you".
    '''

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_query}
    ]

    # Initial response that we can stream
    # a reply from if no function calls are required
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-1106",
        messages=messages,
        tools=tools,
        tool_choice="auto",
        stream=True
    )

    functions_required = False

    for chunk in response:
        if chunk.choices[0].delta.tool_calls is not None:
            functions_required = True
            break

        if chunk.choices[0].delta.content:
            yield chunk.choices[0].delta.content

    # Alternatively, if functions are required...
    if functions_required:
        for i in range(2):
            if i == 0:
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo-1106",
                    messages=messages,
                    tools=tools,
                    tool_choice="auto"
                )
            else:
                response = client.chat.completions.create(
                    model="gpt-4-1106-preview",
                    messages=messages,
                    tools=tools,
                    tool_choice="auto"
                )

            function_name = None

            response_message = response.choices[0].message
            tool_calls = response_message.tool_calls

            if tool_calls:
                available_functions = {
                    "get_amazon_data": get_amazon_data,
                    "get_local_weather": get_local_weather,
                    "get_weather_data": get_weather_data
                }
                messages.append(response_message)

                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_to_call = available_functions[function_name]
                    function_args = json.loads(tool_call.function.arguments)
                    function_response = None

                    if function_name == "get_amazon_data":
                        user_country_code = get_country_code()

                        if user_country_code in valid_countries:
                            function_args["country"] = user_country_code

                        item_list = function_args["clothing_items"].split(', ')
                        function_responses = None

                        with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
                            if "country" in function_args:
                                function_responses = executor.map(get_amazon_data, item_list, [function_args["country"]] * len(item_list))
                            else:
                                function_responses = executor.map(get_amazon_data, item_list)
                            
                            function_responses = sum(function_responses, [])

                        function_response = json.dumps(function_responses, indent=2)
                            

                    if function_name == "get_local_weather":
                        function_response = function_to_call()
                    elif function_name == "get_weather_data":
                        function_response = function_to_call(
                            location=function_args.get("location")
                        )

                    messages.append(
                        {
                            "tool_call_id": tool_call.id,
                            "role": "tool",
                            "name": function_name,
                            "content": function_response
                        }
                    )

                if function_name == "get_amazon_data":
                    break

        refined_response = client.chat.completions.create(
            model="gpt-4",
            messages=messages,
            stream=True
        )

        for chunk in refined_response:
            if chunk.choices[0].delta.content is not None:
                yield chunk.choices[0].delta.content

class LangServeHandle(APIView):
    def get(self, request):
        return Response("test")

    def post(self, request):
        try:
            serializer = AISerializer(data = request.data)
            serializer.is_valid(raise_exception=True)
            text = serializer.validated_data['text']

            return StreamingHttpResponse(send_stylist_response(text), content_type="text/event-stream")

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# Load OpenAI api key from .env file so everything works
load_dotenv()

openai_key = os.getenv("OPENAI_API_KEY")

client = OpenAI()