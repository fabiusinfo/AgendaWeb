import { RouterModule, Routes } from '@angular/router';
import { AghoraComponent } from './components/aghora/aghora.component';


 const ROUTES: Routes = [
    {path: 'aghora', component: AghoraComponent},
    {path: '', pathMatch: 'full', redirectTo: 'aghora'},
    {path: '**', pathMatch: 'full', redirectTo: 'aghora'}
];
export const ROUTING = RouterModule.forRoot(ROUTES);
