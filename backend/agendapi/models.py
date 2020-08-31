from django.db import models
from django.core.validators import validate_email, RegexValidator

# Create your models here.

def get_rut_digit(rut):
    serie = range(2,8)
    n = len(serie)
    suma = 0

    for i in range(len(rut)-1, -1, -1):
        suma += int(rut[i]) * int(serie[(len(rut)-i-1) % n])

    resto = suma % 11
    
    digit = 11 - resto
    if (digit == 11):
        digit = '0'
    elif (digit == 10):
        digit = 'K'
    

def validate_rut(value):

    #Verificar formato
    if (value.split('-') != 2):
        raise ValidationError(
            _('%(value) no tiene un formato de RUT válido'),
            params={'value' : value},
        )
    rut, digit = value.split('-')
    
    #Verificar rut

    if not(rut.isnumber):
        raise ValidationError(
            _('%(value) no tiene un dígito verificador válido'),
            params={'value' : value},
        )

    #Verificar dígito
    if not((digit.isnumber or (digit.upper() == 'K')) and len(digit) == 1):
        raise ValidationError(
            _('%(value) no tiene un dígito verificador válido'),
            params={'value' : value},
        )
    
    elif (digit.upper() != get_rut_digit(rut)):
        raise ValidationError(
            _('%(value) tiene un dígito verificador incorrecto'),
            params={'value' : value},
        )

validate_letters_and_spaces = RegexValidator(r'^[a-zA-Z ]+$', 'Solo se permite el esuo de letras y espacios')
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Solo se permite el uso de letras.')
    

class Appointment(models.Model):
    name = models.CharField(max_length=60, validators=[validate_letters_and_spaces])
    rut = models.CharField(max_length=60, blank=False, null=False, validators=[validate_rut])
    phone = models.CharField(max_length=9, validators=[])
    email = models.CharField(max_length=60, validators=[validate_email])
    day = models.DateField()
    hour = models.TimeField()

    def __str__(self):
        return ("Nombre: %s, RUT: %s, Día: %s , Lugar: %s" %(self.name, self.rut, self.day, self.hour))
