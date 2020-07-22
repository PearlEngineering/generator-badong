from datetime import datetime

from injector import Module, provider, singleton

from application.repositories import <%= namePascalCase %>Repository
from application.services import <%= namePascalCase %>Service
from domain import <%= namePascalCase %>
from mock.repository.<%= nameSnakeCase %> import Mock<%= namePascalCase %>Repository
from mock.service.<%= nameSnakeCase %> import Mock<%= namePascalCase %>ServiceImpl


class Test<%= namePascalCase %>Module(Module):

    @singleton
    @provider
    def <%= nameSnakeCase %>_repository(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>Repository:
        return Mock<%= namePascalCase %>Repository(<%= nameSnakeCase %>)

    @singleton
    @provider
    def <%= nameSnakeCase %>_service(self) -> <%= namePascalCase %>Service:
        return Mock<%= namePascalCase %>ServiceImpl()