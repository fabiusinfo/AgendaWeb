import { Component } from '@angular/core';
import { AgHoraService } from './services/aghora.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AgHoraService]
})
export class AppComponent {
  title = 'frontend';

  constructor(private aghora:AgHoraService){
  }
}
