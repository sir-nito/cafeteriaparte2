import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params } from '@angular/router';
import {User} from '../../models/user';
import { UserService }  from '../../services/user.service';

@Component({
     selector:'register',
     templateUrl: './register.component.html',
     providers:[UserService]     
})


export class RegisterComponent implements OnInit{
    public title:string;
    public user:User;
    public status:String;
    
    constructor(
        private _route:ActivatedRoute,
        private _router: Router,
        private _userService:UserService
    ){
       this.title ='REGISTRO';
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
    console.log('componente registrado....');
    }
    onSubmit(form){
    console.log(this.user);
    this._userService.register(this.user).subscribe(
        response =>{
           if(response.user && response.user._id){
              //console.log(response.user);
              
              this.status='success';
              form.reset();
           }else{
               this.status='error';
           }
           
        },
        error => {
         console.log(<any>error);
        }
        
    );
    }
}