import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { Travel } from './models/travel';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TravelDataService {

  message:string="";
  baseUrl:string = "http://localhost:3000/api/";

  constructor(private http:HttpClient) { }

  public getTravels(): Observable<Travel[]>{
    return this.http.get<Travel[]>(this.baseUrl + "travels").pipe(map(respnse=>respnse as Travel[]));
  }

  public getTravel(travelId:string): Observable<Travel>{
    return this.http.get<Travel>(this.baseUrl+"travels/"+travelId).pipe(map(respnse=>respnse as Travel));
  }

  public addTravel(travelObj:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(travelObj);
    return this.http.post(this.baseUrl + "travels", body, {'headers':headers})
  }
  public deleteTravel(travelId:string){
    return this.http.delete(this.baseUrl+"travels/"+travelId).toPromise();
  }

  setMessage (data:string){
    this.message=data;
  }
  getMessage (){
    return this.message;
  }
}
