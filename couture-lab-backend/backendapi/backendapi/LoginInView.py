from django.contrib.auth import get_user_model
from rest_framework.generics import GenericAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from backendapi.serializer import RegisterSerializer, LoginSerializer
from backendapi.models import UserManager
from django.core.mail import send_mail
    

User = get_user_model()

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    objects = UserManager()
    
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        # Saves the validated serializer, which creates a new user
        serializer.save()
        # Gets serialized data of the new user
        user_data = serializer.data
        # Retrieves user object from database using email
        user=User.objects.get(email=user_data['email']) 
        
        subject = 'Welcome to CoutureLab!'
        message = 'Hello, thank you for signing up! From, CoutureLab Team'
        from_email = 'couturelab2@gmail.com'
        recipient_list = [user.email]

        send_mail(subject, message, from_email, recipient_list, fail_silently=False)

        return Response(user_data, status=status.HTTP_201_CREATED)


class LoginView(GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)