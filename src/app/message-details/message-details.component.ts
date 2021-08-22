import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-message-details',
  templateUrl: './message-details.component.html',
  styleUrls: ['./message-details.component.css']
})
export class MessageDetailsComponent implements OnInit { 
  selectedMessage:any;
  constructor(private userServ:UserService) { }

  ngOnInit(): void {
    this.userServ.messageToRead.subscribe(
      (response)=>{
        this.selectedMessage = response;
      }
    )

  }

}
