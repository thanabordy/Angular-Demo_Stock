import { Router } from '@angular/router';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  mDataArray: any[] = [];
  baseUrl = environment.baseUrl;
  node_static_url = environment.backendUrl;
  searchTerm = new Subject<string>()
  sumstock = 0;

  constructor(private rest: RestService, private router: Router) { }

  async ngOnInit() {
    this.mDataArray = await this.rest.getProducts().toPromise();
  }

  stockTotal() {

    //การคำนวณค่า วิิธีที่ 1
    let sum = 0;
    for (let i = 0; i < this.mDataArray.length; i++) {
      sum += this.mDataArray[i].stock;
    }
    return sum;

    //การคำนวณค่า วิิธีที่ 2
    // let total: number = 0;
    // this.mDataArray.forEach((e: any) => {
    //   total = total + Number(e.stock);
    // });

    // return total;
  }

  editProduct(id) {
    this.router.navigate(["stock/edit/" + id]);
  }


  public get timestamp(): string {
    return Date.now().toString()
  }

  async onSearch(keyword) {
    if (keyword != "") {
      this.mDataArray = await this.rest.getProductByKeyword(keyword).toPromise();
    } else {
      this.mDataArray = await this.rest.getProducts().toPromise();
    }

  }


  async deleteProduct(id) {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async result => {
      if (result.value) {
        await this.rest.deleteProduct(id).toPromise();
        this.mDataArray = await this.rest.getProducts().toPromise();
      }
    });
  }

}
