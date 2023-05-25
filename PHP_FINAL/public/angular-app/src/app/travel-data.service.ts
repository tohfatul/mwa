import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Travel } from './travel-model';
import { User } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class TravelDataService {

  message:String="";
  userLogin:any = {
    "email": "",
    "fullname": "",
    "token": ""
  }

  private apiBaseUrl: string= "http://localhost:3000/api/";
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http:HttpClient) { }

  public getTravels(count:number, offsetVal:number): Observable<Travel[]> {
    const url: string= this.apiBaseUrl + "travels" + "?count=" + count + "&offset=" + offsetVal;
    return this.http.get<Travel[]>(url);
  }
  public getTravel(travelId:String): Observable<Travel> {
    const url: string= this.apiBaseUrl + "travels/" + travelId;
    return this.http.get<Travel>(url);
  }

  public addUser(user:User): Observable<any> {
    //const data = JSON.stringify(user);
    console.log(user);
    const data={"fullname": user.fullname, "email": user.email, "password": user.password};
    console.log("data is " + data);
    return this.http.post<any>(this.apiBaseUrl + "users", data, {"headers":this.headers})
  }
  public login(email:String, password: String): Observable<any>{
    const credential = {"email": email, "password": password}
    return this.http.post<any>(this.apiBaseUrl + "users/login", credential, {"headers":this.headers})
  }
  setMessage (data:String){
    this.message=data;
  }
  getMessage (){
    return this.message;
  }

  setUserLogin(email:String, fullname:String, token:String){
    this.userLogin.email = email;
    this.userLogin.fullname = fullname;
    this.userLogin.token =token;
  }

  getUserLogin(){
    return this.userLogin;
  }
}
