from rest_framework import serializers

from application.dto import <%= namePascalCase %>Dto


class <%= namePascalCase %>Serializer(serializers.Serializer):

    def validate(self, data):
        if hasattr(self, 'initial_data'):
            unknown_keys = set(self.initial_data.keys()) - set(self.fields.keys())
            if unknown_keys:
                raise serializers.ValidationError('UNEXPECTED_FIELDS_PRESENT')
        return data

    name = serializers.CharField(
        max_length=258,
        error_messages={
            'required': 'MISSING_NAME',
            'blank': 'BLANK_NAME',
            'max_length': 'INVALID_NAME_LENGTH',
        })

    age = serializers.IntegerField()

    def create(self, validated_data) -> <%= namePascalCase %>Dto:
        return <%= namePascalCase %>Dto(**validated_data)
