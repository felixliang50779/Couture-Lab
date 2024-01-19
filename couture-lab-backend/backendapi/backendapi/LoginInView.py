from rest_framework.permissions import AllowAny

from rest_framework import generics

from rest_framework_simplejwt.views import TokenObtainPairView

from backendapi.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from django.contrib.auth.models import User
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer