import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TravelDataService } from '../travel-data.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  constructor(private travelService:TravelDataService, private _router:Router){}
  
  userInfo:any;

  ngOnInit():void{
    this.userInfo = this.travelService.getUserLogin();
  }
  onTravelListClick ():void {
    this._router.navigate(['travels']);
  }

  onSignupClick():void{
    this._router.navigate(['signup'])
  }
  onLoginClick():void{
    this._router.navigate(['login'])
  }
  onLogoutClick():void{
    this.userInfo="";
  }
}
