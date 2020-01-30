from datetime import datetime

from injector import Module, provider

from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>
from mock.repository.<%= nameSnakeCase %> import Mock<%= namePascalCase %>Repository


class Test<%= namePascalCase %>Module(Module):

    @provider
    def <%= nameSnakeCase %>(self) -> <%= namePascalCase %>:
        return { 'yo', 'zup' }

    @provider
    def <%= nameSnakeCase %>_repository(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>Repository:
        return Mock<%= namePascalCase %>Repository(<%= nameSnakeCase %>)
