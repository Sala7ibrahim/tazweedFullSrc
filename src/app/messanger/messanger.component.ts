import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-messanger',
  templateUrl: './messanger.component.html',
  styleUrls: ['./messanger.component.css']
})
export class MessangerComponent implements OnInit {
  faPaperPlane = faPaperPlane;
  uuidValue: any;
  profileMessages: any;
  messagesStorage: any;
  newProfileImagePath;
  unreadMessagesArray = [];
  adminImage = false;
  readMessageStatus: boolean = false;
  sendMessageSpecificUserForm: FormGroup;
  showLoader = false;
  constructor(private Uuid: UUIDService, private route: Router, private userServ: UserService) { }

  ngOnInit(): void {


    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })
    this.uuidValue = this.Uuid.generateUUID();


    setTimeout(() => {
      this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"));


      // this.messagesStorage.sort((a,b) => a.message.localeCompare(b.message));

    }, 1000);


    // console.log("message from storage ==== " + this.messagesStorage);
    if (!localStorage.getItem("profileMessagesStorage")) {
      this.getProfileMessages();
    }
    else if (this.messagesStorage == null || this.messagesStorage == '' || !this.messagesStorage) {
      this.getProfileMessages();
    }
    else {
      this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"))

    }
  }


  getProfileMessages() {
    this.userServ.getProfileMessages(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.profileMessages = response.data;
        console.log("messages in profile ***************");
        console.log(response.data);
        response.data.sort((a, b) => {
          return <any>new Date(b.createAt) - <any>new Date(a.createAt);
        });
        localStorage.setItem("profileMessagesStorage", JSON.stringify(response.data));
        for (const message of response.data) {
          if (message.read == false) {
            this.unreadMessagesArray.push(message);
            // this.readMessageStatus = false;
          }
          else {
            // this.readMessageStatus = true;
          }

        }



      },
      err => {
        // console.log("no messages");
        console.log(err);


      }
    )
  }




  sendMeaage() {
    console.log(this.sendMessageSpecificUserForm.value);
    this.showLoader = true;


    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);
        this.showLoader = false;
   
        // setTimeout(() => {
        //   this.ngOnInit();

        // }, 1500);
      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }

}
