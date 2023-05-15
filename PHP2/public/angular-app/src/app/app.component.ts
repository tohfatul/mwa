import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-appw';

  people:String []= ["Jack", "John", "Jill"];

  onClickBtn (){
    this.title = "button clicked";
  }

  today = new Date();
}
