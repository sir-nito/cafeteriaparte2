import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { HttpModule }  from'@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders} from './app.routing';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component'; 
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductRegisterComponent } from './components/product/product.component';
import { CarShopComponent } from './components/carshop/carshop.component';
//servicios
import { UserService} from './services/user.service';
import { MasterGuardian } from './services/master.guard';
import { UserGuardian } from './services/user.guard';
import { AdminGuardian } from './services/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    CarShopComponent ,
    ProductRegisterComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  providers: [
  appRoutingProviders,
  UserService,
  MasterGuardian,
  UserGuardian,
  AdminGuardian
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
                