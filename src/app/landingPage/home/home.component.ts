import { Component, OnInit } from '@angular/core';
import { faCoffee,faMugHot,faEnvelope,faInfinity,faLightbulb,faRocket } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faCoffee = faCoffee;
  faMugHot = faMugHot;
  faEnvelope = faEnvelope;
  faInfinity = faInfinity;
  faLightbulb = faLightbulb;
  faRocket = faRocket;
  constructor() { }

  ngOnInit(): void {
    localStorage.clear();
    //   localStorage
  }

}
