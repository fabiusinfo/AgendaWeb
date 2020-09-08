from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Appointment, Hour
from django.db import transaction



class HourSerializer(serializers.ModelSerializer):
    appointment_name = serializers.CharField(source='appointment_id.name', read_only=True)
    appointment_email = serializers.CharField(source='appointment_id.email', read_only=True)
    appointment_rejected = serializers.BooleanField(source='appointment_id.rejected', read_only=True)
    class Meta:
        model=Hour
        fields = ['id', 'day', 'hour', 'available', 'appointment_id', 'appointment_name', 'appointment_email', 'appointment_rejected']
    def update(self, instance, validated_data):
        instance.available = validated_data.get('available', instance.available)
        instance.save(update_fields=["available"])
        return instance

class AppointmentSerializer(serializers.ModelSerializer):
    day = serializers.DateField(write_only=True)
    hour = serializers.TimeField(write_only=True)
    class Meta:
        model=Appointment
        fields = ['id', 'name', 'rut', 'phone', 'email', 'day', 'hour']
    def create(self, validated_data):
        with transaction.atomic():
            appointment_day = validated_data.pop('day')
            appointment_hour = validated_data.pop('hour')
            appointment = Appointment.objects.create(**validated_data)
            day_hour_instance = Hour.objects.get(day=appointment_day, hour=appointment_hour, available=True)
            day_hour_instance.appointment_id = appointment
            day_hour_instance.available = False
            day_hour_instance.save()
            return appointment