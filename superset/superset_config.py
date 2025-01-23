import os

FRAME_EMBEDDABLE = True
BABEL_DEFAULT_LOCALE = "pt_BR"
ENABLE_PROXY_FIX = True
SESSION_COOKIE_SAMESITE = None
PUBLIC_ROLE_LIKE_GAMMA = True
ENABLE_REFERER_HEADER = False
WTF_CSRF_ENABLED = False
SQLALCHEMY_DATABASE_URI = f"{os.getenv('DATABASE_DIALECT')}://{os.getenv('DATABASE_USER')}:{os.getenv('DATABASE_PASSWORD')}@{os.getenv('DATABASE_HOST')}:{os.getenv('DATABASE_PORT')}/{os.getenv('DATABASE_DB')}"

FEATURE_FLAGS = {
  "EMBEDDED_SUPERSET": True,
  "ENABLE_TEMPLATE_PROCESSING": True,
}

CORS_OPTIONS = {
  "supports_credentials": True,
  "allow_headers": ["*"],
  "resources":["*"],
  "origins": ["https://v2-dev.s3nd.com.br",'https://v2.s3nd.com.br']
}

LANGUAGES = {
  "en": {"flag": "us", "name": "Inglês"},
  "es": {"flag": "es", "name": "Espanhol"},
  "pt_BR": {"flag": "br", "name": "Português"},
}

from jwt_security import CustomSecurityManager
CUSTOM_SECURITY_MANAGER = CustomSecurityManager
