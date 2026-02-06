from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.models import Student, Mentor

User = get_user_model()

class StudentSignupSerializer(serializers.ModelSerializer):
    college = serializers.CharField(max_length=200)
    year = serializers.CharField(max_length=50)
    branch = serializers.CharField(max_length=100)
    bio = serializers.CharField(style={'base_template': 'textarea.html'}, required=False, allow_blank=True)
    
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 
                  'phone', 'github_username', 'linkedin_url', 
                  'college', 'year', 'branch', 'bio']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_github_username(self, value):
        if value and User.objects.filter(github_username=value).exists():
            raise serializers.ValidationError("A user with this GitHub username already exists.")
        return value

    def create(self, validated_data):
        # Extract student-specific data
        college = validated_data.pop('college')
        year = validated_data.pop('year')
        branch = validated_data.pop('branch')
        bio = validated_data.pop('bio', '')

        # Create the User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            github_username=validated_data.get('github_username', ''),
            linkedin_url=validated_data.get('linkedin_url', ''),
            role='student'
        )

        # Create the Student Profile
        Student.objects.create(
            user=user,
            college=college,
            year=year,
            branch=branch,
            bio=bio
        )

        return user
    
class MentorSignupSerializer(serializers.ModelSerializer):
    expertise = serializers.CharField(max_length=200)
    projects_maintained = serializers.CharField(style={'base_template': 'textarea.html'}, required=False, allow_blank=True)
    organization = serializers.CharField(max_length=200, required=False, allow_blank=True)
    experience = serializers.CharField(max_length=50)
    bio = serializers.CharField(style={'base_template': 'textarea.html'}, required=False, allow_blank=True)
    
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 
                  'phone', 'github_username', 'linkedin_url', 
                  'expertise', 'projects_maintained', 'organization', 'experience', 'bio']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_github_username(self, value):
        if value and User.objects.filter(github_username=value).exists():
            raise serializers.ValidationError("A user with this GitHub username already exists.")
        return value

    def create(self, validated_data):
        # Extract mentor-specific data
        expertise = validated_data.pop('expertise')
        projects_maintained = validated_data.pop('projects_maintained', '')
        organization = validated_data.pop('organization', '')
        experience = validated_data.pop('experience')
        bio = validated_data.pop('bio', '')

        # Create the User
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            phone=validated_data.get('phone', ''),
            github_username=validated_data.get('github_username', ''),
            linkedin_url=validated_data.get('linkedin_url', ''),
            role='mentor'
        )

        # Create the Mentor Profile
        Mentor.objects.create(
            user=user,
            expertise=expertise,
            projects_maintained=projects_maintained,
            organization=organization,
            experience=experience,
            bio=bio
        )

        return user