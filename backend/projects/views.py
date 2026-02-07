from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    # 1. List: Only show projects belonging to the logged-in Mentor
    def get_queryset(self):
        return Project.objects.filter(mentor=self.request.user).order_by('-created_at')

    # 2. Create: Automatically set the 'mentor' field to the current user
    def perform_create(self, serializer):
        serializer.save(mentor=self.request.user)