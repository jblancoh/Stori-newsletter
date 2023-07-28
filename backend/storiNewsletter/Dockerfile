FROM python:3.6.8-alpine

WORKDIR /app

COPY .env /app/

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install python-decouple

COPY . /app

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]