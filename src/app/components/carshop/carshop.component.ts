import { Component ,OnInit} from '@angular/core';
import { Router , ActivatedRoute, Params} from '@angular/router';
import { User} from '../../models/user';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';
import { Product} from '../../models/product';
import { ProductService }  from '../../services/product.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { Follow } from '../../models/follow';
import * as $ from 'jquery';

@Component({
      selector :'carshop',
      templateUrl : './carshop.component.html',
      providers : [ProductService,UserService,FollowService]
})

export class CarShopComponent implements OnInit{
    public title :string;
    public identity;
    public url:string;
    public token;
    public page;
    public next_page;
    public prev_page;
    public total;
    public pages;
    public follows;
    public users:User[];
    public status:string;
    public product:Product;     
    public itemsPerPage;
    public products:Product[];
    public showImage;
      public ngMore=false;
    
      constructor(
         private _route: ActivatedRoute,
         private _router:Router,
         private _userService: UserService,
         private _followService: FollowService,
         private _productService:ProductService,
         private _http: HttpClient
         
      ){
         this.title = 'Carrito de compras';
         this.identity = this._userService.getIdentity();
         this.token = this._userService.getToken();
         this.url = GLOBAL.url; 
         this.page=1;
      }
      
      ngOnInit(){
          console.log('carrito ha sido cargado')
         this.getCarProducts(this.page);
      }
      
     
      
      getCarProducts(page, adding = false){
    this._followService.getFollowing(this.token,this.identity._id,page).subscribe(
    response =>{
       
        if(response.follows){
        console.log(response.follows);
        this.total = response.total;
        this.pages = response.pages;
        
        if(!adding){
        
        this.follows = response.follows;
        console.log(this.follows);
        }else{
        var arrayA = this.follows;
        var arrayB = response.follows;
        this.follows =arrayA.concat(arrayB);
        $("html,body").animate({ scrollTop: $('html').prop("scrollHeight")},2400);
        }
        }
    },error => {
    var errorMessage = <any>error;
                    console.log(errorMessage);
                    
                    if(errorMessage != null){
                       this.status ='error';
                    }
    
    }
    );
    }
    
  
    viewMore(){
       this.page += 1;   
    
       if(this.page == this.pages){
                  this.ngMore=true;       
       }
       this.getCarProducts(this.page,true);
    }
    refresh(event = null){
    // this.getProducts(1);
    }
    refresh2(event = null){
     this.getCarProducts(1);
    }
    showThisImage(id){
         this.showImage = id;
    }
    hideThisImage(id){
         this.showImage = 0;
    }
    deleteProduct(id){
    this._productService.deleteProduct(this.token,id).subscribe(
       response => {
          this.refresh();
       },
       error =>{
        console.log(<any>error);
       }
    );
    
    }
      
      
      
      
      addCarShop(followed){
      var follow = new Follow ('',this.identity._id,followed);
        this._followService.addFollow(this.token,follow).subscribe(
       response => {
          if(!response.follow){
          this.status='error';
          
          }else{
          this.status='success';
          
          }
       },
       error =>{
         var errorMessage= <any>error;
                    console.log(errorMessage);
                    
                    if(errorMessage != null){
                       this.status ='error';
       }
       }
    );
      
      }
       deleteCarShop(followed){
      this._followService.deleteFollow(this.token,followed).subscribe(
       response => {
           
           var search = this.follows.indexOf(followed);
            if(search != -1){
                 this.follows.splice(search,1);
            }
          this.refresh2();
       },
       error =>{
         var errorMessage= <any>error;
                    console.log(errorMessage);
                    
                    if(errorMessage != null){
                       this.status ='error';
       }
       }
    );
      
      }
      
      
      }
      
      
      
      
      