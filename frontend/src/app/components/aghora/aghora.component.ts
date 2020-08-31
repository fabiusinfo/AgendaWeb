import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aghora',
  templateUrl: './aghora.component.html',
  styleUrls: ['./aghora.component.css']
})
export class AghoraComponent implements OnInit {

  nombre:string;
  rut:string;
  telefono:string;
  correo:string;
  constructor() { }

  ngOnInit(): void {
  }

}
