import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute,Params } from '@angular/router';
import {Product} from '../../models/product';
import {ProductService }  from '../../services/product.service';
import {GLOBAL } from '../../services/global';
import {UserService } from '../../services/user.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import * as $ from 'jquery';
import { FollowService } from '../../services/follow.service';
import { Follow } from '../../models/follow';

@Component({
     selector:'product',
     templateUrl: './product.component.html',
     providers:[ProductService,UserService,FollowService]     
})


export class ProductRegisterComponent implements OnInit{
  
    public title:string;
    public identity;
    public product:Product;
    public token;
    public url:string;
    public status:string;
    public page;
    public total;
    public pages;
    public follows;
    public itemsPerPage;
    public products:Product[];
    public showImage;
   constructor(
   private _route:ActivatedRoute,
   private _router:Router,
   private _userService: UserService,
   private _followService: FollowService,
   private _productService:ProductService,
   private _http: HttpClient
){
  this.title = 'PRODUCTOS';
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.url = GLOBAL.url;
  this.page=1;
}



    ngOnInit(){
    console.log('componente registrado....');
    this.getProducts(this.page);
    }
    
    getProducts(page, adding= false){
    this._productService.getProduct(this.token,page).subscribe(
    response =>{
        console.log(response);
        if(response.products){
        this.total = response.total_items;
        this.pages = response.pages;
        this.itemsPerPage = response.items_per_page;
        if(!adding){
        
        this.products = response.products;
        }else{
        var arrayA = this.products;
        var arrayB = response.products;
        this.products =arrayA.concat(arrayB);
        $("html,body").animate({ scrollTop: $('html').prop("scrollHeight")},2400);
        }
        
        
        if(page >this.pages){
       // this._router.navigate(['/home']);
        }
        }else{
        this.status='error';
        }
    },error =>{
    var errorMessage= <any>error;
                    console.log(errorMessage);
                    
                    if(errorMessage != null){
                       this.status ='error';
                    }
    
    }
    );
    }
    public ngMore=false;
    viewMore(){
       this.page += 1;   
    
       if(this.page == this.pages){
                  this.ngMore=true;       
       }
       this.getProducts(this.page,true);
    }
    refresh(event = null){
     this.getProducts(1);
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