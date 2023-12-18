from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from backendapi.serializer import ImageSerializer
from backendapi.models import ImageModel
from rest_framework.parsers import MultiPartParser, FormParser
from django.http import HttpResponse
from django.core.files.storage import default_storage
from google.cloud import storage

# views here

class test(APIView):
    def get(self, request):
        return Response({"Test" : "Response"})
    
class GetImage(APIView):
    def get(self, request, image_name):
        # Specify the full path to the image in GCS
        gcs_path = f'gs://couturelab-media/images/{image_name}'  # Adjust the path as needed

        # Initialize a GCS client
        client = storage.Client()

        # Get a reference to the GCS bucket
        bucket_name = 'couturelab-media'  # Replace with your actual bucket name
        bucket = client.bucket(bucket_name)

        # Get a reference to the GCS object
        blob = bucket.blob(image_name)

        # Download the content of the GCS object
        image_content = blob.download_as_text()

        # Return the image content as the HTTP response
        return HttpResponse(image_content, content_type='image/jpeg')


class StoreImage(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DeleteImage(APIView):
    def delete(self, request):
        image = request.image
        if image is not None:
            image.delete()
            return Response("Deleted", status=status.HTTP_204_NO_CONTENT)
        return Response({'Error': 'Image not found'}, status=status.HTTP_404_NOT_FOUND)