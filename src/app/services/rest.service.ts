import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private hostUrl = environment.backendUrl;
  private authenApiUrl = `${this.hostUrl}api/v2/authen`;
  private stockApiUrl = `${this.hostUrl}api/v2/stock`;
  private loginUrl = `${this.authenApiUrl}/login`;
  private registerUrl = `${this.authenApiUrl}/register`;
  private productUrl = `${this.stockApiUrl}/product`;

  private imgUrl = 'http://localhost:3000//images/'
  constructor(private http: HttpClient) { }

  isLoggedIn() {
    let loginResult = localStorage.getItem(environment.loginResult);
    return (loginResult != null && loginResult == 'ok')
  }

  login(usernamePassword) {
    return this.http.post<any>(this.loginUrl, usernamePassword, { headers: this.headers })
  }

  register(usernamePassword) {
    return this.http.post<any>(this.registerUrl, usernamePassword, { headers: this.headers })
  }

  getProducts(){
    return this.http.get<any[]>(this.productUrl, {headers: this.headers})
  }

  addProduct(product) {
    return this.http.post<any>(this.productUrl, product);
  }

  deleteProduct(id) {
    const url = `${this.productUrl}/${id}`;
    return this.http.delete<void>(url, { headers: this.headers });
  }

  updateProduct(product) {
    // const url = `${this.productUrl}/${id}`;
    return this.http.put<any>(this.productUrl, product);
  }

  getProductById(id: number) {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }

  getimgProductById(id: number) {
    const url = `${this.imgUrl}/${id}`;
    return this.http.get<any>(url, { headers: this.headers });
  }
  

  getProductByKeyword(keyword : String) {
    const url = `${this.productUrl}/keyword/${keyword}`;
    return this.http.get<any[]>(url);    
  }

  //#Search Have Delay
  // searchWithDebounce(terms:Observable<string>){
  //   return terms.debounceTime(400)
  //   .distinctUntilChanged()
  //   .switchMap(term =>{
  //     if (term != null && term != "") {
  //       return this.getProductByKeyword(term)
  //     } else {
  //       return this.getProducts()
  //     }
  //   });
  // }
  
}
