from django.db import models

from domain import <%= namePascalCase %>
from infrastructure.models import BaseModel, BaseManager


class <%= namePascalCase %>Model(BaseModel):
    name = models.CharField(max_length=256)
    age = models.IntegerField()

    objects = BaseManager()


    def entity_class(self):
        return <%= namePascalCase %>

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['name'],
                name='unique_name'
            )
        ]