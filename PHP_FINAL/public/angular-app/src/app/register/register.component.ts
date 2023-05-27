import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TravelDataService } from '../travel-data.service';
import { User } from '../models/user-model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  user: User = new User();
  
  ngOnInit():void{
    
  }
  constructor(private travelService:TravelDataService, private _router:Router){}

  onSaveClick():void{
    //this.user.fullname="df";
    console.log(this.user.fullname);
    this.travelService.addUser(this.user).subscribe({
      next: (user)=> { 
        alert("User created!");  
        this._router.navigate(["login"]);
      },
      error: (error)=>{console.log(error);}
    });
  }

}
