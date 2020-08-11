from rest_framework import viewsets
from infrastructure.serializers import <%= namePascalCase %>Serializer
from infrastructure.models import <%= namePascalCase %>Model

# TODO add swagger auto schema
class <%= namePascalCase %>ViewSet(viewsets.ModelViewSet):
    queryset = <%= namePascalCase %>Model.objects.all()
    serializer_class = <%= namePascalCase %>Serializer
