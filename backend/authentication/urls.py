from django.urls import path
from .views import StudentSignupView, MentorSignupView, GitHubLoginView

urlpatterns = [
    path('register/student/', StudentSignupView.as_view(), name='student_signup'),
    path('register/mentor/', MentorSignupView.as_view(), name='mentor_signup'),
    path('github/callback/', GitHubLoginView.as_view(), name='github_callback'),
]