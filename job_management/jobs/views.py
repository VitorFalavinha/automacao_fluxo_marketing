from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.generics import DestroyAPIView
from .serializers import JobSerializer
from .models import Job


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
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(
            {
                "message": "Job atualizado com sucesso!",
                "job": serializer.data,
            },
            status=status.HTTP_200_OK
        )


# View para deletar um job
class JobDeleteView(DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Job deletado com sucesso!"},
            status=status.HTTP_204_NO_CONTENT
        )
