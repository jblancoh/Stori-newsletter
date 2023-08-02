from celery import shared_task
from rest_framework.response import Response
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from .models import Newsletter, Subscriber, ScheduledNewsletter
from rest_framework import status
from decouple import config

@shared_task
def send_newsletter_task(scheduled_newsletter_id):
    scheduled_newsletter = ScheduledNewsletter.objects.get(id=scheduled_newsletter_id)
    newsletter = Newsletter.objects.filter(category=scheduled_newsletter.category).order_by('id').last()
    subscribers = Subscriber.objects.filter(subscribed_newsletters__id=newsletter.category.id)
    if newsletter and subscribers:
        for subscriber in subscribers:
            
            email_context = {
                'subscriber_name': subscriber.email,
                'unsubscribe_link': f'{config("FRONTEND_URL")}/{subscriber.email}/{newsletter.category.id}/',
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