from django.db import models
from django.core.validators import FileExtensionValidator

class Newsletter(models.Model):
    document = models.FileField(upload_to='newsletters/', validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'pdf'])])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.document.name
    
class Subscriber(models.Model):
    email = models.EmailField(unique=True)
    is_subscribed = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    newsletter = models.ForeignKey(Newsletter, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.email
