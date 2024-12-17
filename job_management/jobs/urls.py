from django.urls import path
from .views import JobCreateView, JobListView, JobUpdateView, JobDeleteView

urlpatterns = [
    path('jobs/create/', JobCreateView.as_view(), name='create_job'),  # Rota para criar
    path('jobs/', JobListView.as_view(), name='list_jobs'),  # Rota para listar jobs
    path('jobs/<int:pk>/update/', JobUpdateView.as_view(), name='update_job'),  # Rota para atualizar job
    path('http://localhost:8000/api/jobs/<int:pk>/delete/', JobDeleteView.as_view(), name='delete_job'),  # Rota para deletar job
]
