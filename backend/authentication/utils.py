from django.utils.crypto import get_random_string
import requests
from django.conf import settings
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from core.models import Student, Mentor

User = get_user_model()

def get_github_user_data(code):
    """
    Exchanges the authorization code for an access token 
    and then fetches the user's profile from GitHub.
    """
    # 1. Exchange code for access token
    token_url = 'https://github.com/login/oauth/access_token'
    payload = {
        'client_id': settings.SOCIAL_AUTH_GITHUB_KEY,
        'client_secret': settings.SOCIAL_AUTH_GITHUB_SECRET,
        'code': code,
    }
    headers = {'Accept': 'application/json'}
    
    response = requests.post(token_url, data=payload, headers=headers)
    
    if response.status_code != 200:
        return None
        
    access_token = response.json().get('access_token')
    
    if not access_token:
        return None

    # 2. Use access token to get user info
    user_url = 'https://api.github.com/user'
    user_headers = {'Authorization': f'token {access_token}'}
    user_response = requests.get(user_url, headers=user_headers)
    
    if user_response.status_code != 200:
        return None
        
    return user_response.json()

def create_or_get_github_user(github_data):
    """
    Finds a user by their GitHub username. 
    If they don't exist, it creates a new Student account for them.
    """
    github_username = github_data.get('login')
    email = github_data.get('email') or f"{github_username}@github.example.com"
    
    # Try to find existing user
    try:
        user = User.objects.get(github_username=github_username)
        return user
    except User.DoesNotExist:
        # Create new user if not found
        user = User.objects.create_user(
            username=github_username,
            email=email,
            password=get_random_string(length=32),
            github_username=github_username,
            role='student'
        )
        
        Student.objects.create(
            user=user,
            college="Not Specified",
            year="1st Year",
            branch="Not Specified"
        )
        
        return user