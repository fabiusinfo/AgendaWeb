from django.db import models, transaction
from django.core.validators import validate_email, RegexValidator, ValidationError, _

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
    return digit
    

def validate_rut(value):

    #Verificar formato
    if (len(value.split('-')) != 2):
        raise ValidationError(
            _('%(value) no tiene un formato de RUT válido'),
            params={'value' : value},
        )
     
    #Verificar rut
    rut, digit = value.split('-')
    if not(rut.isdigit()):
        raise ValidationError(
            _('%(value) no tiene un dígito verificador válido'),
            params={'value' : value},
        )

    #Verificar dígito
    elif not((digit.isdigit() or (digit.upper() == 'K')) and len(digit) == 1):
        raise ValidationError(
            _('%(value) no tiene un dígito verificador válido'),
            params={'value' : value},
        )
    
    elif (digit.upper() != str(get_rut_digit(rut))):
        raise ValidationError(
            _('%(value) tiene un dígito verificador incorrecto'),
            params={'value' : value},
        )

validate_name_characters = RegexValidator(r'^([ \u00c0-\u01ffa-zA-Z\'\-])+$')
alphanumeric = RegexValidator(r'^[0-9a-zA-Z]*$', 'Solo se permite el uso de letras.')
    

class Appointment(models.Model):
    name = models.CharField(max_length=60, validators=[validate_name_characters])
    rut = models.CharField(max_length=60, blank=False, null=False, validators=[validate_rut])
    phone = models.CharField(max_length=9, validators=[])
    email = models.CharField(max_length=60, validators=[validate_email])
    rejected = models.BooleanField(default=False)
    accepted = models.BooleanField(default=False)

    def __str__(self):
        return ("Nombre: %s, RUT: %s" %(self.name, self.rut))

class Hour(models.Model):
    day = models.DateField(editable=False)
    hour = models.TimeField(editable=False)
    available = models.BooleanField(default=True)
    appointment_id = models.OneToOneField(Appointment, on_delete=models.PROTECT, blank=True, null=True)

    def __str__(self):
        if self.appointment_id == None:
            return ("Día: %s, Hora: %s, Disponible: %s" %(self.day, self.hour, self.available))
        else:
            if self.appointment_id.rejected:
                status='Rechazada'
            elif self.appointment_id.accepted:
                status='Aceptada'
            else:
                status='Pendiente'
            return ("Día: %s, Hora: %s, Disponible: %s, Nombre: %s, Email: %s, Estado: %s" %(self.day, self.hour, self.available, self.appointment_id.name, self.appointment_id.email, status))