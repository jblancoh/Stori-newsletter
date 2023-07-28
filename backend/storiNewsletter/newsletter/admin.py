from django.contrib import admin

from .models import Subscriber, Newsletter,CategoryNewsletter

admin.site.register(Subscriber)
admin.site.register(Newsletter)
admin.site.register(CategoryNewsletter)