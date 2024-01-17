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

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Profile
        fields = ('user', 'first_name', 'last_name', 'email')
