import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { UUIDService } from 'src/app/services/uuid.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preview-all-messages',
  templateUrl: './preview-all-messages.component.html',
  styleUrls: ['./preview-all-messages.component.css']
})
export class PreviewAllMessagesComponent implements OnInit {
 
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
  adminId;
  UserLoggedId;
  constructor(private Uuid: UUIDService, private route: Router, private userServ: UserService,private actRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.UserLoggedId = localStorage.getItem("userId");
this.adminId = this.actRoute.snapshot.params["id"];
console.log("this.adminId");
console.log(this.adminId);

    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(this.adminId),
      message: new FormControl(null,Validators.required),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })
    this.uuidValue = this.Uuid.generateUUID();


    // setTimeout(() => {
    //   this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"));


    //   // this.messagesStorage.sort((a,b) => a.message.localeCompare(b.message));

    // }, 1000);
    this.getProfileMessages();

    // console.log("message from storage ==== " + this.messagesStorage);
    // if (!localStorage.getItem("profileMessagesStorage")) {
    //   this.getProfileMessages();
    // }
    // else if (this.messagesStorage == null || this.messagesStorage == '' || !this.messagesStorage) {
    //   this.getProfileMessages();
    // }
    // else {
    //   this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"))

    // }
  }


  getProfileMessages() {
    this.userServ.updateMessage(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {


      },
      err => {
        console.log("error in update message " + err);

      }
    )
    this.userServ.getAllMessagesFromSpecificProfile(localStorage.getItem("userId"),this.adminId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // this.profileMessages = response.data;
        console.log("messages in profile ***************");
        console.log(response.data);
        this.messagesStorage = response.data
        this.messagesStorage.sort((a, b) => {
          return <any>new Date(a.createdAt) - <any>new Date(b.createdAt);
        });
        // localStorage.setItem("profileMessagesStorage", JSON.stringify(response.data));
        // for (const message of response.data) {
        //   if (message.read == false) {
        //     this.unreadMessagesArray.push(message);
        //     // this.readMessageStatus = false;
        //   }
        //   else {
        //     // this.readMessageStatus = true;
        //   }

        // }


      


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


    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);
        this.showLoader = false;
   this.getProfileMessages()
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
