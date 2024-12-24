from rest_framework import serializers


class AISerializer(serializers.Serializer):
    text = serializers.CharField()