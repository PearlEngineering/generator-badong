from dataclasses import asdict

from django_injector import inject

from application.services import <%= namePascalCase %>Service
from application.dto import <%= namePascalCase %>Dto


class <%= namePascalCase %>UseCase:
    @inject
    def __init__(self, <%= nameSnakeCase %>_service: <%= namePascalCase %>Service):
        self.<%= nameSnakeCase %>_service = <%= nameSnakeCase %>_service

    def create(self, <%= nameSnakeCase %>: <%= namePascalCase %>Dto):
        return self.<%= nameSnakeCase %>_service.create(asdict(<%= nameSnakeCase %>))
