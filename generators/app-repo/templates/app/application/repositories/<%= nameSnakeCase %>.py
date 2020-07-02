from abc import ABC, abstractmethod

from domain import <%= namePascalCase %>


class <%= namePascalCase %>Repository(ABC):

    @abstractmethod
    def create(self, <%= nameSnakeCase %>: <%= namePascalCase %>) -> <%= namePascalCase %>:
        raise NotImplementedError()