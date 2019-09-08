import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // DI (Dependency Injection)
  constructor(
    private locaion: Location,
    private rest: RestService) { }

  isError = false;


  ngOnInit() {
  }

  async onClickSubmit(values) {
    let result = await this.rest.register(values).toPromise();
    if (result.result == true) {
      this.isError = false
      this.locaion.back()
    } else {
      this.isError = true
    }
    alert(JSON.stringify(result))
  }

  onClickCencel() {
    this.locaion.back();
  }
}
