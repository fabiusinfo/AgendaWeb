import { RouterModule, Routes } from '@angular/router';
import { AghoraComponent } from './components/aghora/aghora.component';
import { LoginComponent } from './components/login/login.component';
import { CrearhorasComponent } from './components/crearhoras/crearhoras.component';
import { HomeComponent } from './components/home/home.component';
import { CampaignsComponent } from './components/campaigns/campaigns.component';
import { RegdonacionComponent } from './components/regdonacion/regdonacion.component';
import { CollectionComponent } from './components/collection/collection.component';

const ROUTES: Routes = [
    {path: 'agendar', component: AghoraComponent},
    {path: 'admin', component: CrearhorasComponent},
    {path: 'home', component: HomeComponent},
    {path: 'campanas', component: CampaignsComponent},
    {path: 'registrardonacion', component: RegdonacionComponent},
    {path: 'newcampaign', component: CampaignsComponent},
    {path: 'recoleccion', component: CollectionComponent},
    {path: 'login', component: LoginComponent},
    {path: '', pathMatch: 'full', redirectTo: 'agendar'},
    {path: '**', pathMatch: 'full', redirectTo: 'agendar'}

];
export const ROUTING = RouterModule.forRoot(ROUTES);
