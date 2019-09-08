import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router:Router) { }

  ngOnInit() {
  }


  onClikSignOut(){
    localStorage.removeItem(environment.loginResult);
    this.router.navigate(["/login"])
  }
}
