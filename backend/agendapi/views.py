from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import AppointmentSerializer
from .models import Appointment
from rest_framework.response import Response

# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

