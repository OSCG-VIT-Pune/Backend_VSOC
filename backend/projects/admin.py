from django.contrib import admin
from .models import Project

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'mentor', 'domain', 'is_active', 'created_at')
    list_filter = ('domain', 'is_active', 'is_completed')
    search_fields = ('title', 'domain', 'mentor__username')