import { Component, OnInit } from '@angular/core';
import { AgHoraService } from 'src/app/services/aghora.service';

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
  day:Date;
  selected_hour_id:string;
  time:string;
  constructor(private hours_api: AgHoraService ) {
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

  ngOnInit(): void {
  }

}
