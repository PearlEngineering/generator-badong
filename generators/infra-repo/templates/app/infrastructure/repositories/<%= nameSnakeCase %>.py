from django.db import IntegrityError

from application.repositories import <%= namePascalCase %>Repository
from domain import <%= namePascalCase %>
from infrastructure.models import <%= namePascalCase %>Model


class <%= namePascalCase %>RepositoryImpl(<%= namePascalCase %>Repository):

    def <%= nameSnakeCase %>(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>:
        <%= nameSnakeCase %>_model = <%= namePascalCase %>Model.objects.from_entity(<%= nameSnakeCase %>)
        try:
            <%= nameSnakeCase %>_model.save()
        except IntegrityError as e:
            self._handle_integrity_error(e)

        return <%= nameSnakeCase %>_model.to_entity()

    @staticmethod
    def _handle_integrity_error(e):
        print("IntegrityError: ", str(e))
        code = e.args[0]

        raise