import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';
import { MasterGuardian } from './services/master.guard';
import { UserGuardian } from './services/user.guard';
import { AdminGuardian } from './services/admin.guard';
//components
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component'; 
import { ProductRegisterComponent } from './components/product/product.component';
import { CarShopComponent } from './components/carshop/carshop.component';
const appRoutes: Routes =[
   {path: '', component: HomeComponent},
   {path: 'home', component: HomeComponent},
   {path: 'login', component:LoginComponent},
   {path: 'registro', component:RegisterComponent},
   {path: 'mis-datos', component: UserEditComponent,canActivate:[UserGuardian]},
   {path: 'register-product/:page', component: UsersComponent,canActivate:[UserGuardian]},
   {path: 'gente', component: UsersComponent,canActivate:[UserGuardian]},
   {path: 'products/:page', component: ProductRegisterComponent,canActivate:[UserGuardian]},
   {path: 'car/:page', component: CarShopComponent,canActivate:[UserGuardian]},
   {path: '**', component:  HomeComponent}
   
];

export const appRoutingProviders: any[] =[];
export const routing:ModuleWithProviders =RouterModule.forRoot(appRoutes);



