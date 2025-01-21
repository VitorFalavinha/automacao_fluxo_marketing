from rest_framework import serializers
from .models import Job

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title','description', 'client', 'status','whatsapp_number', 'email', 'link','is_archived'] 