import { Component, OnInit } from '@angular/core';
import{faCheckCircle} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-siteplicy-inner',
  templateUrl: './siteplicy-inner.component.html',
  styleUrls: ['./siteplicy-inner.component.css']
})
export class SiteplicyInnerComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
