from django.db import models

# Create your models here.

class AgHora(models.Model):
    rut = models.CharField(max_length=60) ## ???
    nombres = models.CharField(max_length=60)
    apellido1 = models.CharField(max_length=60)
    apellido2 = models.CharField(max_length=60)