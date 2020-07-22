from injector import Module, singleton, provider

from application.repositories import <%= namePascalCase %>Repository
from application.services import <%= namePascalCase %>Service
from infrastructure.repositories import <%= namePascalCase %>RepositoryImpl
from infrastructure.services import <%= namePascalCase %>ServiceImpl


class <%= namePascalCase %>Module(Module):

    @singleton
    @provider
    def <%= nameSnakeCase %>_repository(self) -> <%= namePascalCase %>Repository:
        return <%= namePascalCase %>RepositoryImpl()

    @singleton
    @provider
    def <%= nameSnakeCase %>_service(self) -> <%= namePascalCase %>Service:
        return <%= namePascalCase %>ServiceImpl()
