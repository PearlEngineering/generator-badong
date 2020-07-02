from abc import ABC, abstractmethod


class <%= namePascalCase %>Service(ABC):
    @abstractmethod
    def create(self, <%= nameSnakeCase %>):
        raise NotImplementedError()
