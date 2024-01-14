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

# # Fetch location info
# url = "https://ip-geo-location.p.rapidapi.com/ip/check"

# querystring = {"format":"json"}

# headers = {
# 	"X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
# 	"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
# }

# response = requests.get(url, headers=headers, params=querystring)

# geolocation_dict = response.json()

# city, country = geolocation_dict['city']['name'], geolocation_dict['country']['name']

# Code below that's commented out causes the token limit to exceed gpt-3.5's threshold

# llm = OpenAI(temperature=0)
# weather_response = APIChain.from_llm_and_api_docs(
#     llm,
#     open_meteo_docs.OPEN_METEO_DOCS,
#     verbose=True,
#     limit_to_domains=["https://api.open-meteo.com/"],
# )

# weather_response = weather_response.run(
#     f"What is the weather like in {city}, {country}?")

def send_stylist_response(user_query):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": 
            '''
            You are an expert fashion stylist. Draw on all your
            knowledge to provide concise and detailed answers to what users ask.

            Cite examples of specific clothing items from particular brands, using knowledge of the
            weather and current fashion trends to better influence your recommendations.

            Information labled "Additional Info:" may be used to inform your response, but is
            not necessary.

            Only respond to fashion-related questions.

            Address the user as "you".
            '''},
            {"role": "user", "content": user_query}
        ],
        stream=True
    )

    for chunk in response:
        if chunk.choices[0].delta.content is not None:
            yield chunk.choices[0].delta.content

class OutputParser(BaseOutputParser):
    # parse the output into a simple string
    def parse(self, text: str):
        return text.strip()
    
    # make the string work for some reason, don't ask me
    @property
    def OutputType(self) -> str:
        """Specify the output type."""
        return str  # Adjust this based on the expected output type

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