import { Component, OnInit } from '@angular/core';
import { Travel } from '../travel-model';
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
  constructor(private travelService:TravelDataService){}

  loadData():void{
    this.travelId = this.travelService.getMessage();
    this.travelService.getTravel(this.travelId).subscribe({
      next: (travel)=> {this.travel = travel, console.log(travel);},
      error: (error)=>{console.log(error);}
    });
  }
}
