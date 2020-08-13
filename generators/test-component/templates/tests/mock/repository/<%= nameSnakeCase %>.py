from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>


class Mock<%= namePascalCase %>Repository(<%= namePascalCase %>Repository):

    def <%= nameSnakeCase %>(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>:
        return { 'foo': 'bar' }

