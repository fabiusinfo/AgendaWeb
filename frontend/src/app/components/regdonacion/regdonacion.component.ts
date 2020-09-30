import { Component, OnInit } from '@angular/core';
import { RegDonacionService } from 'src/app/services/reg-donacion.service';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-regdonacion',
  templateUrl: './regdonacion.component.html',
  styleUrls: ['./regdonacion.component.css'],
  providers: [RegDonacionService]
})
export class RegdonacionComponent implements OnInit {
  donaciones = [{rut: 'waaah'}]

  success:boolean=false;
  fail:boolean=false;

  newDonation;
  lugar:string;
  fecha:string;
  rut:string;
  nombres:string;
  apellido1:string;
  apellido2:string;
  sangre:string;

  places = [];

  constructor(private api: RegDonacionService, private places_api: PlaceService) {
    this.getDonaciones();  // placeholder por ahora
    this.newDonation={lugar:'',fecha:'',rut:'',nombres:'',apellido1:'',apellido2:'', sangre:''};
    this.getPlaces();
  }
  getDonaciones = () => {
    this.api.getAllDonaciones().subscribe(
      data => {
        this.donaciones = data;
      },
      error =>{
        console.log(error);
      }
    )
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


  createDonation = () => {
    var init_day = new Date(this.fecha);
    this.newDonation.fecha = init_day.toISOString().split("T")[0];
    this.newDonation.lugar = this.lugar;
    this.newDonation.rut = this.rut;
    this.newDonation.nombres = this.nombres;
    this.newDonation.apellido1 = this.apellido1;
    this.newDonation.apellido2 = this.apellido2;
    this.newDonation.sangre = this.sangre;

    this.api.createDonation(this.newDonation).subscribe(
      data => {
        console.log(data);
        this.success=true;

      },
      error =>{
        console.log(error);
        this.fail=true;

      }
    )



  }

  ngOnInit(): void {
  }

}
