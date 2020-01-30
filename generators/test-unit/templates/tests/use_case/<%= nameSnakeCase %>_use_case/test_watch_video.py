from datetime import datetime

from application.use_cases.<%= nameSnakeCase %> import <%= namePascalCase %>UseCase
from domain import <%= namePascalCase %>
from mock.repository.<%= nameSnakeCase %> import Mock<%= namePascalCase %>Repository


def test_<%= nameSnakeCase %>_success():
    assert 1 == 1
