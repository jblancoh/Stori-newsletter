from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Newsletter, Subscriber
from .serializers import NewsletterSerializer
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from django.db.models import OuterRef, Subquery
import re

@api_view(['POST'])
def upload_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Newsletter uploaded successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_newsletter(request):
    newsletter_id = request.data.get('newsletter_id')
    newsletter = Newsletter.objects.get(id=newsletter_id) if newsletter_id else Newsletter.objects.last()
    
    subscribers = Subscriber.objects.filter(subscribed_newsletters=newsletter)
    if newsletter and subscribers:
        for subscriber in subscribers:
          
          email_context = {
              'subscriber_name': subscriber.email,
              'unsubscribe_link': f'http://localhost:8000/api/unsubscribe/{subscriber.email}/{newsletter.id}/',
          }
          email_subject = 'Stori Newsletter'
          email_body = render_to_string('emails/newsletter_email.html', email_context)
          email = EmailMessage(
              email_subject,
              email_body,
              'newsletter@stori.com',
              [subscriber.email],
          )
          email.content_subtype = "html"
          if newsletter.document:
            email.attach_file(newsletter.document.path)
          email.send()
        return Response({'message': 'Newsletter sent successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Newsletter or recipients not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def unsubscribe(request, email, newsletter_id):
    subscriber = get_object_or_404(Subscriber, email=email)
    newsletter = get_object_or_404(Newsletter, id=newsletter_id)

    if request.method == 'GET':
        subscriber.subscribed_newsletters.remove(newsletter)
        subscriber.save()
        return Response({'message': 'Unsubscribed successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def add_subscriber(request):
    emails = request.data.get('emails')
    
    emails = emails.split(',') if emails else None
    newsletters_id = request.data.get('subscribed_newsletters')
    if not emails or not newsletters_id:
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)
    
    newsletters = Newsletter.objects.filter(id__in=newsletters_id)
    
    def validate_email(email):
        email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        return re.match(email_regex, email)
        
    
    try:
        for email in emails:
            email = email.strip()
            isEmail = validate_email(email)
            if not isEmail:
                return Response({'error': 'Invalid email'}, status=status.HTTP_400_BAD_REQUEST)
            subscriber, created = Subscriber.objects.get_or_create(email=email)
            for newsletter in newsletters:
                subscriber.subscribed_newsletters.add(newsletter)
            subscriber.save()
            statusReturn = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        
        return Response({'message': 'Subscriber added successfully'}, status=statusReturn)
    except:
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_newsletters(request):
    
    last_newsletter_ids = Newsletter.objects.filter(
        category=OuterRef('category')
    ).order_by('-id').values('id')[:1]
    
    newsletters_with_category = Newsletter.objects.filter(id__in=Subquery(last_newsletter_ids))
    last_newsletter_without_category = Newsletter.objects.filter(category__isnull=True).order_by('-id').first()
    newsletters = newsletters_with_category | Newsletter.objects.filter(id=last_newsletter_without_category.id)
    serializer = NewsletterSerializer(newsletters, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)