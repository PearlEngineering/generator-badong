FROM python:3.8.4

RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y python3-pip default-libmysqlclient-dev libssl-dev build-essential libgnutls30
RUN python3.8 -m pip install mysqlclient gunicorn
RUN apt-get install -y mariadb-server-10.3
RUN mkdir app

COPY ./app/requirements.txt /app/requirements.txt
WORKDIR /app

RUN python3.8 -m pip install -r requirements.txt

COPY ./app /app

EXPOSE 8081

ENV PYTHONPATH="/app"

RUN python3.8 manage.py collectstatic --noinput

# Use gunicorn
CMD ["gunicorn", "-w", "4", "-b", ":8081", "--access-logfile", "-", "--error-logfile", "-", "--log-level", "debug", "<%= name %>.wsgi"]