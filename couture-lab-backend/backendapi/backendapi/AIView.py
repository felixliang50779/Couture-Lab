from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import AISerializer
from dotenv import load_dotenv
from openai import OpenAI
from django.http import StreamingHttpResponse
from random import sample

import json
import asyncio
import aiohttp
import os


valid_countries = ["US", "AU", "BR", "CA", "CN", "FR", "DE", "IN", "IT", "MX", 
"NL", "SG", "ES", "TR", "AE", "GB", "JP", "SA", "PL", "SE", "BE", "EG"]

# Fetch country code of user
async def get_country_code(session):
    url = "https://ip-geo-location.p.rapidapi.com/ip/check"

    querystring = {"format":"json"}

    headers = {
    	"X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
    	"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    }

    async with session.get(url, params=querystring, headers=headers) as response:
        if response.status == 200:
            country_dict = await response.json()

            country = country_dict["country"]["code"]

            return country

        return f"Error: Unable to fetch country data. Status code: {response.status}"

# Fetch local (to user) weather data
async def get_local_weather(session):
    url = "https://ip-geo-location.p.rapidapi.com/ip/check"

    querystring = {"format":"json"}

    headers = {
        "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
        "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    }

    async with session.get(url, params=querystring, headers=headers) as response:
        if response.status == 200:
            geolocation_dict = await response.json()

            latitude, longitude = geolocation_dict["location"]["latitude"], geolocation_dict["location"]["longitude"]

            url = "https://weatherapi-com.p.rapidapi.com/current.json"

            querystring = {"q":f"{latitude},{longitude}"}

            headers = {
                "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
                "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
            }

            async with session.get(url, params=querystring, headers=headers) as response:
                if response.status == 200:
                    response = await response.json()

                    wind_speed_in_kilometers_per_hour, precipitation_in_inches, temperature_in_celsius = response["current"]["wind_kph"], response["current"]["precip_in"], response["current"]["temp_c"]

                    weather_dict = {"wind_speed_in_kilometers_per_hour": wind_speed_in_kilometers_per_hour, 
                    "precipitation_in_inches": precipitation_in_inches,
                    "temperature_in_celsius": temperature_in_celsius}

                    return json.dumps(weather_dict)

                return f"Error: Unable to fetch local weather. Status code: {response.status}"

        return f"Error: Unable to fetch geolocation data. Status code: {response.status}"

async def get_clothing_item(
    item,
    session,
    country="US"
):
    url = "https://real-time-product-search.p.rapidapi.com/search"

    querystring = {"q":item,"country":country,"language":"en"}

    headers = {
        "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
        "X-RapidAPI-Host": "real-time-product-search.p.rapidapi.com"
    }

    async with session.get(url, headers=headers, params=querystring) as response:
        if response.status == 200:
            product_dict = await response.json()

            return sample(product_dict['data'], 5)

        return f"Error: Unable to fetch clothing item data. Status code: {response.status}"

# Retrieves real-time product info
async def get_clothing_data(
    clothing_items,
    session,
    country="US",
    sort_by=None,
    max_price=None,
    brand=None
    ):
        item_list = clothing_items.split(", ")

        product_promises, product_responses = [], []
        
        for item in item_list:
            product_promises.append(asyncio.ensure_future(get_clothing_item(
                item, session, country)))

        for promise in asyncio.as_completed(product_promises, timeout=60):
            response = await promise

            if type(response) == str:
                return f"Error: Unable to fetch clothing data."

            product_responses += response

        return json.dumps(product_responses, indent=2)

# Fetch weather data of a given location
async def get_weather_data(location, session):
    url = "https://ai-weather-by-meteosource.p.rapidapi.com/find_places"

    querystring = {"text":location,"language":"en"}

    headers = {
        "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
        "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com"
    }

    async with session.get(url, params=querystring, headers=headers) as response:
        location_dict = await response.json()

        location_id = location_dict[0]["place_id"]

        url = "https://ai-weather-by-meteosource.p.rapidapi.com/current"

        querystring = {"place_id": location_id,"timezone":"auto","language":"en","units":"metric"}

        headers = {
            "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
            "X-RapidAPI-Host": "ai-weather-by-meteosource.p.rapidapi.com"
        }

        async with session.get(url, params=querystring, headers=headers) as response:
            weather_dict = await response.json()

            temperature_in_celsius, wind_chill, wind_speed_in_meters_per_second, precipitation_in_cm = weather_dict["current"]["temperature"], weather_dict["current"]["wind_chill"], weather_dict["current"]["wind"]["speed"], weather_dict["current"]["precipitation"]["total"]

            response_dict = {"temperature_in_celsius": temperature_in_celsius, "wind_chill": 
            wind_chill, "wind_speed_in_meters_per_second": wind_speed_in_meters_per_second, "precipitation_in_cm": precipitation_in_cm}

            return json.dumps(response_dict)

async def process_functions(messages, tools):
    async with aiohttp.ClientSession() as session:
        for i in range(2):
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
                    "get_clothing_data": get_clothing_data,
                    "get_local_weather": get_local_weather,
                    "get_weather_data": get_weather_data
                }
                messages.append(response_message)

                call_list, fetched_products = [], False

                for tool_call in tool_calls:
                    function_name = tool_call.function.name
                    function_to_call = available_functions[function_name]
                    function_args = json.loads(tool_call.function.arguments)

                    function_args["session"] = session

                    if function_name == "get_clothing_data":
                        fetched_products = True

                        user_country_code = await get_country_code(session)

                        if user_country_code in valid_countries:
                            function_args["country"] = user_country_code

                    call_list.append({"function_to_call": function_to_call, 
                    "function_name": function_name, "function_args": function_args,
                    "tool_call_id": tool_call.id})

                call_promises = []

                for call in call_list:
                    my_function = call["function_to_call"]
                    my_args = call["function_args"]

                    call_promises.append(my_function(**my_args))

                call_responses = await asyncio.gather(*call_promises)

                for response_index in range(len(call_responses)):
                    messages.append({
                        "tool_call_id": call_list[response_index]["tool_call_id"],
                        "role": "tool",
                        "name": call_list[response_index]["function_name"],
                        "content": call_responses[response_index]
                    })

                if fetched_products:
                    break

        return messages

# Generate response based on user query
def send_stylist_response(user_query):

    # Providing descriptions of all
    # available functions for the stylist to call
    tools = [
        {
            "type": "function",
            "function": {
                "name": "get_clothing_data",
                "description": "Get specific clothing item recommendations",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "clothing_items": {
                            "type": "string",
                            "description": "The name of a single clothing item, e.g. 't-shirt'."
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
    using knowledge of current fashion trends and product data to better influence
    your recommendations. When asked for an outfit, provide a complete set of items,
    including tops, hats, bottoms, and accessories. Always provide pictures for items.

    Call the following functions in one go - do not expect follow-up opportunities:
    1. 'get_local_weather' whenever you specifically need weather conditions of the user's local area
    2. 'get_weather_data' whenever you need weather conditions of a specific location
    3. 'get_clothing_data' whenever making a general or specific style recommendation.

    When citing specific examples using the provided functions, be sure to extract
    all items when there are multiple. Always identify and extract product links and images.

    Only respond to fashion-related questions. You can only provide recommendations
    for fashion-related accessories or items.

    Address the user as "you".
    '''

    messages = [
        {"role": "system", "content": system_message},
        {"role": "user", "content": user_query}
    ]

    # Initial response that we can stream
    # a reply from if no function calls are required
    response = client.chat.completions.create(
        model="gpt-4",
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
        messages = asyncio.run(process_functions(messages, tools))

        refined_response = client.chat.completions.create(
            model="gpt-3.5-turbo-1106",
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