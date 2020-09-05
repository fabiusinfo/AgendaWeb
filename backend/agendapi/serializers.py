from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Appointment, Hour

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Appointment
        fields = ['id', 'name', 'rut', 'phone', 'email', 'appointment_day', 'appointment_hour']

class HourSerializer(serializers.ModelSerializer):
    class Meta:
        model=Hour
        fields = ['id', 'day', 'hour', 'available', 'appointment_id']
    def update(self, instance, validated_data):
        instance.available = validated_data.get('available', instance.available)
        instance.save(update_fields=["available"])
        return instance