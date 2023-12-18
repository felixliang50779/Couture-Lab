from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from backendapi.serializer import ImageSerializer
from backendapi.models import ImageModel
from rest_framework.parsers import MultiPartParser, FormParser

# views here

class test(APIView):
    def get(self, request):
        return Response({"Test" : "Response"})
    
class GetImage(APIView):
    def get_item_by_pk(self, pk):
            try:
                return ImageModel.objects.get(pk=pk)
            except ImageModel.DoesNotExist:
                return None

    def get(self, request, pk):
        image_instance = self.get_item_by_pk(pk)
        if image_instance is not None:
            serializer = ImageSerializer(image_instance)
            return Response(serializer.data['image'])
        return Response({'Error': 'Image does not exist'}, status=status.HTTP_404_NOT_FOUND)


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