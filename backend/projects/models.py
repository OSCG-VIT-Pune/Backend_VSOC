from django.db import models
from django.conf import settings

class Project(models.Model):
    mentor = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='projects'
    )
    
    title = models.CharField(max_length=255)
    domain = models.CharField(max_length=100)
    students_required = models.CharField(max_length=50) 
    problem_statement = models.TextField()
    expected_solution = models.TextField()
    repo_link = models.URLField(max_length=500)
    comms_link = models.URLField(max_length=500)
    
    is_active = models.BooleanField(default=True)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title