import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Photo } from '../models/photo-model';
import { Travel } from '../models/travel-model';
import { Location } from '../models/location-model';
import { TravelDataService } from '../travel-data.service';


@Component({
  selector: 'app-add-travel',
  templateUrl: './add-travel.component.html',
  styleUrls: ['./add-travel.component.css']
})
export class AddTravelComponent {


  photos:Photo[]=[];
  photo: Photo = new Photo();

  travel:Travel = new Travel();
  location: Location = new Location();

  longitude!:number;
  latitude!:number;
  
  constructor(private travelService:TravelDataService, private _router:Router){}
  
  onAddClick():void{
    
    this.photos.push(this.photo);
    this.photo=new Photo();
  }

  onRemoveClick(photo:Photo):void{
    this.photos.forEach( (item, index) => {
      if(item === photo) this.photos.splice(index,1);
    });
  }

  onSaveClick():void{
    this.location.coordinates = [this.longitude, this.latitude];
    this.travel.photos = this.photos;
    this.travel.location = this.location;

    
    this.travelService.addTravel(this.travel).subscribe({
      next: (travel)=> { 
        alert("Travel created!");  
        this._router.navigate(["travels"]);
      },
      error: (error)=>{console.log(error);}
    });

  }
}
