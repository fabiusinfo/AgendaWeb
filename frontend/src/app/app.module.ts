import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { AgHoraService } from './services/aghora.service';
import { AghoraComponent } from './components/aghora/aghora.component';
import {RouterModule} from '@angular/router';
import { ROUTING } from './app.routes';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
  declarations: [
    AppComponent,
    AghoraComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ROUTING,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSelectModule,
    NgxMaterialTimepickerModule,


  ],
  providers: [AgHoraService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
