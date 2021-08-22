import { Component, OnInit } from '@angular/core';
import { faCoffee,faMugHot,faEnvelope,faInfinity,faLightbulb,faRocket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  faCoffee = faCoffee;
  faMugHot = faMugHot;
  faEnvelope = faEnvelope;
  faInfinity = faInfinity;
  faLightbulb = faLightbulb;
  faRocket = faRocket;
  constructor() { }

  ngOnInit(): void {
  }

}
