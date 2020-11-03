"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path

from django.urls import path, include
from rest_framework import routers
from agendapi import views
from django.conf.urls import url, include
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token

router = routers.DefaultRouter()
router.register(r'appointment', views.AppointmentViewSet)
router.register(r'campanas', views.CampanaViewSet)   
router.register(r'regdonacion',views.RegDonacionViewSet)
router.register(r'places', views.PlaceViewSet)
router.register(r'blood', views.BloodViewSet)
router.register(r'hr', views.HourViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('hour', views.HourList.as_view()),
    path('new_hour', views.HourCreate.as_view()),
    path('confirm_appointments', views.AppointmentList.as_view()),
    path('appointments', views.AppointmentList.as_view()),
    path('hour1', views.HourbyAppointmentID.as_view()),
    path('eval_model', views.update_predictions, name="update_predictions"),
    path('predictions', views.predictions, name='predictions'),
    path("r'^(?P<id>\d+)/$", views.HourUpdate.as_view()),
    path('user/', views.UserCreate.as_view(), name='users'),
    path('api/active_campaigns', views.ListActiveCampaigns.as_view(), name='list_active_campaigns'),

    path(r'api-token-auth/', obtain_jwt_token),
    path(r'api-token-refresh/', refresh_jwt_token),
]
