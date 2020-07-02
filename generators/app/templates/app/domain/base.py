
from abc import ABC
from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class BaseEntity(ABC):
    id: int = field(default=None)
    created_timestamp: datetime = field(default=None)
    last_modified_timestamp: datetime = field(default=None)