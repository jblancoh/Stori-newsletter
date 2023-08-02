from rest_framework import serializers
from .models import Newsletter, Subscriber

class NewsletterSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    category_id = serializers.IntegerField()
    datetime = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S", required=False)
    
    class Meta:
        model = Newsletter
        fields = [
            'id',
            'category',
            'category_id',
            'document',
            'uploaded_at',
            'datetime',
        ]

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'
