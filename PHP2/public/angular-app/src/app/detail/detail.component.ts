import { Component, OnInit } from '@angular/core';
import { TravelDataService } from '../travel-data.service';
import { Travel } from '../models/travel';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  
  message: string="";
  travel:any="";

  constructor(private travelService:TravelDataService){

  }
  ngOnInit(): void {
    
    this.message = this.travelService.getMessage();

    this.travelService.getTravel(this.message).subscribe((response)=> {this.travel = response as Travel})

    console.log(this.travel);
  }

  

}
