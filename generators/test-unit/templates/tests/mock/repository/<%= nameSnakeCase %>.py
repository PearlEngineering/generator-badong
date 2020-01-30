from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>


class Mock<%= namePascalCase %>Repository(<%= namePascalCase %>Repository):

    def __init__(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> None:
        self.<%= nameSnakeCase %> = <%= nameSnakeCase %>

    def get_by_id(self, <%= nameSnakeCase %>_id) -> <%= namePascalCase %>:
        print("IN GET BY ID BITCHES")
        return self.<%= nameSnakeCase %>

    def save(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>:
        return self.<%= nameSnakeCase %>

    def update(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>:
        return self.<%= nameSnakeCase %>
