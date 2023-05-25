import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TravelDataService } from './travel-data.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private travelService:TravelDataService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const modifiedRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + this.travelService.getUserLogin().token)
    });

    
    return next.handle(modifiedRequest);
  }
  
}
