import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserAlt, faTimes, faFolderOpen, faCheck, faHistory, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  uuidValue: any;
  userImageBase;
  faUserAlt = faUserAlt;
  faCheck = faCheck;
  faChartBar = faChartBar;
  faTimes = faTimes;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;
  userName: string;

  profileMessages: any;
  messagesStorage: any;
  unreadMessagesArray = [];
  readMessageStatus: boolean = false;
  UserLoggedId;
  constructor( private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService) { }

  ngOnInit(): void {
    this.UserLoggedId = localStorage.getItem("userId");
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);



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
    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }
     // retrieve profile data 
     this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        // console.log("all user profile object is --------------------------");
        // console.log(userProfileResponse.data);
        localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);

        this.userName = localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName");



      }
    )

    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        // console.log("user profile image exist");
        // console.log(userImageResponse);
        if(userImageResponse.data.body.data!=null || userImageResponse.data.body.data !=''){
          
  
            this.userImageBase = "default";
     
        }
        else{
          this.userImageBase = userImageResponse.data.body.data.image;
        }
        localStorage.setItem("userImage", this.userImageBase);


      },
      err => {
        console.log("user profile image is not found");
        console.log(err);
        this.userImageBase = "default";
        localStorage.setItem("userImage", this.userImageBase);

      }
    )
  }
  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
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
          if (message.read == false && message.from != this.UserLoggedId) {
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



  openAllMessags(message){

    if (message.from == this.UserLoggedId) {


      this.route.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        this.route.navigate(["/dashboard/previewAllMessagesAdmin/" +message._id.profileId ]);

      });
      
      // this.route.navigateByUrl("/dashboard/previewAllMessagesAdmin/" +message._id.profileId )
    }
    
    else{

      this.route.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        this.route.navigate(["/dashboard/previewAllMessagesAdmin/" +message._id.from ]);

      });
      
      // this.route.navigateByUrl("/dashboard/previewAllMessagesAdmin/" +message._id.from )
    }
 


  }

}
