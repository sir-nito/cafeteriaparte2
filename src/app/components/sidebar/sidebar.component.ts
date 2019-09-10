import { Component,OnInit,EventEmitter,Input,Output } from "@angular/core";
import { UserService} from '../../services/user.service';
import { GLOBAL} from '../../services/global';
import { Product} from '../../models/product';
import { ProductService }  from '../../services/product.service';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs/Observable';
import { UploadService } from '../../services/upload.service';
import { Router , ActivatedRoute, Params} from '@angular/router';
@Component({
    selector:'sidebar',
    templateUrl:'./sidebar.component.html',
    providers: [UserService , ProductService,UploadService] 

})

export class SidebarComponent implements OnInit{
   public identity;
   public token;
   public stats;
   public url;
   public status;
   public product:Product;
//@Output() sended = EventEmitter();


constructor(
private _uploadService:UploadService,
   private _userService: UserService,
    private _productService:ProductService,
    private _http: HttpClient,
     private _route: ActivatedRoute,
         private _router:Router
){
  
  this.identity = this._userService.getIdentity();
  this.token = this._userService.getToken();
  this.stats = this._userService.getStats();
  this.url = GLOBAL.url;
  this.product = new Product("","","","","");
}
  ngOnInit(){
  console.log('producto');
  }
  onSubmit(form,$event){
  this._productService.addProduct(this.token,this.product).subscribe(response => {
  
  if(response.product){
      // this.product = response.product;
       if(this.filesToUpload && this.filesToUpload.length){
       this._uploadService.makeFileRequest(this.url+'upload-image-pro/'+response.product._id,[],this.filesToUpload,this.token,'image')
                    .then((result:any)=>{
                        this.product.file = result.image;
                        form.reset();
                       this.status = 'success';
                       this._router.navigate(['/register-product/']);
                       this.sended.emit({send:'true'});
                    });
                    }else{
                    this.status ='success';
                    form.reset();
                    this._router.navigate([/register-product/]);
                    this.sended.emit({send:'true'});
                    }
     }else{
          this.status ='error';
       }
  
  },
  error =>{
  var errorMessage = <any>error;
  console.log(errorMessage);
  if(errorMessage != null){
  this.status = 'error';
  }
  }
  );
  }
  
  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput:any){
      this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  @Output() sended= new EventEmitter();
      sendProduct(event){
          this.sended.emit({send:'true'})
      }
}
