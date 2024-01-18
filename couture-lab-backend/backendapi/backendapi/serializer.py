from rest_framework import serializers
from backendapi.models import ImageModel, User, Profile

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ['id', 'image']

class AISerializer(serializers.Serializer):
    text = serializers.CharField()

class UserSerializer(serializers.ModelSerializer):  
    class Meta:
        model = User
        fields = '__all__'

'''class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=)'''