from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id', 
            'title', 
            'domain', 
            'students_required', 
            'problem_statement', 
            'expected_solution', 
            'repo_link', 
            'comms_link', 
            'is_active', 
            'is_completed', 
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']