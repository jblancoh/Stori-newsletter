from celery import Celery
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'storiNewsletter.settings')

app = Celery('storiNewsletter')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()

app.conf.timezone = 'America/Mexico_City'
app.conf.enable_utc = False

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
