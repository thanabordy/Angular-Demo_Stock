import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

@Component({
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})
export class StockEditComponent implements OnInit {

  mProduct = {
    id: "", 
    name: "",
    price: 0,
    stock: 0,
    image: null
  }

  public imageSrc: any = null;
  baseUrl = environment.baseUrl;
  node_static_url = environment.backendUrl;
  mDataArray: any[];

  constructor(private route: ActivatedRoute, private rest: RestService, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(async params => {
      let id = params["id"]
      this.mProduct = await this.rest.getProductById(id).toPromise();
    })
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

  async onEditProduct() {
    let formData = new FormData();
    formData.append("id", this.mProduct.id);
    formData.append("name", this.mProduct.name);
    formData.append('stock', this.mProduct.stock.toString());
    formData.append('price', this.mProduct.price.toString());
    formData.append('image', this.mProduct.image);


    await this.rest.updateProduct(formData).toPromise();
    // alert("Success");

    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: 'Edit Success',
      showConfirmButton: false,
      timer: 1200 //1.2sec
    }).then(result => {
      this.location.back();
    });
  }

  onClickCancel() {
    this.location.back();
  }

}
