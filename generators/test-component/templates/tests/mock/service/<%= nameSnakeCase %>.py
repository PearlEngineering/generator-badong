from django_injector import inject

from dataclasses import asdict

from application.services import <%= namePascalCase %>Service
from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>


class Mock<%= namePascalCase %>ServiceImpl(<%= namePascalCase %>Service):
    def <%= nameSnakeCase %>(self, <%= nameSnakeCase %>):
        return { 'foo': 'bar' }