from django.db import models
from django.core.validators import FileExtensionValidator
from django_celery_beat.models import PeriodicTask, CrontabSchedule
import json
import random

class CategoryNewsletter(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    def __str__(self):
        return self.name

class Newsletter(models.Model):
    document = models.FileField(upload_to='newsletters/', validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'pdf'])])
    uploaded_at = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(CategoryNewsletter, on_delete=models.CASCADE, blank=True, null=True)

    def __str__(self):
        return self.document.name
    
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    subscribed_newsletters = models.ManyToManyField(CategoryNewsletter, blank=True)

    def __str__(self):
        return self.email

class ScheduledNewsletter(models.Model):
    category = models.ForeignKey(CategoryNewsletter, on_delete=models.CASCADE)
    scheduled_time = models.DateTimeField()

    def create_periodic_task(self):
        schedule, _ = CrontabSchedule.objects.get_or_create(
            minute=self.scheduled_time.minute,
            hour=self.scheduled_time.hour,
            day_of_week=self.scheduled_time.strftime('%w'),
            day_of_month=self.scheduled_time.strftime('%d'),
            month_of_year=self.scheduled_time.strftime('%m')
        )
        
        name = f"Enviar newsletter: {self.category.name} + {random.randint(1, 1000)}"
        task = PeriodicTask.objects.create(
            crontab=schedule,
            name=name,
            task="newsletter.tasks.send_newsletter_task",
            args=json.dumps([self.id])
        )
        return task