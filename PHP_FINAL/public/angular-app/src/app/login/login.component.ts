import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: String="";
  password: String="";

  constructor(private travelService:TravelDataService, private _router:Router){}
  onLoginClick():void{
    this.travelService.login(this.email, this.password).subscribe({
      next: (response)=> { 
        console.log("valid login");
        this.travelService.setUserLogin(this.email,response.fullname, response.token);
        this._router.navigate(["travels"]);
      },
      error: (error)=>{
        alert("Invalid login");
        console.log(error);
      }
    });
  }
}
