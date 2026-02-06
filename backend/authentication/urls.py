from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import StudentSignupView, MentorSignupView, GitHubLoginView, CurrentUserView, LoginView

urlpatterns = [
    path('register/student/', StudentSignupView.as_view(), name='student_signup'),
    path('register/mentor/', MentorSignupView.as_view(), name='mentor_signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('github/callback/', GitHubLoginView.as_view(), name='github_callback'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', CurrentUserView.as_view(), name='current_user'),
]