from .utils import get_github_user_data, create_or_get_github_user
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import StudentSignupSerializer, MentorSignupSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class StudentSignupView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = StudentSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "student_profile": {
                    "college": user.student_profile.college,
                    "year": user.student_profile.year,
                    "branch": user.student_profile.branch
                },
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MentorSignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = MentorSignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            
            return Response({
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role,
                "mentor_profile": {
                    "expertise": user.mentor_profile.expertise,
                    "experience": user.mentor_profile.experience
                },
                "tokens": tokens
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({
                'error': 'Please provide both username and password'
            }, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user
        user = authenticate(username=username, password=password)

        if user is not None:
            # Generate tokens
            tokens = get_tokens_for_user(user)
            
            # Prepare user data
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role,
                'first_name': user.first_name,
                'last_name': user.last_name,
            }

            # Add profile data based on role
            if user.role == 'student' and hasattr(user, 'student_profile'):
                user_data['student_profile'] = {
                    'college': user.student_profile.college,
                    'year': user.student_profile.year,
                    'branch': user.student_profile.branch
                }
            elif user.role == 'mentor' and hasattr(user, 'mentor_profile'):
                user_data['mentor_profile'] = {
                    'expertise': user.mentor_profile.expertise,
                    'experience': user.mentor_profile.experience
                }

            return Response({
                'user': user_data,
                'tokens': tokens
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
class GitHubLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        code = request.data.get('code')
        
        if not code:
            return Response({'error': 'Code is required'}, status=status.HTTP_400_BAD_REQUEST)
            
        # 1. Get user info from GitHub
        github_data = get_github_user_data(code)
        
        if not github_data:
            return Response({'error': 'Failed to authenticate with GitHub'}, status=status.HTTP_400_BAD_REQUEST)
            
        # 2. Create or get the user
        user = create_or_get_github_user(github_data)
        
        # 3. Generate tokens
        tokens = get_tokens_for_user(user)
        
        return Response({
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'role': user.role
            },
            'tokens': tokens
        })

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'role': user.role,
            'first_name': user.first_name,
            'last_name': user.last_name,
        })