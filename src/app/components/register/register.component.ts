import { RestService } from './../../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(
    private location: Location,
    private rest: RestService) { }

  isError = false;

  ngOnInit() {
  }

  async onClickSubmit(values) {
    let result = await this.rest.register(values).toPromise();
    if (result.result == true) {
      this.isError = false
      this.location.back()
    } else {
      this.isError = true
    }
  }

  onClickCancel() {
    this.location.back();
  }

}
