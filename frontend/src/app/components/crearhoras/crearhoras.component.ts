import { Component, OnInit } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';
import { HttpClient} from '@angular/common/http';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';


@Component({
  selector: 'app-crearhoras',
  templateUrl: './crearhoras.component.html',
  styleUrls: ['./crearhoras.component.css']
})
export class CrearhorasComponent implements OnInit {

  redTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#5E091A',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#880C25',
    },
    clockFace: {
        clockFaceBackgroundColor: '#880C25',
        clockHandColor: '#008BA7',
        clockFaceTimeInactiveColor: '#fff'
    }
  };  


  dia: string;
  hora_inicio: string;
  hora_final: string;

  // Se puede asignar el tiempo que tomen las horas tambien pero habiamos 
  // acordado 30min asi que esta hardcodeado



  constructor(private http: HttpClient, private hours_api: AgHoraService) {
  }
  createHours() {
    var day = new Date(this.dia);
    this.dia = day.toISOString().split("T")[0];
    var horai = Number(this.hora_inicio[0]+this.hora_inicio[1]);
    var mini = Number(this.hora_inicio[3]+this.hora_inicio[4]) + horai * 60;
    var horaf = Number(this.hora_final[0]+this.hora_inicio[1]);
    var minf = Number(this.hora_final[0]+this.hora_inicio[1]) + horaf * 60;
    while (mini <= minf - 30){
      var uploadData = new FormData();
      uploadData.append('day', this.dia);
      uploadData.append('hour', (Math.floor(mini/60)).toString() + ':' + (mini%60).toString());
      this.http.post('http://127.0.0.1:8000/hour/', uploadData).subscribe(
        data => {console.log(data);},
        error => {console.log(error);}
      );
      mini = mini + 30;
    }
  }
  ngOnInit(): void {
  }

}
