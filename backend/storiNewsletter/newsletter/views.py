from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Newsletter, Subscriber
from .serializers import NewsletterSerializer, SubscriberSerializer
from django.core.mail import send_mail

@api_view(['POST'])
def upload_newsletter(request):
    serializer = NewsletterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Newsletter uploaded successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def send_newsletter(request):
    newsletter = Newsletter.objects.last()
    subscribers = Subscriber.objects.filter(is_subscribed=True)
    if newsletter and subscribers:
        email = send_mail(
            'Stori Newsletter',
            'Here is the latest newsletter!',
            'jblancoh26@gmail.com',
            [subscriber.email for subscriber in subscribers],
            fail_silently=False,
        )
        email.attach_file(newsletter.document.path),
        email.send()
        return Response({'message': 'Newsletter sent successfully'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Newsletter or recipients not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def unsubscribe(request, email):
    try:
        subscriber = Subscriber.objects.get(email=email)
    except Subscriber.DoesNotExist:
        return Response({'error': 'Subscriber not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        subscriber.is_subscribed = False
        subscriber.save()
        return Response({'message': 'Unsubscribed successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid request method'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
def add_subscriber(request):
    serializer = SubscriberSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Subscriber added successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
