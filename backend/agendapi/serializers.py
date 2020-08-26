from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import AgHora

class AgHoraSerializer(serializers.ModelSerializer):
    class Meta:
        model=AgHora
        fields = ['rut','nombres','apellido1','apellido2']