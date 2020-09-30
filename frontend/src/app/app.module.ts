// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTING } from './app.routes';

// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Ng9RutModule } from 'ng9-rut';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CollectionComponent } from './components/collection/collection.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AghoraComponent } from './components/aghora/aghora.component';
import { CrearhorasComponent } from './components/crearhoras/crearhoras.component';
import { SnackbarComponent } from './components/aghora/snackbar/snackbar.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { RegdonacionComponent } from './components/regdonacion/regdonacion.component';
import { NewcampaignComponent } from './components/newcampaign/newcampaign.component';
import { CampaignsDialogComponent } from './components/campaigns-dialog/campaigns-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { ConfirmarhorasComponent } from './components/confirmarhoras/confirmarhoras.component';


// Servicios
import { AgHoraService } from './services/aghora.service';
import { UserService } from './services/user.service';
import { CampanaService } from './services/campana.service';





@NgModule({
  declarations: [
    AppComponent,
    AghoraComponent,
    LoginComponent,
    SnackbarComponent,
    CrearhorasComponent,
    HomeComponent,
    AghoraComponent,
    LoginComponent,
    CrearhorasComponent,
    CampaignsComponent,
    CampaignsDialogComponent,
    RegdonacionComponent,
    NewcampaignComponent,
    CollectionComponent,
    MainNavComponent,
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
    MatSnackBarModule,
    NgxDropzoneModule,
    LayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [
    AgHoraService,
    UserService,
    CampanaService,
    MatDatepickerModule,
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
