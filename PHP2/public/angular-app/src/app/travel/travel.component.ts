import { Component, OnInit } from '@angular/core';
import { TravelDataService } from '../travel-data.service';
import { Travel } from '../models/travel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})


// export class Travel{
//   #_id: string;

//   constructor(id:string){
//     this.#_id=id;
//   }
// }
export class TravelComponent implements OnInit {

  
  message:string = "I am from travelComponent";
  travels: Travel[]=[];
  constructor(private travelService:TravelDataService, private _router:Router){}
  ngOnInit():void{
    
   this.loadData();
    
  }

  
  onDelete(id:string):void{
    this.travelService.setMessage(id);
    this.travelService.deleteTravel(id).then(()=>
      {
        this.loadData();
      }
      );
      
    
  }

  onView(id:string):void{
    this.travelService.setMessage(id);
    this._router.navigate(["travels/detail"]);
  }

  loadData():void{
    this.travelService.getTravels().subscribe((response)=> {this.travels = response as Travel[]})
  }
}

