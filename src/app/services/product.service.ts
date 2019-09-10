import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import  { GLOBAL } from './global';
import { Product } from '../models/product';


@Injectable()

export class ProductService{
     public url:string;
     
     
  
     constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
     }
     
     addProduct(token ,product):Observable<any>{
    let params = JSON.stringify(product);
    let headers = new HttpHeaders().set('Content-Type','application/json')
                                   .set('Authorization',token);
                                   
    return this._http.post(this.url+'save-product',params,{headers:headers});
    
  }
  
  getProduct(token,page=1):Observable<any>{
  
  let headers = new HttpHeaders().set('Content-Type','application/json')
                                 .set('Authorization',token);
        
        return this._http.get(this.url+'products/'+page,{headers:headers});
  }
  
  deleteProduct(token,id):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','applicaton/json')
                                   .set('Authorization',token);
                                   
        return this._http.delete(this.url+'product/'+id,{headers:headers});
  
  }
     }