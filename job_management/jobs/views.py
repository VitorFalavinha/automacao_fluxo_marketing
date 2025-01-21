from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Job
from .serializers import JobSerializer


# View para criar um job
class JobCreateView(generics.CreateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "message": "Job criado com sucesso!",
                "job": serializer.data,
            },
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


# View para listar jobs
class JobListView(generics.ListAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


# View para atualizar um job
class JobUpdateView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def update(self, request, *args, **kwargs):
        job = self.get_object()  # Obtém o job baseado no ID na URL
        serializer = self.get_serializer(job, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(
            {
                "message": "Job atualizado com sucesso!",
                "job": serializer.data,
            },
            status=status.HTTP_200_OK
        )


class JobArchiveView(generics.UpdateAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def update(self, request, *args, **kwargs):
        job = self.get_object()  # Obtém o job baseado no ID na URL
        job.is_archived = True  # Mover para arquivado
        job.save()
        return Response(
            {
                "message": "Job arquivado com sucesso!",
                "job": JobSerializer(job).data,
            },
            status=status.HTTP_200_OK
        )




class ArchivedJobListView(generics.ListAPIView):
    queryset = Job.objects.filter(is_archived=True)
    serializer_class = JobSerializer
