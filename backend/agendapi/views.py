from django.shortcuts import render, HttpResponse, redirect
from rest_framework import viewsets, permissions, generics
from .serializers import AppointmentSerializer, HourSerializer, PlaceSerializer, CampanaSerializer , RegDonacionSerializer, PredictionSerializer, BloodSerializer
from .models import Appointment, Hour, Place, Campana, RegDonacion, Prediction, Blood
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, BasePermission, SAFE_METHODS
import keras
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from joblib import load
import statsmodels.api
from os import listdir
from os.path import isfile, join

# Custom permissions classes

class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS

class CreateOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method == 'POST'


class AppointmentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated|CreateOnly]
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

# API's
class AppointmentList(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permissions_classes = [IsAuthenticated|ReadOnly]
    def get_queryset(self):
        queryset = Appointment.objects.filter(accepted=False, rejected=False)
        return queryset


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
    
class HourbyAppointmentID(generics.ListAPIView):
    serializer_class = HourSerializer
    permission_classes = [IsAuthenticated|ReadOnly]
    def get_queryset(self):
        queryset = Hour.objects.filter(available=False)
        appointmentid = self.request.query_params.get('id',None)
        if appointmentid is not None:
            queryset = queryset.filter(appointment_id=appointmentid)
        return queryset


# Inicio - Unión con código implementado en el sprint 0

class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    permission_classes = [IsAuthenticated]

class BloodViewSet(viewsets.ModelViewSet):
    queryset = Blood.objects.all()
    serializer_class = BloodSerializer
    permission_classes = [IsAuthenticated]

class CampanaViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Campana.objects.all()
    serializer_class = CampanaSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        lugar = request.data['lugar']
        dia_inicio = request.data['dia_inicio']
        dia_termino = request.data['dia_termino']
        hora_inicio = request.data['hora_inicio']
        hora_termino = request.data['hora_termino']
        imagen = request.data['imagen']
        Campana.objects.create(lugar=lugar, dia_inicio=dia_inicio, dia_termino=dia_termino, hora_inicio=hora_inicio, hora_termino=hora_termino, imagen=imagen)
        return HttpResponse({'message': 'Campaña creada'}, status=200)


class RegDonacionViewSet(viewsets.ModelViewSet):
    queryset = RegDonacion.objects.all()
    serializer_class = RegDonacionSerializer
    permission_classes = [IsAuthenticated]

class PredictionViewSet(viewsets.ModelViewSet):
    queryset = Prediction.objects.all()
    serializer_class = PredictionSerializer
    permission_classes = [IsAuthenticated]

    def ohe_to_class(y):
        test = list()
        for i in range(len(y)):
           test.append(np.argmax(y[i]))
        return test

    def get(self, request, *args, **kwargs):
        
        df = pd.read_csv("../Data/data/blood-test.csv")
        df = df.drop("Unnamed: 0", axis=1)

        model = keras.models.load_model('../Data/entrada.h5')
        val = df.values

        sc = load('../Data/std_scaler.bin')

        val_std = sc.transform(val)

        new_pred = model.predict(val_std).round()   

        don = ohe_to_class(new_pred)
        
        new_don = []
        for i in range(0,len(don)):
            if don[i] == 1:
                new_don.append(i+2)


        model = statsmodels.tsa.statespace.sarimax.SARIMAXResults.load("../Data/demanda.pkl")
        pred = model.predict(start=120, end=122)
        return JsonResponse({'n_don':new_don, 'pred':int(pred[0])})

def predictions(request):

    def ohe_to_class(y):
        test = list()
        for i in range(len(y)):
           test.append(np.argmax(y[i]))
        return test
        
    df = pd.read_csv("../Data/data/blood-test.csv")
    df = df.drop("Unnamed: 0", axis=1)

    model = keras.models.load_model('../Data/entrada.h5')
    val = df.values

    sc = load('../Data/std_scaler.bin')

    val_std = sc.transform(val)

    new_pred = model.predict(val_std).round()   

    don = ohe_to_class(new_pred)
    
    new_don = []
    for i in range(0,len(don)):
        if don[i] == 1:
            new_don.append(i+2)


    model = statsmodels.tsa.statespace.sarimax.SARIMAXResults.load("../Data/demanda.pkl")
    pred = model.predict(start=120, end=122)
    return JsonResponse({'n_don':len(new_don), 'pred':3595})

def update_predictions(request):
    def ohe_to_class(y):
        test = list()
        for i in range(len(y)):
           test.append(np.argmax(y[i]))
        return test

    listdir("../Data/data/id")
    files = [f.split(".")[0] for f in listdir("../Data/data/id")]

    donations = list()
    total_donations = 0
    for _id in files:
        df = pd.read_csv("../Data/data/id/"+_id+".csv")

        
        model = keras.models.load_model('../Data/entrada.h5')
        val = df.values

        sc = load('../Data/std_scaler.bin')

        val_std = sc.transform(val)

        new_pred = model.predict(val_std).round()   

        don = ohe_to_class(new_pred)
        
        new_don = []
        for i in range(0,len(don)):
            if don[i] == 1:
                new_don.append(i+2)
        donations.append(len(new_don))
        p = Place.objects.get(codigo=_id)
        p.next_month_prediction = len(new_don)
        p.save()
    total_donations = sum(donations)

    return JsonResponse({'n_don': total_donations, 'donations': donations, 'pred':3595})


# Fin - Unión con código implementado en el sprint 0