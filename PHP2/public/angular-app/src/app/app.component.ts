import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TravelDataService } from './travel-data.service';
import { Travel } from './models/travel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-appw';
  travels:Travel[]=[];
  
  people:String []= ["Jack", "John", "Jill"];

  travelObj={
    location : {
      name:"",
      coordinates: [88.233, 22.765]
    },
    country:"",
    photos: [
      {
        title: "no title",
        url: "blank url"
      }
    ]
  }
  

  onClickBtn (){
    this.title = "button clicked";
  }

  constructor(private travelservice:TravelDataService){

  }
  onSubmit(form:NgForm){
    //console.log(form);
    this.travelObj.location.name=form.value.travelDetails.location;
    this.travelObj.country=form.value.travelDetails.country;
    this.travelservice.addTravel(this.travelObj).subscribe((response)=> {this.travels = response as Travel[]});
    
  }
  today = new Date();
}
