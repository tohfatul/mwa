import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Travel } from '../models/travel-model';
import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.css']
})
export class TravelsComponent implements OnInit {

  userInfo:any;

  travels!: Travel[];
  viewCount:number=5;
  offsetVal: number=0;
  constructor(private travelService:TravelDataService, private _router:Router){}

  ngOnInit():void{
    this.userInfo = this.travelService.getUserLogin();
    this.loadData(); 
  }
  private fillTravels(travels: Travel[]) {
    this.travels= travels;
  }
  loadData():void{
    this.travelService.getTravels(this.viewCount, this.offsetVal).subscribe({
      next: (travels)=> {this.fillTravels(travels), console.log(this.travels);},
      error: (error)=>{this.travels= []; console.log(error);}
    });
  }
  onDetailClick(travelId: String):void{
    this.travelService.setMessage(travelId);
    this._router.navigate(['travels/detail/'+ travelId]);
  }
  onEditClick(travelId: String):void{
    this.travelService.setMessage(travelId);
    this._router.navigate(['travels/edit/'+ travelId]);
  }
  onDeleteClick(travelId: String):void{
    this.travelService.deleteTravel(travelId).subscribe({
      next: ()=> {
        this.loadData();
      },
      error: (error)=>{
        alert("Delete failed");
        console.log(error);
      }
    });
  }
}
