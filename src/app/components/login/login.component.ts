import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User } from '../../models/user';
import {UserService } from '../../services/user.service';


@Component({
     selector:'login',
     templateUrl: './login.component.html',
     providers:[UserService]
})


export class LoginComponent implements OnInit{
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    
    
    constructor(
       private _route:ActivatedRoute,
       private _router: Router,
       private _userService:UserService
    ){
       this.title ='Identificate';
       this.user = new User("",
         "",
         "",
         "",
         "",
         "",
         "ROLE_USER",
         "");
    }
    ngOnInit(){
    console.log('componente cargado....');
    }
    onSubmit(){
       //loguar a los usuarios y conseguir solo el pase de entrada
       this._userService.singup(this.user).subscribe(
       response =>{
           this.identity=response.user;
           if(!this.identity || !this.identity._id){
           this.status='error';
           }else{
           
           //////////////7
           localStorage.setItem('identity',JSON.stringify(this.identity));
           //coseguir el token
           this.getToken();
           }
       },
       error =>{
          var errorMessage= <any>error;
          if(errorMessage != null){
             this.status ='error';
          }
       }
    
    );
    }
    
    getToken(){
     this._userService.singup(this.user,'true').subscribe(
       response =>{
           this.token=response.token;
           if(this.token.length <= 0){
           this.status='error';
           }else{
          
           //////////////////////////
           localStorage.setItem('token',this.token);
           //coseguir el token
           
           this.getCounters();
           }
       },
       error =>{
          var errorMessage= <any>error;
          if(errorMessage != null){
             this.status ='error';
          }
       }
    
    );
    }
    getCounters(){
       this._userService.getCounters().subscribe(
           response =>{
             localStorage.setItem('stats',JSON.stringify(response));
             this.status ='success;'
             this._router.navigate(['/']);
           },
           error =>{
              console.log(<any>error)
           }
       )
    }
}