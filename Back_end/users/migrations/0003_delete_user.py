# Generated by Django 5.1.3 on 2024-12-02 14:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_image'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
    ]
