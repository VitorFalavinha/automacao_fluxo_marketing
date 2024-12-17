# Generated by Django 5.1.1 on 2024-12-17 14:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_job_email_job_file_upload_job_whatsapp_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='job',
            name='file_upload',
        ),
        migrations.AddField(
            model_name='job',
            name='link',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]