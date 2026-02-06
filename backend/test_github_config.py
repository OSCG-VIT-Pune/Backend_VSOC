"""
Quick script to test GitHub OAuth configuration
"""
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
BASE_DIR = Path(__file__).resolve().parent
env_path = BASE_DIR / '.env'
load_dotenv(dotenv_path=env_path)

print("=" * 60)
print("🔍 GITHUB OAUTH CONFIGURATION CHECK")
print("=" * 60)

# Check GitHub Client ID
client_id = os.getenv('GITHUB_CLIENT_ID')
if client_id and client_id != 'your-github-oauth-client-id':
    print(f"✅ GitHub Client ID: {client_id[:10]}...{client_id[-4:]}")
else:
    print("❌ GitHub Client ID: NOT CONFIGURED")
    print("   Please update GITHUB_CLIENT_ID in .env file")

# Check GitHub Client Secret
client_secret = os.getenv('GITHUB_CLIENT_SECRET')
if client_secret and client_secret != 'your-github-oauth-client-secret':
    print(f"✅ GitHub Client Secret: {client_secret[:10]}...{client_secret[-4:]}")
else:
    print("❌ GitHub Client Secret: NOT CONFIGURED")
    print("   Please update GITHUB_CLIENT_SECRET in .env file")

print("\n" + "=" * 60)

if (client_id and client_id != 'your-github-oauth-client-id' and 
    client_secret and client_secret != 'your-github-oauth-client-secret'):
    print("✅ GitHub OAuth is CONFIGURED!")
    print("\nNext steps:")
    print("1. Make sure frontend .env.local has NEXT_PUBLIC_GITHUB_CLIENT_ID")
    print("2. Restart both servers")
    print("3. Go to http://localhost:3000/login")
    print("4. Click 'CONTINUE WITH GITHUB'")
else:
    print("❌ GitHub OAuth is NOT CONFIGURED")
    print("\nTo configure:")
    print("1. Create GitHub OAuth App at:")
    print("   https://github.com/settings/developers")
    print("2. Set callback URL to:")
    print("   http://localhost:3000/auth/github/callback")
    print("3. Copy Client ID and Secret to backend/.env")
    print("4. See GITHUB_OAUTH_SETUP.md for detailed instructions")

print("=" * 60)
