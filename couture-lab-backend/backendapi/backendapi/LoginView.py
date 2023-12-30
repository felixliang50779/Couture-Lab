from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.response import Response
from .credentials import REDIRECT_URL

class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = REDIRECT_URL
    client_class = OAuth2Client

    # needs post for some reason, shouldn't be needed 
    def post(self, request):
        print("yo")
        print(request)
        return Response("ayo")
