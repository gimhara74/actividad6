import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FrmComponent } from './components/frm/frm.component';
import { DataUserComponent } from './components/data-user/data-user.component';
import { CardUserComponent } from './components/card-user/card-user.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: HomeComponent},
    {path: 'frm', component: FrmComponent},
    {path: 'carduser', component: CardUserComponent},
    {path: 'carduser/:id', component: DataUserComponent},
    {path: 'datauser', component: DataUserComponent},
    {path: '**', redirectTo: 'home'}


];
