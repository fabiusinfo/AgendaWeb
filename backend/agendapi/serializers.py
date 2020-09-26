from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Appointment, Hour, Place, Campana, RegDonacion, Prediction, Blood
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
            return 'Saved Appointment'


# Inicio - Unión con código implementado en el sprint 0

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'address', 'next_month_prediction', 'codigo']

class CampanaSerializer(serializers.ModelSerializer):
    place_name = serializers.CharField(source='lugar.name', read_only=True)

    class Meta:
        model = Campana
        fields = ['id', 'lugar', 'dia_inicio', 'dia_termino', 'hora_inicio','hora_termino','imagen', 'place_name']


class RegDonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegDonacion
        fields = ['id','fecha','lugar','rut','nombres','apellido1','apellido2', 'sangre']

class PredictionSerializer(serializers.ModelSerializer):
    place_name = serializers.CharField(source='place_id.name', read_only=True)

    class Meta:
        model = Prediction
        fields = ['id', 'place_id', 'donators', 'place_name']

class BloodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blood
        fields = ['id', 'blood_name', 'quantity']

# Fin - Unión con código implementado en el sprint 0