import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // DI (Dependency Injection)
  constructor(
    private router: Router,
    private rest: RestService) { }

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
    // alert(JSON.stringify(result))
  }

  onClickRegister() {
    this.router.navigate(["register"])
  }
}
