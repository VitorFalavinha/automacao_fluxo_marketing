# jobs/urls.py
from django.urls import path
from .views import JobCreateView, JobListView

urlpatterns = [
    path('jobs/create/', JobCreateView.as_view(), name='create_job'),
    path('jobs/', JobListView.as_view(), name='list_jobs'),
]
