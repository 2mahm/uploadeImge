from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer,ImageSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.http import HttpResponse
import jwt,datetime
from rest_framework.views import APIView
from .serializers import UserSerializer, ImageSerializer
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.http import HttpResponse
import jwt, datetime
from .models import User, Image
from rest_framework import status, permissions
from rest_framework.parsers import MultiPartParser
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken



# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        username=request.data['username']
        password=request.data['password']
        if User.objects.filter(username=username).exists():
            return Response({'message':'Username already exists'},status=status.HTTP_400_BAD_REQUEST)
        user=User.objects.create_user(username=username,password=password)
        return Response({"message":"User created successfully"}, status=status.HTTP_201_CREATED)


        # serializer=UserSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        # serializer.save()
        # return Response(serializer.data)
class LoginView(APIView):
    def post(self,request):
        username=request.data['username']
        password=request.data['password']  
        user=authenticate(username=username,password=password)
        if user is not None:
           refresh = RefreshToken.for_user(user)  
           return Response({"refresh": str(refresh), "access": str(refresh.access_token)})
           
        return Response({"error": "Invalid credentials"},status=status.HTTP_401_UNAUTHORIZED)   
                 # user=User.objects.filter(email=email).first()
        # print(user)
        # if user is None:
        #     raise AuthenticationFailed('User not found')
        # if not user.check_password(password):
        #     raise AuthenticationFailed('Incorrect password')
        
        # payload={
        #     'id':user.id,
        #     'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes=60),#the time that the token is valid
        #     'iat':datetime.datetime.utcnow()#the time that the token is created
        # }
        # token=jwt.encode(payload,'secret',algorithm='HS256')
        # response=Response()
        # response.set_cookie(key='jwt',value=token,httponly=True)
        # response.data={
        #     'jwt':token
        # }
        
        # return response
    

class UploadImageView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]
    def post(self, request):
        image=request.FILES['image']
        images=Image.objects.create(user=request.user,image=image)
        return Response({'message':'image uploaded successfully'},status=status.HTTP_200_OK)
    


        
class ListImagesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        images = Image.objects.filter(user=request.user)
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)  





class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
            print(payload)
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response
   