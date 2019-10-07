import { environment } from './../../../environments/environment';
import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // DI (Dependency Injection)
  constructor(
    private router: Router,
    private rest: RestService,
  ) { }

  isError = false;

  ngOnInit() {
    if (this.rest.isLoggedIn() == true) {
      this.router.navigate(["/stock"])
    }
  }

  async onClickSubmit(values) {
    let result = await this.rest.login(values).toPromise();
    if (result.result == true) {
      localStorage.setItem(environment.loginResult, "ok")
      this.isError = false
      this.router.navigate(["/stock"])
    } else {
      this.isError = true
    }

    // this.http.post("http://localhost:3000/api/v2/authen/login", values).toPromise().then(result =>{
    // alert(JSON.stringify(result))
    // })

  }

  onClickRegister() {
    this.router.navigate(["register"])
  }
}
