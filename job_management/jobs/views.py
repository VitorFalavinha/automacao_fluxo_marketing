from django.shortcuts import render

# jobs/views.py
from rest_framework import generics
from .serializers import JobSerializer
from .models import Job  


# View para criar um job
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# View para listar jobs
class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

# View atualizar um job
class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
      


 

