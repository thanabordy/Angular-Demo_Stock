import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
// import { Subject } from 'rxjs';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  baseUrl = environment.baseUrl;
  node_static_url = environment.backendUrl;
  mDataArray: any[];
  Sumstock = 0
  Sumproduct = 0
  // searchTerm = new Subject<string>()
  

  constructor(private rest: RestService, private router: Router) { }

  async ngOnInit() {

    // this.dtOptions = {
    //   "paging":   true,
    // };

    let result = await this.rest.getProducts().toPromise();
    this.mDataArray = result;

    console.log(result);

    //# Search Have Delay (400) => 0.4 sec
    // this.mDataArray = await this.rest.getProducts().toPromise();
    // this.rest.searchWithDebounce(this.searchTerm).subscribe(result => {
    //   this.mDataArray = result;
    // })

    //# Sum stock
    let sum = 0;
    for (var i = 0; i < this.mDataArray.length; i++) {
      sum += this.mDataArray[i].stock;
    }
    this.Sumstock = sum;

  }

  public get timestamp(): string {
    return Date.now().toString();
  }

  showImage(image) {
    Swal.fire({
      imageUrl: ('http://localhost:3000/images/' + image),
      imageHeight: 320,
      imageAlt: 'Images'
    })
  }

  editProduct(id) {
    this.router.navigate(["stock/edit/" + id]);
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

  async onSearch(keyword) {
    //Search Not Delay
    if (keyword != "") {
      this.mDataArray = await this.rest.getProductByKeyword(keyword).toPromise();
    } else {
      this.mDataArray = await this.rest.getProducts().toPromise();
    }
  }



  // ngOnInit() {

  //       this.http.get('https://swapi.co/api/people/')
  //         .subscribe((res: Response) => {
  //           this.users = res.json().results; 
  //         }, error => {
  //           console.log(error);
  //           this.errorFromSubscribe = error;
  //   });
  // }
}
