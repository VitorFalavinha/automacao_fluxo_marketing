from django.db import models



class Job(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    client = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='pending')  # pending, approved, rejected
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
