import { RouterModule, Routes } from '@angular/router';
import { AghoraComponent } from './components/aghora/aghora.component';
import { LoginComponent } from './components/login/login.component';
import { CrearhorasComponent } from './components/crearhoras/crearhoras.component';

 const ROUTES: Routes = [
    {path: 'agendar', component: AghoraComponent},
    {path: 'admin', component: CrearhorasComponent},
    {path: '', pathMatch: 'full', redirectTo: 'agendar'},
    {path: 'login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'agendar'}
    
];
export const ROUTING = RouterModule.forRoot(ROUTES);
