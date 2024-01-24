from django.contrib.auth import get_user_model
from django.contrib import auth
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from backendapi.models import ImageModel


User = get_user_model()

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ['id', 'image']


class AISerializer(serializers.Serializer):
    text = serializers.CharField()
    

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = User
        fields=['email', 'password', 'password2']
        
        extra_kwargs={
            'password':{'write_only':True}
        }

    def validate(self, attrs):
        # Gets password and password2 from input 
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)

class EmailVerificationSerializer(serializers.ModelSerializer):
    token=serializers.CharField(max_length=255)

    class Meta:
        model=User
        fields=['token']
    
class LoginSerializer(serializers.ModelSerializer):
    # Defines email and password for serializer
    email = serializers.EmailField(max_length=255, min_length=3)
    password = serializers.CharField(max_length=68, min_length=3, write_only=True)
    tokens = serializers.SerializerMethodField(read_only=True)

    def get_tokens(self, obj):
        user = User.objects.get(email=obj['email'])

        # Create refresh and access tokens and adds email payload
        refresh = RefreshToken.for_user(user)
        refresh['email'] = user.email

        access = refresh.access_token
        access['email'] = user.email

        return {
            'refresh': str(refresh),
            'access': str(access),
        }

    class Meta:
        model = User    
        # What fields from model are in serializer
        fields = ['id', 'email', 'password', 'tokens']

    def validate(self, attrs):
        # Gets email and password from input 
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        filtered_user_by_email = User.objects.filter(email=email)
        user = auth.authenticate(email=email, password=password)
        
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')

        return { 'email' : user.email,
                 'tokens': user.tokens }