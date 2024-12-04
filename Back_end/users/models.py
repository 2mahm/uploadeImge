from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# class User(AbstractUser):
#     name = models.CharField(max_length=255)
#     email = models.CharField(max_length=255, unique=True)
#     password = models.CharField(max_length=255)
#     username = None

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = []
class Image(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    image=models.ImageField(upload_to='media/')
    uploaded_at=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.user.name} - {self.uploaded_at}"
