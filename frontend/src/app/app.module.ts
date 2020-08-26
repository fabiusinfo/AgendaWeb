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


  ],
  providers: [AgHoraService],
  bootstrap: [AppComponent]
})
export class AppModule { }
