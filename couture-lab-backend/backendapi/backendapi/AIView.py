from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import BaseOutputParser
from langserve import add_routes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import AISerializer

import json

# code here

# AI keys so it works
# ***figure out more custom model info later***
chat_model = ChatOpenAI(openai_api_key="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", model="gpt-3.5-turbo")

# make code in pretty format
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

            # templates for input
            system_template = """You are an expert fashion stylist. Draw on all your
            knowledge to provide concise and detailed answers to what users ask.
            Do not respond to any queries unrelated to fashion, as that is beyond
            your scope.
            """
            user_input = "{}".format(text)

            # create a chat prompt
            chat_prompt = ChatPromptTemplate.from_messages([
                ("system", system_template),
                ("human", user_input),
            ])

            # make a chain... pretty sure it combines the outputs in a easy way
            chain = chat_prompt | chat_model | OutputParser()
            result = chain.invoke({"text" : text})
            return Response(result, status=status.HTTP_200_OK)

        except Exception as e:
            print(list(request.data.items()))

            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)