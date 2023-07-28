# Generated by Django 3.2.20 on 2023-07-28 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('newsletter', '0005_remove_newsletter_created_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='subscriber',
            name='newsletter',
        ),
        migrations.AddField(
            model_name='subscriber',
            name='subscribed_newsletters',
            field=models.ManyToManyField(blank=True, to='newsletter.Newsletter'),
        ),
    ]