from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets, permissions, generics
from .serializers import AppointmentSerializer, HourSerializer
from .models import Appointment, Hour
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS

# Custom permissions classes

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class CreateOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'POST'


# Create your views here.

class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated|CreateOnly]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()



class HourList(generics.ListAPIView):
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated|ReadOnly]
    def get_queryset(self):
        queryset = Hour.objects.filter(available=True)
        day = self.request.query_params.get('day', None)
        if day is not None:
            queryset = queryset.filter(day=day, available=True)
        return queryset

class HourCreate(generics.CreateAPIView):
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated]
    
    