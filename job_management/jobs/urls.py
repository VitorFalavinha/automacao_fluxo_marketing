from django.urls import path
from .views import JobCreateView, JobListView, JobUpdateView, JobArchiveView, ArchivedJobListView

urlpatterns = [
     path('api/jobs/<int:pk>/', JobUpdateView.as_view(), name='job-update'),  # Atualizar job com ID

    path('api/jobs/', JobListView.as_view(), name='job-list'),  # Listar jobs

    path('api/jobs/create/', JobCreateView.as_view(), name='job-create'),  

    path('api/jobs/<int:pk>/archive/', JobArchiveView.as_view(), name='archive-job'),
    
    path('api/jobs/archived/', ArchivedJobListView.as_view(), name='archived'), 
]


