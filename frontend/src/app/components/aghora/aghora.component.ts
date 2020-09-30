import { Component, OnInit,Inject, Input } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient} from '@angular/common/http';
import {FormControl, FormGroupDirective, FormBuilder, NgForm, Validators, ValidatorFn} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { RutValidator, validateRutFactory } from 'ng9-rut';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {MatDialog, MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';

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
    Validators.pattern("^([ \u00c0-\u01ffa-zA-Z\'\-])+$"),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+"),
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^[0-9]{9}$"),
  ]);

  rutFormControl = new FormControl('', [
    Validators.required,
    <ValidatorFn> <unknown> new RutValidator,
  ]);



  matcher = new MyErrorStateMatcher();

  minDate: Date;
  maxDate: Date;
  name:string;
  rut:string;
  phone:string;
  email:string;
  day:Date;
  selected_hour_id:string;
  time:string;

  flaggood:boolean=false; //banderas para saber cuando mostrar el mensaje
  flagbad:boolean=false;
  durationInSeconds = 5;
  constructor(private _snackBar: MatSnackBar, private http: HttpClient, private hours_api: AgHoraService, fb: FormBuilder, rutValidator: RutValidator,
    public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear, currentMonth, 1);
    this.maxDate = new Date(currentYear, currentMonth+1, 31);
    this.getDays();

  }


  validDates = {};
  hours = [];

  getDays = () =>{
    this.hours_api.getAllDays().subscribe(
      data=>{
        console.log(data);
        data.forEach(element => {
          this.validDates[element.day] = true;
        });
        console.log(this.validDates);
      },
      error=>{
        console.log(error);
      }
    )
  }

  getHours = () => {
    console.log("asdf")
    this.hours_api.getAllHours(this.day.toISOString().split('T')[0]).subscribe(
      data=>{
        console.log(data);
        this.hours = data;
      }
    )
  }

  printHour = () => {
    console.log(this.selected_hour_id);
  }

  myFilter = (d: Date): boolean => {
    // Using a JS Object as a lookup table of valid dates
    // Undefined will be falsy.
    return this.validDates[d.toISOString().split('T')[0]];
  }


  createAppointment() {
    if (confirm(`¿Estas seguro de agendar la hora?\n
                        Resumen
          Nombre: ${this.nameFormControl.value}
          Rut: ${this.rutFormControl.value}
          Teléfono: ${this.phoneFormControl.value}
          Correo: ${this.emailFormControl.value}
          Dia: ${this.day.toISOString().split("T")[0]}
          Hora: ${this.time}`)) {

    if (this.rutFormControl.valid && this.nameFormControl.valid && this.emailFormControl.valid && this.phoneFormControl.valid && this.day != undefined && this.time != undefined){
      const uploadData = new FormData();
      this.rutFormControl.setValue(this.rutFormControl.value.replace(/\D/g, ""))
      this.rutFormControl.setValue([this.rutFormControl.value.slice(0, -1), '-', this.rutFormControl.value.slice(-1)].join(""))
      uploadData.append('name', this.nameFormControl.value);
      uploadData.append('rut', this.rutFormControl.value);
      uploadData.append('phone', this.phoneFormControl.value);
      uploadData.append('email', this.emailFormControl.value);
      uploadData.append('day', this.day.toISOString().split("T")[0]);
      uploadData.append('hour', this.time);
      this.http.post('http://127.0.0.1:8000/appointment/', uploadData).subscribe(
        data => {console.log(data)},
        error => {console.log(error)}
      );
      this.flaggood=true;
      this._snackBar.open('Tu hora se agendo satisfactoriamente','', {
        duration: 5000,
      });
      setTimeout(()=>{
        this.flaggood=false;
      },5000);
    }
    
    else {
      this.flagbad=true;
      this._snackBar.open('No se pudo agendar la hora, corrobora que tus datos estén bien','', {
        duration:  5000,
      });
      setTimeout(()=>{
        this.flagbad=false;
      },5000);
    }
  } 
    
  }

 





 



}


  

 

