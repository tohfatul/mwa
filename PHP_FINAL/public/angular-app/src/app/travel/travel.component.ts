import { Component, OnInit } from '@angular/core';
import { Travel } from '../models/travel-model';
import { Router } from '@angular/router';

import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})
export class TravelComponent implements OnInit {

  travel!: Travel;
  travelId!: String;
  ngOnInit():void{
    this.loadData(); 
  }
  constructor(private travelService:TravelDataService, private _router:Router){}

  loadData():void{
    this.travelId = this.travelService.getMessage();
    this.travelService.getTravel(this.travelId).subscribe({
      next: (travel)=> {this.travel = travel, console.log(this.travel);},
      error: (error)=>{console.log(error);}
    });
  }
}
