from rest_framework.views import APIView
from rest_framework.response import Response

class DoubleMessageAPIView(APIView):
    def post(self, request, format=None):
        message = request.data.get('message', '')
        doubled_message = message * 2
        return Response({'doubled_message': doubled_message})# views.py