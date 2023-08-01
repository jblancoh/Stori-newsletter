from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Newsletter, Subscriber, CategoryNewsletter, ScheduledNewsletter
from .serializers import NewsletterSerializer
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
import re
import datetime


@api_view(['POST'])
def upload_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    scheduled_time = request.data.get('scheduled_time')
    
    print("🚀 ~ file: views.py:17 ~ scheduled_time:", scheduled_time)
    if serializer.is_valid():
        newsletter = serializer.save()
        if scheduled_time:
            scheduled_time = datetime.datetime.strptime(scheduled_time, '%Y-%m-%dT%H:%M')
            print("🚀 ~ file: views.py:25 ~ scheduled_time>>>>:", scheduled_time)
            scheduled_newsletter = ScheduledNewsletter.objects.create(category=newsletter.category, scheduled_time=scheduled_time)
            scheduled_newsletter.create_periodic_task()
        return Response({'message': 'Newsletter uploaded successfully'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_newsletter(request):
    newsletter_category_id = request.data.get('newsletter_category_id')
    newsletter = Newsletter.objects.filter(category=newsletter_category_id).order_by('id').last() if newsletter_category_id else Newsletter.objects.last()
    
    subscribers = Subscriber.objects.filter(subscribed_newsletters__id=newsletter.category.id)
    if newsletter and subscribers:
        for subscriber in subscribers:
          
          email_context = {
              'subscriber_name': subscriber.email,
              'unsubscribe_link': f'http://localhost:8000/api/unsubscribe/{subscriber.email}/{newsletter.category.id}/',
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
def unsubscribe(request, email, newsletter_category_id):
    subscriber = get_object_or_404(Subscriber, email=email)
    newsletter_category = get_object_or_404(CategoryNewsletter, id=newsletter_category_id)

    if request.method == 'GET':
        subscriber.subscribed_newsletters.remove(newsletter_category)
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
                subscriber.subscribed_newsletters.add(newsletter.category)
                
            subscriber.save()
            statusReturn = status.HTTP_201_CREATED if created else status.HTTP_200_OK
        return Response({'message': 'Subscriber added successfully'}, status=statusReturn)
    except:
        return Response({'error': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_newsletters(request):
    categories = CategoryNewsletter.objects.all()
    newsletters = []
    for category in categories:
        category.last = Newsletter.objects.filter(category__id=category.id).order_by('-id').first()
        if category.last:
            newsletters.append(category.last)
    serializer = NewsletterSerializer(newsletters, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_statistics(request):
    num_sent_mails = Newsletter.objects.count()
    num_subscribers = Subscriber.objects.count()

    data = {
        'num_sent_mails': num_sent_mails,
        'num_subscribers': num_subscribers,
    }

    return Response(data, status=status.HTTP_200_OK)