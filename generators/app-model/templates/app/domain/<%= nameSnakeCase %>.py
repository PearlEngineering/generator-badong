from dataclasses import dataclass, field

from domain import BaseEntity


@dataclass
class <%= namePascalCase %>(BaseEntity):
    name: str = field(default=None)
    age: int = field(default=None)