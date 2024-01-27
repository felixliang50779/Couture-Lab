import firebase_admin
from firebase_admin import db, credentials
import json
from rest_framework.views import APIView
from rest_framework.response import Response


cred = credentials.Certificate('backendapi/firebase-credits.json')
try:
    app = firebase_admin.get_app()
except ValueError as e:
    cred = credentials.Certificate('backendapi/firebase-credits.json')
    firebase_admin.initialize_app(cred, {'databaseURL': 'https://couturelab-a79f5-default-rtdb.firebaseio.com'})

# Creates reference to root node
ref = db.reference('/')


class StoreBookDataView(APIView):
    def get(self, request):
        try:
            with open("backendapi/book_info.json", "r") as f:
                file_contents = json.load(f)

            ref.set(file_contents)
            
            return Response({'status': 'success'})
        except Exception as e:
            return Response({'status': 'error', 'message': str(e)})