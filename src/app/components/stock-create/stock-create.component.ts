import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common'
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";


@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct = {
    name: "",
    price: "",
    stock: "",
    image: null
  }
  
  baseUrl = environment.baseUrl;
  public imageSrc: any = null;
  node_static_url = environment.backendUrl;
  mIsSubmitted = false;

  constructor(private rest:RestService, private location:Location) { }

  ngOnInit() {
 
  }

  async onAddProduct(){
    let formData = new FormData();
    formData.append("name", this.mProduct.name);
    formData.append('stock', this.mProduct.stock.toString())
    formData.append('price', this.mProduct.price.toString())
    formData.append('image', this.mProduct.image)

    await this.rest.addProduct(formData).toPromise()
    
    Swal.fire({
      title: "Create successfully",
      text: "Click close button to back to the stock page",
      type: "success",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Close"
    }).then(result => {
       this.location.back();
    });

  }


  onUploadImage(event) {
    this.mProduct.image = event.target.files[0];
    
    // Show preview image
    if (this.mProduct.image) {
      const reader = new FileReader();
      reader.onload = e => (this.imageSrc = reader.result);
      reader.readAsDataURL(this.mProduct.image);
    }
  }


  onClickCancel(){
    this.location.back();
  }

}
