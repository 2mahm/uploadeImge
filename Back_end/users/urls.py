from django.urls import path
from .views import *
urlpatterns = [
    path('register',RegisterView.as_view() ),
    path('images/upload', UploadImageView.as_view()),
    path('images', ListImagesView.as_view()),

    path('login',LoginView.as_view() ),
    path('user',UserView.as_view() ),
    path('logout',LogoutView.as_view() ),

]