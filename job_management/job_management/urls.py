"""
URL configuration for job_management project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# job_management/urls.py
from django.contrib import admin
from django.urls import path, include
from jobs.views import JobCreateView, JobListView, JobUpdateView, JobArchiveView, ArchivedJobListView

urlpatterns = [
    path('api/jobs/<int:pk>/', JobUpdateView.as_view(), name='job-update'),  # Atualizar job com ID

    path('api/jobs/', JobListView.as_view(), name='job-list'),  # Listar jobs

    path('api/jobs/create/', JobCreateView.as_view(), name='job-create'),  

    path('api/jobs/<int:pk>/archive/', JobArchiveView.as_view(), name='archive-job'),
    
    path('api/jobs/archived/', ArchivedJobListView.as_view(), name='archived'), 
    
]

