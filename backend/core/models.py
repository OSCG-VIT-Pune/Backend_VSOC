"""
VSoC Platform - Database Models
Industry-grade models for managing users, students, mentors, projects, and contributions
"""

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import URLValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone

# ============================================================================
# CHOICES
# ============================================================================

ROLE_CHOICES = [
    ('student', 'Student'),
    ('mentor', 'Mentor'),
    ('admin', 'Admin'),
]

DIFFICULTY_CHOICES = [
    ('easy', 'Easy'),
    ('medium', 'Medium'),
    ('hard', 'Hard'),
]

EVAL_TYPE_CHOICES = [
    ('mid', 'Mid Evaluation'),
    ('end', 'End Evaluation'),
]

PR_STATE_CHOICES = [
    ('open', 'Open'),
    ('merged', 'Merged'),
    ('closed', 'Closed'),
]

ANNOUNCEMENT_TARGET_CHOICES = [
    ('all', 'All Users'),
    ('students', 'Students Only'),
    ('mentors', 'Mentors Only'),
]

# ============================================================================
# USER MODELS
# ============================================================================

class User(AbstractUser):
    """Extended User model with GitHub integration and role-based access"""
    
    # GitHub Integration
    github_id = models.CharField(
        max_length=100, unique=True, null=True, blank=True,
        db_index=True,
        help_text="GitHub user ID for OAuth"
    )
    github_username = models.CharField(
        max_length=100, unique=True, null=True, blank=True,
        db_index=True,
        help_text="GitHub username"
    )
    avatar_url = models.URLField(
        blank=True, null=True,
        help_text="Profile picture URL"
    )
    
    # Role & Status
    role = models.CharField(
        max_length=20, choices=ROLE_CHOICES, default='student',
        db_index=True
    )
    is_verified = models.BooleanField(
        default=False,
        help_text="Email verification status"
    )
    
    # Contact Information
    phone = models.CharField(
        max_length=15, blank=True,
        help_text="Contact phone number"
    )
    
    # Social Links
    linkedin_url = models.URLField(
        blank=True, null=True,
        help_text="LinkedIn profile URL"
    )
    
    # Timestamps
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'users'
        ordering = ['-date_joined']
        indexes = [
            models.Index(fields=['github_username']),
            models.Index(fields=['role', 'is_verified']),
        ]
    
    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"


class Student(models.Model):
    """Student profile with academic details and contribution metrics"""
    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        related_name='student_profile'
    )
    
    # Academic Information
    college = models.CharField(
        max_length=200,
        help_text="College/University name"
    )
    year = models.CharField(
        max_length=50,
        help_text="Current year of study"
    )
    branch = models.CharField(
        max_length=100,
        help_text="Branch/Department"
    )
    
    # Bio
    bio = models.TextField(
        blank=True,
        max_length=500,
        help_text="Student bio/description"
    )
    
    # GitHub Stats (synced from GitHub API)
    total_commits = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    total_prs = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    lines_added = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    lines_removed = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    languages_used = models.JSONField(
        default=list,
        help_text="Programming languages used"
    )
    
    # Evaluation Status
    passed_mid_eval = models.BooleanField(default=False)
    passed_end_eval = models.BooleanField(default=False)
    
    # Achievements
    certificate_url = models.URLField(blank=True, null=True)
    blog_link = models.URLField(
        blank=True, null=True,
        help_text="Personal blog or portfolio"
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'students'
        ordering = ['-total_commits']
        indexes = [
            models.Index(fields=['-total_commits', '-total_prs']),
        ]
    
    def __str__(self):
        return f"{self.user.username} - {self.college}"
    
    @property
    def total_contributions(self):
        """Calculate total contributions"""
        return self.total_commits + self.total_prs


class Mentor(models.Model):
    """Mentor profile with expertise and project management"""
    
    user = models.OneToOneField(
        User, on_delete=models.CASCADE,
        related_name='mentor_profile'
    )
    
    # Professional Information
    organization = models.CharField(
        max_length=200, blank=True,
        help_text="Current organization/company"
    )
    expertise = models.CharField(
        max_length=200,
        help_text="Areas of expertise (comma-separated)"
    )
    bio = models.TextField(
        blank=True,
        max_length=500,
        help_text="Mentor bio/description"
    )
    experience = models.CharField(
        max_length=50,
        help_text="Years of experience"
    )
    
    # Projects
    projects_maintained = models.TextField(
        blank=True,
        help_text="List of open source projects maintained"
    )
    
    # Stats
    total_projects = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'mentors'
        ordering = ['-total_projects']
    
    def __str__(self):
        return f"{self.user.username} - {self.organization or 'Independent'}"


# ============================================================================
# PROJECT MODELS
# ============================================================================

class Project(models.Model):
    """Open source projects managed by mentors"""
    
    name = models.CharField(max_length=200)
    description = models.TextField()
    repo_link = models.URLField(
        unique=True,
        validators=[URLValidator()],
        help_text="GitHub repository URL"
    )
    
    # Mentor Assignment
    mentor = models.ForeignKey(
        Mentor, on_delete=models.CASCADE,
        related_name='projects'
    )
    secondary_mentor = models.ForeignKey(
        Mentor,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='secondary_projects',
        help_text="Optional secondary mentor"
    )
    
    # Project Details
    tags = models.JSONField(
        default=list,
        help_text='Technology tags ["django", "react"]'
    )
    difficulty = models.CharField(
        max_length=20, choices=DIFFICULTY_CHOICES,
        default='medium'
    )
    tech_stack = models.JSONField(
        default=list,
        help_text='Tech stack ["Python", "JavaScript"]'
    )
    
    # Communication
    comm_channel = models.CharField(
        max_length=200,
        blank=True,
        help_text="Slack/Discord channel for project"
    )
    
    # Approval Status
    is_approved = models.BooleanField(default=False)
    approved_at = models.DateTimeField(null=True, blank=True)
    approved_by = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL,
        related_name='approved_projects'
    )
    rejection_reason = models.TextField(blank=True)
    
    # Stats
    commit_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    pull_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    contributors_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['is_approved', '-created_at']),
            models.Index(fields=['difficulty']),
        ]
    
    def __str__(self):
        return f"{self.name} by {self.mentor.user.username}"
    
    def approve(self, approved_by_user):
        """Approve the project"""
        self.is_approved = True
        self.approved_at = timezone.now()
        self.approved_by = approved_by_user
        self.save()


# ============================================================================
# CONTRIBUTION MODELS
# ============================================================================

class Contribution(models.Model):
    """Track student contributions to projects"""
    
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE,
        related_name='contributions'
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE,
        related_name='contributions'
    )
    
    # Contribution Metrics
    commit_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    pr_count = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    lines_added = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    lines_removed = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]
    )
    
    # Timestamps
    first_contribution = models.DateTimeField(auto_now_add=True)
    last_contribution = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'contributions'
        unique_together = ['student', 'project']
        ordering = ['-last_contribution']
        indexes = [
            models.Index(fields=['student', '-commit_count']),
            models.Index(fields=['project', '-pr_count']),
        ]
    
    def __str__(self):
        return f"{self.student.user.username} → {self.project.name}"


class PullRequest(models.Model):
    """Track individual pull requests"""
    
    contribution = models.ForeignKey(
        Contribution,
        on_delete=models.CASCADE,
        related_name='pull_requests'
    )
    
    # PR Details
    pr_url = models.URLField(unique=True)
    pr_number = models.IntegerField()
    title = models.CharField(max_length=300)
    state = models.CharField(
        max_length=20,
        choices=PR_STATE_CHOICES,
        default='open'
    )
    
    # Metrics
    additions = models.IntegerField(default=0)
    deletions = models.IntegerField(default=0)
    files_changed = models.IntegerField(default=0)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    merged_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = 'pull_requests'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['state', '-created_at']),
        ]
    
    def __str__(self):
        return f"PR #{self.pr_number}: {self.title}"


# ============================================================================
# EVALUATION MODELS
# ============================================================================

class Evaluation(models.Model):
    """Student evaluations (mid-term and end-term)"""
    
    student = models.ForeignKey(
        Student,
        on_delete=models.CASCADE,
        related_name='evaluations'
    )
    
    # Evaluation Details
    eval_type = models.CharField(
        max_length=10,
        choices=EVAL_TYPE_CHOICES
    )
    passed = models.BooleanField(default=False)
    
    # Metrics
    commit_count = models.IntegerField(default=0)
    pr_count = models.IntegerField(default=0)
    projects_count = models.IntegerField(default=0)
    
    # Feedback
    feedback = models.TextField(blank=True)
    evaluated_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='evaluations_conducted'
    )
    
    # Timestamps
    evaluated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'evaluations'
        unique_together = ['student', 'eval_type']
        ordering = ['-evaluated_at']
    
    def __str__(self):
        return f"{self.student.user.username} - {self.get_eval_type_display()}"


# ============================================================================
# SYSTEM MODELS
# ============================================================================

class GlobalStats(models.Model):
    """Platform-wide statistics (singleton model)"""
    
    # Counts
    total_students = models.IntegerField(default=0)
    total_mentors = models.IntegerField(default=0)
    total_projects = models.IntegerField(default=0)
    total_commits = models.IntegerField(default=0)
    total_prs = models.IntegerField(default=0)
    total_lines_added = models.IntegerField(default=0)
    total_lines_removed = models.IntegerField(default=0)
    
    # Timestamp
    last_synced = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'global_stats'
        verbose_name = 'Global Statistics'
        verbose_name_plural = 'Global Statistics'
    
    def __str__(self):
        return f"Global Stats (Updated: {self.last_synced})"
    
    @classmethod
    def get_stats(cls):
        """Get or create singleton stats instance"""
        stats, created = cls.objects.get_or_create(pk=1)
        return stats


class Announcement(models.Model):
    """Platform announcements"""
    
    title = models.CharField(max_length=200)
    content = models.TextField()
    target = models.CharField(
        max_length=20,
        choices=ANNOUNCEMENT_TARGET_CHOICES,
        default='all'
    )
    is_pinned = models.BooleanField(default=False)
    
    # Author
    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='announcements'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'announcements'
        ordering = ['-is_pinned', '-created_at']
    
    def __str__(self):
        return self.title
