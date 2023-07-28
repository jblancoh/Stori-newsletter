from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Newsletter, Subscriber
from .serializers import NewsletterSerializer, SubscriberSerializer
from django.core.mail import send_mail, EmailMessage
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404

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
    newsletter = Newsletter.objects.get(id=newsletter_id)
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
            email.attach_file(newsletter.document.path),
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
    email = request.data.get('email')
    subscribed_newsletters = request.data.get('subscribed_newsletters')

    try:
        subscriber = Subscriber.objects.get(email=email)
        subscriber.subscribed_newsletters.add(Newsletter.objects.get(id=subscribed_newsletters))
        subscriber.save()
        return Response({'message': 'Subscriber added successfully'}, status=status.HTTP_201_CREATED)
    except Subscriber.DoesNotExist:
        serializer = SubscriberSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Subscriber added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
