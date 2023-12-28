from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.chains.openai_functions.openapi import get_openapi_chain
from langchain.llms import OpenAI
from langchain.chains import APIChain
from langchain.chains.api import open_meteo_docs
from langchain.schema import BaseOutputParser
from langserve import add_routes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import AISerializer
from dotenv import load_dotenv

import openai
import json
import requests
import os

# Load OpenAI api key from .env file so everything works
load_dotenv()

openai_key = os.getenv("OPENAI_API_KEY")

chat_model = ChatOpenAI(openai_api_key=openai_key, model="gpt-3.5-turbo")

# Fetch location info
url = "https://ip-geo-location.p.rapidapi.com/ip/check"

querystring = {"format":"json"}

headers = {
	"X-RapidAPI-Key": "20dfc80653mshd4c08e26d51b7b5p14974ajsn55eb2643fcb4",
	"X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

geolocation_dict = response.json()

city, country = geolocation_dict['city']['name'], geolocation_dict['country']['name']

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
            recommendation_response = ''

            try:
                api_chain = get_openapi_chain(
                    "https://www.klarna.com/us/shopping/public/openai/v0/api-docs/")
                recommendation_response = api_chain(text)['response']['products']
            except Exception as e:
                recommendation_response = "User input doesn't require api call"

            if isinstance(recommendation_response, list):
                for i in range(len(recommendation_response)):
                    recommendation_response[i] = [recommendation_response[i]['name'], 
                    recommendation_response[i]['url'], recommendation_response[i]['price']]

            # templates for input
            system_template = """
            You are an expert fashion stylist. Draw on all your
            knowledge to provide concise and detailed answers to what users ask.

            Cite examples of specific clothing items from particular brands - parse this python
            list to retrieve and present information about particular recommendations: {}

            Do not respond to anything unrelated to fashion, as that is beyond your scope.
            """.format(recommendation_response)

            # create a chat prompt
            chat_prompt = ChatPromptTemplate.from_messages([
                ("system", system_template),
                ("human", text)
            ])

            # make a chain... pretty sure it combines the outputs in a easy way
            chain = chat_prompt | chat_model | OutputParser()

            result = chain.invoke({"text" : text})
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)