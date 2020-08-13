from django_injector import inject

from dataclasses import asdict

from application.services import <%= namePascalCase %>Service
from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>


class <%= namePascalCase %>ServiceImpl(<%= namePascalCase %>Service):
    @inject
    def __init__(self, <%= nameSnakeCase %>_repository: <%= namePascalCase %>Repository):
        self.<%= nameSnakeCase %>_repository = <%= nameSnakeCase %>_repository

    def <%= nameSnakeCase %>(self, <%= nameSnakeCase %>):
        <%= nameSnakeCase %> = <%= namePascalCase %>(**<%= nameSnakeCase %>)

        <%= nameSnakeCase %> = self.<%= nameSnakeCase %>_repository.<%= nameSnakeCase %>(<%= nameSnakeCase %>)