from django.contrib import admin
from .models import Appointment, CampaignHour, Hour, Place, Campana, RegDonacion, Prediction, Blood

class CampanaAdmin(admin.ModelAdmin):

    list_display=("lugar", "dia_inicio", "dia_termino")

# Modelos
admin.site.register(Appointment)
admin.site.register(Hour)

# Inicio - Unión con código implementado en el sprint 0

admin.site.register(Place)
admin.site.register(Campana, CampanaAdmin)
admin.site.register(RegDonacion)
admin.site.register(Prediction)
admin.site.register(Blood)
admin.site.register(CampaignHour)

# Fin - Unión con código implementado en el sprint 0