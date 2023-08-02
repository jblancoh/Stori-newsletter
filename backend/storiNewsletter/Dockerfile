FROM python:3.9.13-alpine

WORKDIR /app

COPY .env /app/

COPY requirements.txt /app/

RUN pip install --upgrade pip

RUN pip install -r requirements.txt
RUN pip install python-decouple

COPY initial_data.json /app/

COPY . .

RUN python manage.py makemigrations
RUN python manage.py migrate
# RUN python manage.py loaddata initial_data.json

ENV MEDIA_ROOT /app/media/
RUN mkdir -p $MEDIA_ROOT

ENV STATIC_ROOT /app/static/
RUN mkdir -p $STATIC_ROOT

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

