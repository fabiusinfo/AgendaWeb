from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Appointment, Hour

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields = ['name', 'rut', 'phone', 'email', 'appointment_day', 'appointment_hour']

class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Hour
        fields = ['day', 'hour', 'available', 'appointment_id']