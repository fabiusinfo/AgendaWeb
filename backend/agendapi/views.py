from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import AgHoraSerializer
from .models import AgHora
from rest_framework.response import Response

# Create your views here.

class AgHoraViewSet(viewsets.ModelViewSet):
    queryset = AgHora.objects.all()
    serializer_class = AgHoraSerializer

