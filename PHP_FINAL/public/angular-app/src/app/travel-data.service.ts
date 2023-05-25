import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Travel } from './travel-model';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {

  message:String="";
  private apiBaseUrl: string= "http://localhost:3000/api";
  constructor(private http:HttpClient) { }

  public getTravels(count:number, offsetVal:number): Observable<Travel[]> {
    const url: string= this.apiBaseUrl + "/travels" + "?count=" + count + "&offset=" + offsetVal;
    return this.http.get<Travel[]>(url);
  }
  public getTravel(travelId:String): Observable<Travel> {
    const url: string= this.apiBaseUrl + "/travels/" + travelId;
    return this.http.get<Travel>(url);
  }

  setMessage (data:String){
    this.message=data;
  }
  getMessage (){
    return this.message;
  }
}
