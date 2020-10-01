import { Component, OnInit } from '@angular/core';
import { CampanaService } from '../../services/campana.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PlaceService } from 'src/app/services/place.service';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import { UserService } from 'src/app/services/user.service';

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

  success = false;
  fail = false;

  public user: any;

  lugar: string;
  dia_inicio: string;
  dia_termino: string;
  hora_inicio: string;
  hora_termino: string;
  place_name: string;
  imagen: File = null;
  file = false;
  files: File[] = [];

  places = [];

  constructor( private http: HttpClient, private placesApi: PlaceService, public userService: UserService) {
    this.getPlaces();
  }

  getPlaces = () => {
    this.placesApi.getAllPlaces().subscribe(
      data => {
        this.places = data;
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );
  }

  createCampana() {
    const uploadData = new FormData();
    let init_day = new Date(this.dia_inicio);
    this.dia_inicio = init_day.toISOString().split('T')[0];
    let final_day = new Date(this.dia_termino);
    this.dia_termino = final_day.toISOString().split('T')[0];
    uploadData.append('lugar', this.lugar);
    uploadData.append('dia_inicio', this.dia_inicio);
    uploadData.append('dia_termino', this.dia_termino);
    uploadData.append('hora_inicio', this.hora_inicio);
    uploadData.append('hora_termino', this.hora_termino);
    uploadData.append('imagen', this.imagen, this.imagen.name);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'JWT ' + this.userService.token
      })
    };
    this.http.post('http://127.0.0.1:8000/campanas/', uploadData, httpOptions).subscribe(
      data => {console.log(data); this.success = true; },
      error => {console.log(error); this.fail = true; }
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
    this.user = {
      username: '',
      password: ''
    };
  }

  login() {
    this.userService.login({username: this.user.username, password: this.user.password});
  }

  refreshToken() {
    this.userService.refreshToken();
  }

  logout() {
    this.userService.logout();
  }

}
