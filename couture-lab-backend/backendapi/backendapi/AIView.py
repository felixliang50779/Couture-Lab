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
import os

# Fetch location info
def get_weather_data():
    # url = "https://ip-geo-location.p.rapidapi.com/ip/check"

    # querystring = {"format":"json"}

    # headers = {
    # 	"X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
    # 	"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
    # }

    # response = requests.get(url, headers=headers, params=querystring)

    # geolocation_dict = response.json()

    # city, country = geolocation_dict['city']['name'], geolocation_dict['country']['name']
    pass

# Retrieves real-time amazon product info
def get_amazon_data(
    clothing_items, 
    country=None,
    sort_by=None,
    max_price=None,
    brand=None
    ):
        url = "https://real-time-amazon-data.p.rapidapi.com/search"

        querystring = {"query": clothing_items,"page":"1","country":"US","category_id":"aps"}

        headers = {
            "X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
            "X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
        }

        response = requests.get(url, headers=headers, params=querystring)

        if response.status_code == 200:
            result = response.json()

            return json.dumps(result['data'])
        
        return f"Error: Unable to fetch product listings. Status code: {response.status_code}"

# Generate response based on user query
def send_stylist_response(user_query):

    # Providing descriptions of all
    # available functions for the stylist to call
    function_descriptions = [
        {
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
    ]

    # High-level instructions for the stylist
    system_message = '''
    You are an expert fashion stylist. Draw on all your
    knowledge to provide concise and detailed answers to what users ask.

    Always try to cite examples of specific clothing items from particular brands,
    using knowledge of the weather and current fashion trends to better influence
    your recommendations.

    When citing specific examples using provided functions, be sure to extract
    all items when there are multiple. Attempt to extract image links whenever possible
    as well.

    Only respond to fashion-related questions.

    Address the user as "you".
    '''

    # Initial response generator that we can extract
    # any required function call details from
    response_generator = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": system_message},
            {"role": "user", "content": user_query}
        ],
        temperature=0.2,
        functions=function_descriptions,
        function_call="auto",
        stream=True
    )

    arguments, name = "", ""
    function_return = None

    # Extracting function call info as it's streamed
    # If no function calls are required, we yield
    # a generator object for each chunk
    for chunk in response_generator:
        if chunk.choices[0].delta.function_call is not None:
            arguments += chunk.choices[0].delta.function_call.arguments

            if chunk.choices[0].delta.function_call.name:
                name = chunk.choices[0].delta.function_call.name
        else:
            if len(name):
                params = json.loads(arguments)

                chosen_function = eval(name)
                function_return = chosen_function(**params)
            else:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content

    # If a function was called we feed its output
    # back through the API for a refined response
    if function_return:
        refined_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": system_message},
                {"role": "user", "content": user_query},
                {"role": "function", "name": name, "content": function_return}
            ],
            temperature=0.2,
            functions=function_descriptions,
            function_call="auto",
            stream=True
        )

        # Streaming the final response
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