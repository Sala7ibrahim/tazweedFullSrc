import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCheckCircle,faSignOutAlt } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-project-thanks',
  templateUrl: './project-thanks.component.html',
  styleUrls: ['./project-thanks.component.css']
})
export class ProjectThanksComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  faSignOutAlt = faSignOutAlt;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
  logOut(){
    this.route.navigate(["/login"]);
    localStorage.clear();

  }

}
