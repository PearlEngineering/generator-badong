from http import HTTPStatus

from django_injector import inject

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from rest_framework import status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from infrastructure.serializers import <%= namePascalCase %>Serializer, ErrorSerializer

from application.use_cases import <%= namePascalCase %>UseCase


class <%= namePascalCase %>ViewAPI(APIView):

    @swagger_auto_schema(
        request_body=<%= namePascalCase %>Serializer,
        responses={
            204: openapi.Response('Operation successful', None),
            400: openapi.Response('Validation Error occurred', ErrorSerializer),
        },
    )
    @inject
    def post(self, request: Request, <%= nameSnakeCase %>_use_case: <%= namePascalCase %>UseCase,
             format=None):
        print('request.data:', request.data)
        serializer = <%= namePascalCase %>Serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        <%= nameSnakeCase %> = serializer.save()

        response = <%= nameSnakeCase %>_use_case.create(<%= nameSnakeCase %>)

        return Response(response, status=HTTPStatus.CREATED)
