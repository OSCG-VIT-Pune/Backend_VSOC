from .utils import get_github_user_data, create_or_get_github_user
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
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