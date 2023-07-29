from django.db import models
from django.core.validators import FileExtensionValidator

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
    subscribed_newsletters = models.ManyToManyField(Newsletter, blank=True)

    def __str__(self):
        return self.email
