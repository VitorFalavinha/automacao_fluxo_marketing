from django.db import models



class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    client = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='pending')  # pending, approved, rejected
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    whatsapp_number = models.CharField(max_length=20, null=True, blank=True)  
    email = models.EmailField(null=True, blank=True)  # Novo campo
    link = models.URLField(max_length=500, null=True, blank=True)  # Campo para link

    def __str__(self):
        return self.title
