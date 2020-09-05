from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets, permissions, generics
from .serializers import AppointmentSerializer, HourSerializer
from .models import Appointment, Hour
from rest_framework.response import Response

# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class HourViewSet(viewsets.ModelViewSet):
    serializer_class = HourSerializer
    queryset = Hour.objects.all()



class HourList(generics.ListAPIView):
    serializer_class = HourSerializer

    def get_queryset(self):
        queryset = Hour.objects.all()
        day = self.request.query_params.get('day', None)
        if day is not None:
            queryset = queryset.filter(day=day, available=True)
        return queryset
    