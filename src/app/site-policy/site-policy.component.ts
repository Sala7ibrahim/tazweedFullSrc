import { Component, OnInit } from '@angular/core';
import{faCheckCircle} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-site-policy',
  templateUrl: './site-policy.component.html',
  styleUrls: ['./site-policy.component.css']
})
export class SitePolicyComponent implements OnInit {
  faCheckCircle = faCheckCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
