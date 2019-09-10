import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import  { GLOBAL } from './global';
import { Publication } from '../models/publication';


@Injectable()

export class PublicationService{
     public url:string;
     
     constructor(private _http:HttpClient){
            this.url = GLOBAL.url;
     }
     
     }   