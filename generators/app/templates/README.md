# Sample Docker Django App

## Pre-Requisites:
- Python3.7
- Virtual environment `pip3 install virtualenv`

## Serve API Locally:
- Activate virtual environment:
	```ssh
	$ virtualenv venv # Create virtual environment if does not exist
	$ source venv/bin/activate
	```

- Install dependencies
	```ssh
	$ pip install -r tests/requirements.txt
	```

- Run migrations:
	```ssh
	$ python app/manage.py makemigrations
	$ python app/manage.py migrate
	```

- Run migrations:
	```ssh
	$ python app/manage.py runserver
	```

## Running tests:

- Run tests
	```ssh
	$ export PYTHONPATH=app/:tests/
	$ pytest
	```