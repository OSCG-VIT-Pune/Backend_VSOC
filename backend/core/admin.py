from django.contrib import admin
from .models import (
    User, Student, Mentor, Project, Contribution, 
    PullRequest, Evaluation, GlobalStats, Announcement
)

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'role', 'is_verified', 'date_joined']
    list_filter = ['role', 'is_verified']
    search_fields = ['username', 'email', 'github_username']

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'college', 'year', 'total_commits', 'total_prs']
    search_fields = ['user__username', 'college']

@admin.register(Mentor)
class MentorAdmin(admin.ModelAdmin):
    list_display = ['user', 'organization', 'expertise', 'total_projects']
    search_fields = ['user__username', 'organization']

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['name', 'mentor', 'difficulty', 'is_approved', 'created_at']
    list_filter = ['difficulty', 'is_approved']
    search_fields = ['name', 'mentor__user__username']

@admin.register(Contribution)
class ContributionAdmin(admin.ModelAdmin):
    list_display = ['student', 'project', 'commit_count', 'pr_count']
    search_fields = ['student__user__username', 'project__name']

@admin.register(PullRequest)
class PullRequestAdmin(admin.ModelAdmin):
    list_display = ['pr_number', 'title', 'state', 'created_at']
    list_filter = ['state']

@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ['student', 'eval_type', 'passed', 'evaluated_at']
    list_filter = ['eval_type', 'passed']

@admin.register(GlobalStats)
class GlobalStatsAdmin(admin.ModelAdmin):
    list_display = ['total_students', 'total_mentors', 'total_projects', 'last_synced']

@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):
    list_display = ['title', 'target', 'is_pinned', 'created_at']
    list_filter = ['target', 'is_pinned']
