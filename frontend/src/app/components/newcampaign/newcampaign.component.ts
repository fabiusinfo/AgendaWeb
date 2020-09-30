import { Component, OnInit } from '@angular/core';
import { CampanaService } from '../../services/campana.service';
import { HttpClient} from '@angular/common/http';
import { PlaceService } from 'src/app/services/place.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';

@Component({
  selector: 'app-newcampaign',
  templateUrl: './newcampaign.component.html',
  styleUrls: ['./newcampaign.component.css']
})
export class NewcampaignComponent implements OnInit {

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

  success:boolean=false;
  fail:boolean=false;
  

  lugar : string;
  dia_inicio : string;
  dia_termino : string;
  hora_inicio : string;
  hora_termino : string;
  place_name: string;
  imagen : File = null;
  file? : boolean = false;
  files: File[] = [];

  places = []

  constructor( private http: HttpClient, private places_api: PlaceService ) {
    this.getPlaces();
  }

  getPlaces = () =>{
    this.places_api.getAllPlaces().subscribe(
      data=>{
        this.places=data;
        console.log(data);
      },
      error=>{
        console.log(error);
      }
    )
  }

  createCampana() {
    const uploadData = new FormData();
    var init_day = new Date(this.dia_inicio);
    this.dia_inicio = init_day.toISOString().split("T")[0];
    var final_day = new Date(this.dia_termino);
    this.dia_termino = final_day.toISOString().split("T")[0];
    uploadData.append('lugar', this.lugar);
    uploadData.append('dia_inicio', this.dia_inicio);
    uploadData.append('dia_termino', this.dia_termino);
    uploadData.append('hora_inicio', this.hora_inicio);
    uploadData.append('hora_termino', this.hora_termino);
    uploadData.append('imagen', this.imagen, this.imagen.name);
    this.http.post('http://127.0.0.1:8000/campanas/', uploadData).subscribe(
      data => {console.log(data); this.success=true},
      error => {console.log(error); this.fail=true}
    );

  }

  onImageChanged = (event: any) => {
    console.log(event);
    this.imagen = event.addedFiles[0];
  }

  onSelect(event) {
    console.log(event);
    this.imagen = event.target.files[0];
  }

  onRemove(event) {
    console.log(event);
    this.imagen = null;
  }

  ngOnInit(): void {
  }

}
