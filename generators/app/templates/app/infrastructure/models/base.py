from abc import abstractmethod
from dataclasses import asdict

from django.db import models
from django.forms import model_to_dict
from django.utils import timezone
from itertools import chain


class BaseManager(models.Manager):
    def from_entity(self, entity):
        entity_dict = asdict(entity)
        return self.model(**entity_dict)


class BaseModel(models.Model):
    created_timestamp = models.DateTimeField(editable=False)
    last_modified_timestamp = models.DateTimeField()

    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        if not self.id:
            self.created_timestamp = timezone.now()
        self.last_modified_timestamp = timezone.now()
        return super().save(force_insert, force_update, using, update_fields)

    def to_dict(self):
        opts = self._meta

        data = {}
        for f in chain(opts.concrete_fields, opts.private_fields):
            data[f.name] = f.value_from_object(self)
        for f in opts.many_to_many:
            data[f.name] = [i for i in f.value_from_object(self)]

        return data

    def to_entity(self, include_m2m_fields=True):
        entity_class = self.entity_class()
        model_dict = self.to_dict()
        instance = entity_class(**model_dict)
        return instance

    @abstractmethod
    def entity_class(self):
        raise NotImplementedError()

    class Meta:
        abstract = True