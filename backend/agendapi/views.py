from django.contrib.auth.models import User
from django.shortcuts import render, HttpResponse, redirect
from django.http import JsonResponse
from django.db import transaction

from rest_framework import viewsets, permissions, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated, BasePermission, SAFE_METHODS

from firebase_admin import initialize_app
from firebase_admin import firestore


import keras
import pandas as pd
import numpy as np
from joblib import load
import os

from datetime import datetime, date
import json

from .serializers import AppointmentSerializer, HourSerializer, PlaceSerializer, CampanaSerializer, RegDonacionSerializer, PredictionSerializer, BloodSerializer, UserSerializer
from .models import Appointment, Hour, Place, Campana, RegDonacion, Blood

os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

# Demanda esperada por el centro de sangre
DEMANDA_MENSUAL = np.array([30, 45, 58, 60, 110, 120, 30, 28, 90, 20, 31, 440])

# Custom permissions classes


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class CreateOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'POST'


class PutOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'PUT'


class AppointmentViewSet(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated|CreateOnly]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

# API's


class AppointmentList(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    # permissions_classes = [IsAuthenticated|ReadOnly]

    def get_queryset(self):
        queryset = Appointment.objects.filter(accepted=False, rejected=False)
        return queryset


class HourViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = HourSerializer
    queryset = Hour.objects.all()

    def patch(self, request, *args, **kwargs):

        return self.partial_update(request, *args, **kwargs)


class HourList(generics.ListAPIView):
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        campaign = self.request.query_params.get('campaign', None)
        day = self.request.query_params.get('day', None)
        queryset = Hour.objects.filter(
            available=True).order_by('hour')
        if campaign is not None:
            # Filtro por campañas de las horas
            queryset = queryset.filter(campaign_id=campaign)
        if day is not None:
            # Filtro por día de las horas
            queryset = queryset.filter(day=day, available=True)
        return queryset


class HourUpdate(generics.UpdateAPIView):
    queryset = Hour.objects.all()
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


class HourCreate(generics.CreateAPIView):
    serializer_class = HourSerializer
    # permission_classes = [IsAuthenticated]


class HourbyAppointmentID(generics.ListAPIView):
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def get_queryset(self):
        queryset = Hour.objects.filter(available=False)
        appointmentid = self.request.query_params.get('id', None)
        if appointmentid is not None:
            queryset = queryset.filter(appointment_id=appointmentid)
        return queryset


# Inicio - Unión con código implementado en el sprint 0

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticated | ReadOnly]


class BloodViewSet(viewsets.ModelViewSet):
    queryset = Blood.objects.all()
    serializer_class = BloodSerializer
    permission_classes = [IsAuthenticated | ReadOnly | PutOnly]


class CampanaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer
    permission_classes = [IsAuthenticated | ReadOnly]

    def post(self, request, *args, **kwargs):
        lugar = request.data['lugar']
        dia_inicio = request.data['dia_inicio']
        dia_termino = request.data['dia_termino']
        hora_inicio = request.data['hora_inicio']
        hora_termino = request.data['hora_termino']
        imagen = request.data['imagen']
        Campana.objects.create(lugar=lugar, dia_inicio=dia_inicio, dia_termino=dia_termino,
                               hora_inicio=hora_inicio, hora_termino=hora_termino, imagen=imagen)
        return HttpResponse({'message': 'Campaña creada'}, status=200)


class RegDonacionViewSet(viewsets.ModelViewSet):
    queryset = RegDonacion.objects.all()
    serializer_class = RegDonacionSerializer
    # permission_classes = [IsAuthenticated]


def update_predictions(request):
    def ohe_to_class(y):
        test = list()
        for i in range(len(y)):
            test.append(np.argmax(y[i]))
        return test

    donations = list()
    total_donations = 0
    for place in Place.objects.all():
        code = place.codigo
        print(code)

        # Carga del dataframe
        # filter_time = datetime.now() # Para filtrar desde la fecha actual hacia atras

        # Para filtrar desde antes de Agosto hacia atras
        filter_time = datetime(2019, 7, 31)

        place_queryset = RegDonacion.objects.filter(
            lugar=place)

        if place_queryset.count() < 1:
            print("queryset vacio encontrado")
            continue

        df = pd.DataFrame(list(place_queryset.values()))

        # Transforma el dataframe al esperado para usarse con el modelo

        # Se limpian las columnas que no se usaran del DataFrame. Además, se
        # crean las columnas que se calcularán a partir de otras
        df = df.drop(["id", "apellido1", "apellido2",
                      "sangre", "nombres", "lugar_id"], axis=1)
        df['fecha'] = df['fecha'].apply(pd.to_datetime)
        df["Numero de Donaciones"] = df.groupby(
            'rut')['rut'].transform('count')
        # Transformación necesaria para filtrar datos
        df = df[df["fecha"].dt.date < date(2019, 8, 1)]
        if df.empty:
            print("DataFrame vacio encontrado")
            continue
        df["Primera donacion"] = df.groupby("rut")["fecha"].transform("min")
        df["Ultima donacion"] = df.groupby("rut")["fecha"].transform("max")

        df["Meses ultima donacion"] = (filter_time.year - df["Ultima donacion"].dt.year) * 12 + \
            (filter_time.month - df["Ultima donacion"].dt.month)

        df["Meses primera donacion"] = (filter_time.year - df["Primera donacion"].dt.year) * 12 + \
            (filter_time.month - df["Primera donacion"].dt.month)

        df = df.drop(["fecha"], axis=1)
        df = df.drop_duplicates()
        df = df.drop(["rut", "Primera donacion", "Ultima donacion"], axis=1)
        df["Volumen donado cc"] = df["Numero de Donaciones"] * 450
        df = df[["Meses ultima donacion", "Numero de Donaciones",
                 "Volumen donado cc", "Meses primera donacion"]]

        # Calcula la entrada evaluando con el DataFrame conseguido

        model = keras.models.load_model('../Data/entrada.h5')
        val = df.values

        sc = load('../Data/std_scaler.bin')

        val_std = sc.transform(val)

        new_pred = model.predict(val_std).round()

        don = ohe_to_class(new_pred)

        new_don = []
        for i in range(0, len(don)):
            if don[i] == 1:
                new_don.append(i+2)
        donations.append(len(new_don))
        place.next_month_prediction = len(new_don)
        place.save()
    total_donations = sum(donations)

    return JsonResponse({'n_don': total_donations, 'donations': donations, 'pred': str(DEMANDA_MENSUAL[datetime.now().month-1])})

# Fin - Unión con código implementado en el sprint 0


# Inicio - API para manejo de usuarios

class UserRecordView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny, )

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=ValueError):
            serializer.create(validated_data=request.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

# Fin - API para manejo de usuarios

# Inicio - API para obtención de campañas activas


class ListActiveCampaigns(generics.ListAPIView):
    serializer_class = CampanaSerializer
    permission_classes = (AllowAny, )

    def get_queryset(self):
        queryset = Campana.objects.all()
        return queryset

# Fin - API para obtención de campañas activas

# Vistas para obtener datos desde Firebase


def get_ranking(request):
    db = firestore.client()
    ranking_ref = db.collection(u'ranking')
    ranking_query = ranking_ref.order_by(
        u'points', direction=firestore.Query.DESCENDING)
    ranking_docs = ranking_query.stream()
    response = []
    for ranking_doc in ranking_docs:
        response.append(ranking_doc.to_dict())
    return JsonResponse(response, safe=False)
