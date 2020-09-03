from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import AppointmentSerializer, HourSerializer
from .models import Appointment, Hour
from rest_framework.response import Response

# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class HourViewSet(viewsets.ModelViewSet):
    queryset = Hour.objects.all()
    serializer_class = HourSerializer