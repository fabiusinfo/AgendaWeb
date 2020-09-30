import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import { Ng9RutModule } from 'ng9-rut';
import {MatDialogModule} from '@angular/material/dialog';

import { UserService } from './services/user.service';
import { LoginComponent } from './components/login/login.component';
import { CrearhorasComponent } from './components/crearhoras/crearhoras.component';
import { ConfirmarhorasComponent } from './components/confirmarhoras/confirmarhoras.component';


@NgModule({
  declarations: [
    AppComponent,
    AghoraComponent,
    LoginComponent,
    CrearhorasComponent,
    ConfirmarhorasComponent,
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
    ReactiveFormsModule,
    Ng9RutModule,
    MatDialogModule,

  ],
  providers: [
    AgHoraService,
    UserService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
