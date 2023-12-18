from rest_framework import serializers
from backendapi.models import ImageModel

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ['id', 'image']

class AISerializer(serializers.Serializer):
    text = serializers.CharField()
