import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Travel } from '../models/travel-model';
import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-edit-travel',
  templateUrl: './edit-travel.component.html',
  styleUrls: ['./edit-travel.component.css']
})
export class EditTravelComponent implements OnInit{

  travel!: Travel;
  travelId!: String;

  ngOnInit():void{
    this.loadData(); 
  }
  constructor(private travelService:TravelDataService, private _router:Router){}

  onSaveClick():void{
    this.travelService.updateTravel(this.travel).subscribe({
      next: ()=> { 
        alert("Information saved!");  
        this._router.navigate(["travels"]);
      },
      error: (error)=>{
        alert("Couldn't save");
        console.log(error);
      }
    });
  }
  
  loadData():void{
    this.travelId = this.travelService.getMessage();
    this.travelService.getTravel(this.travelId).subscribe({
      next: (travel)=> {this.travel = travel, console.log(travel);},
      error: (error)=>{console.log(error);}
    });
  }
}
