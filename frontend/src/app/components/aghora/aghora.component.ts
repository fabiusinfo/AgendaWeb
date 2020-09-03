import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aghora',
  templateUrl: './aghora.component.html',
  styleUrls: ['./aghora.component.css']
})
export class AghoraComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
  name:string;
  rut:string;
  phone:string;
  email:string;
  day:string;
  hour:string;
  constructor() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    this.minDate = new Date(currentYear, currentMonth, 1);
    this.maxDate = new Date(currentYear, currentMonth+1, 31);
   }


  validDates = {
    "2020-09-02T04:00:00.000Z": true
  }

  myFilter = (d: Date): boolean => {
    // Using a JS Object as a lookup table of valid dates
    // Undefined will be falsy.
    return this.validDates[d.toISOString()];
  }

  ngOnInit(): void {
  }

}
