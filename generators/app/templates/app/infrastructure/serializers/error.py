from rest_framework import serializers


class ErrorSerializer(serializers.Serializer):
    errorCodes = serializers.ListField()