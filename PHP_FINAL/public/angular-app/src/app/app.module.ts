import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { TravelsComponent } from './travels/travels.component';
import { TravelComponent } from './travel/travel.component';
import { EditTravelComponent } from './edit-travel/edit-travel.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { InterceptorService } from './interceptor.service';
import { AddTravelComponent } from './add-travel/add-travel.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    TravelsComponent,
    TravelComponent,
    EditTravelComponent,
    LoginComponent,
    RegisterComponent,
    AddTravelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:"",
        component:HomeComponent
      },
      {
        path:"travels",
        component:TravelsComponent
      },
      {
        path:"travels/detail/:travelId",
        component:TravelComponent
      },
      {
        path:"travels/edit/:travelId",
        component:EditTravelComponent
      },
      {
        path:"travels/create",
        component:AddTravelComponent
      },
      {
        path:"signup",
        component:RegisterComponent
      },
      {
        path:"login",
        component:LoginComponent
      },
      {
        path:"**",
        component:ErrorPageComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
