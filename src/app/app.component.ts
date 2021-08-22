import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  hours: any = 24; // Reset when storage is more than 24hours
  now: any = Date.now();
  setupTime: any = localStorage.getItem('setupTime');
  constructor(private userServ: UserService) { }
  title = 'Tazweed';
  userLogged;
  ngOnInit() {
    if (this.setupTime == null) {
      localStorage.setItem('setupTime', this.now)
    } else if (this.now - this.setupTime > this.hours * 60 * 60 * 1000) {
      localStorage.clear()
      localStorage.setItem('setupTime', this.now);
    }
    this.userLogged = localStorage.getItem("auth");
    if (!this.userLogged) {
      this.userServ.addVisit().subscribe(
        (response) => {
          // console.log("visit added ");
          // console.log(response);
          localStorage.clear();

        }
      )

    }

    // console.log("application started ==");

  }
  onActivate(event) {
    window.scroll(0,0);

}
}
