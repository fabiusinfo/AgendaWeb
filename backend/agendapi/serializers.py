from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Appointment

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields = ['name', 'rut', 'phone', 'email', 'day', 'hour']