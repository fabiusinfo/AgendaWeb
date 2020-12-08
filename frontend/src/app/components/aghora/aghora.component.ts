import { Component } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient} from '@angular/common/http';
import { FormControl, FormGroupDirective, NgForm, Validators, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { RutValidator } from 'ng9-rut';
import { MatDialog } from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';
import { CampanaService } from 'src/app/services/campana.service';
import { CampaignHoursService } from 'src/app/services/campaignhours/campaignhours.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {


  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-aghora',
  templateUrl: './aghora.component.html',
  styleUrls: ['./aghora.component.css']
})
export class AghoraComponent  {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^([ \u00c0-\u01ffa-zA-Z\'\-])+$'),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+'),
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{9}$'),
  ]);

  rutFormControl = new FormControl('', [
    Validators.required,
    new RutValidator() as unknown as ValidatorFn,
  ]);

  matcher = new MyErrorStateMatcher();

  minDate: Date;
  maxDate: Date;
  name: string;
  rut: string;
  phone: string;
  email: string;
  day: Date;

  selectedHour: any;

  flaggood = false; // banderas para saber cuando mostrar el mensaje
  flagbad = false;
  durationInSeconds = 5;


  validDates = {};
  campaignHours = [];
  campaignDayHours = [];

  campaign: { id: number, lugar: number, dia_inicio: string, dia_termino: string,
    hora_inicio: string, hora_termino: string, imagen: string, place_address: string, place_name: string; };
  campaigns = [];

  constructor(private http: HttpClient,
              private campanasApi: CampanaService, private campaignHoursApi: CampaignHoursService,
              public dialog: MatDialog, private snackBar: MatSnackBar) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear, currentMonth, 1);
    this.maxDate = new Date(currentYear, currentMonth + 1, 31);
    this.getCampaigns();

  }

  dateFilter = (d: Date): boolean => {
    return this.validDates[d.toISOString().split('T')[0]];
  }

  createAppointment() {
    // TODO: Mejorar este aviso de confirmación
    if (confirm(`¿Estas seguro de agendar la hora?\n
    Resumen
          Lugar: ${this.campaign.place_name}
          Nombre: ${this.nameFormControl.value}
          Rut: ${this.rutFormControl.value}
          Teléfono: ${this.phoneFormControl.value}
          Correo: ${this.emailFormControl.value}
          Dia: ${this.day.toISOString().split('T')[0]}
          Hora: ${this.selectedHour.hour.toString()}`)) {
      console.log(this.selectedHour);
      if (this.rutFormControl.valid && this.nameFormControl.valid && this.emailFormControl.valid
        && this.phoneFormControl.valid && this.day !== undefined && this.selectedHour !== undefined && this.campaign !== undefined) {
          const uploadData = new FormData();
          this.rutFormControl.setValue(this.rutFormControl.value.replace(/\D/g, ''));
          this.rutFormControl.setValue([this.rutFormControl.value.slice(0, -1), '-', this.rutFormControl.value.slice(-1)].join(''));
          uploadData.append('name', this.nameFormControl.value);
          uploadData.append('rut', this.rutFormControl.value);
          uploadData.append('phone', this.phoneFormControl.value);
          uploadData.append('email', this.emailFormControl.value);
          uploadData.append('hour_id', this.selectedHour.id.toString());
          this.http.post('http://127.0.0.1:8000/appointment/', uploadData).subscribe(
          data => {console.log(data); this.resetForm(); },
          error => {console.log(error); }
        );
          this.flaggood = true;
          this.snackBar.open('Tu hora se agendo satisfactoriamente', '', {
          duration: 5000,
        });
          setTimeout(() => {
          this.flaggood = false;
        }, 5000);
      } else {
        this.flagbad = true;
        this.snackBar.open('No se pudo agendar la hora, corrobora que tus datos estén bien', '', {
          duration:  5000,
        });
        setTimeout(() => {
          this.flagbad = false;
        }, 5000);
      }
    }
  }

  // Funciones para obtener horas de una campaña
  getSelectedCampaignHours() {
    this.campaignHoursApi.getAllCampaignHours(this.campaign.id.toString()).subscribe(
      data => {
        this.resetRequestedData();
        this.campaignHours = data;
        this.filterSelectedCampaignDays();
      }
    );
  }

  getCampaigns = () => {
    this.campanasApi.getAllCampanas().subscribe(
      (data: any[]) => {
        this.campaigns = data;
        console.log(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  // Filtra los días de campañas que tienen horas disponibles
  filterSelectedCampaignDays() {
    this.validDates = {};
    this.campaignHours.forEach((campaignHour) => {
      this.validDates[campaignHour.day] = true;
    });
  }

  // Pasa la fecha seleccionada a string para que sea comparada correctamente
  getDayString(fullDate: Date) {
    const year = fullDate.getFullYear().toString();
    const month = (fullDate.getMonth() + 1).toString();
    const date = fullDate.getDate().toString();
    return year + '-' + month + '-' + date;
  }

  // Filtra las horas disponibles en el día seleccionado
  filterDayAvailableHours() {
    this.selectedHour = null;
    this.campaignDayHours = this.campaignHours.filter(campaignHour => campaignHour.day === this.getDayString(this.day));
  }

  // Reinicia los datos obtenidos a través de requests a la base de datos
  resetRequestedData() {
    this.selectedHour = null;
    this.day = null;
    this.validDates = {};
    this.campaignHours = [];
    this.campaignDayHours = [];
  }

  resetForm() {
    this.campaign = null;
    this.nameFormControl.reset();
    this.emailFormControl.reset();
    this.rutFormControl.reset();
    this.phoneFormControl.reset();
    this.resetRequestedData();
  }

}
