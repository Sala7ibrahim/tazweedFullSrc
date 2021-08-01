import { Component, OnInit } from '@angular/core';
import{faTimesCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-project-fail',
  templateUrl: './add-project-fail.component.html',
  styleUrls: ['./add-project-fail.component.css']
})
export class AddProjectFailComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  constructor() { }

  ngOnInit(): void {
  }

}
