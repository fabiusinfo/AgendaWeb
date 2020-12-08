from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Appointment, Hour, Place, Campana, RegDonacion, Prediction, Blood
from django.db import transaction


class HourSerializer(serializers.ModelSerializer):

    class Meta:
        model = Hour
        fields = ['id', 'campaign_id', 'day', 'hour', 'available', ]


class AppointmentSerializer(serializers.ModelSerializer):
    hour_id = serializers.PrimaryKeyRelatedField(queryset=Hour.objects.all())

    class Meta:
        model = Appointment
        fields = ['id', 'name', 'rut', 'phone', 'email',
                  'accepted', 'rejected', 'hour_id']

    @transaction.atomic
    def create(self, validated_data):
        appointment = Appointment.objects.create(**validated_data)
        appointment_hour_id = validated_data['hour_id']
        day_hour_instance = Hour.objects.get(
            id=appointment_hour_id.id, available=True)
        day_hour_instance.available = False
        day_hour_instance.save()
        return validated_data

    @transaction.atomic
    def update(self, instance, validated_data):
        isRejected = validated_data['rejected']
        if isRejected == True:
            hour_instance = validated_data['hour_id']
            hour_instance.available = True
            hour_instance.save()
        return super().update(instance, validated_data)


# Inicio - Unión con código implementado en el sprint 0

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'address', 'next_month_prediction', 'codigo']


class CampanaSerializer(serializers.ModelSerializer):
    place_name = serializers.CharField(source='lugar.name', read_only=True)
    place_address = serializers.CharField(
        source='lugar.address', read_only=True)

    class Meta:
        model = Campana
        fields = ['id', 'lugar', 'dia_inicio', 'dia_termino', 'hora_inicio',
                  'hora_termino', 'imagen', 'place_name', 'place_address']


class RegDonacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegDonacion
        fields = ['id', 'fecha', 'lugar', 'rut',
                  'nombres', 'apellido1', 'apellido2', 'sangre']


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

# Inicio - API para manejo de usuarios


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['username', 'email']
            )
        ]

    def create(self, validated_data):
        username = validated_data.get('username')
        password = validated_data.get('password')
        email = validated_data.get('email')
        user = User.objects.create_user(username, email, password)
        user.set_password(password)
        user.save()
        return user

# Fin - API para manejo de usuarios
