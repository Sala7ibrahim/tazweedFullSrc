import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  showLoaderInput = false;

 
  showLoader = false;
  uuidValue: any;
  math = Math;
  userImageBase;
  faArchive = faArchive;
  faUserAlt = faUserAlt;
  faUsersCog = faUsersCog;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faChartBar = faChartBar;
  faTrashAlt = faTrashAlt;
  faPercentage = faPercentage;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faMoneyBillWave = faMoneyBillWave;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;

  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName: string;
  sessionUserType;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  showsendAllSuccess = false;
  showsendAllFail = false;
  messageReceiverName;
  messageReceiverNames = [];


  constructor(
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
  

    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })


    this.sendMessageForCategoryForm = new FormGroup({
      for: new FormControl("partner"),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))

    })


    this.getAllAdminMessages();

  }

  sendMeaasge(receiver) {
    this.showMessageDialog = true;
    this.messageReceiver = receiver;

  }
  closeMessageDialog() {
    this.showMessageDialog = false;

  }

  sendMeaage() {
    // fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    this.sendMessageSpecificUserForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    this.sendMessageSpecificUserForm.get("profileId").setValue(this.messageReceiver._id);
    console.log(this.sendMessageSpecificUserForm.value);
    this.showLoader = true;
    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);
        this.showLoader = false;
        this.showsendSuccess = true;
        this.showsendFail = false;
        setTimeout(() => {
          this.showsendSuccess = false;
          this.ngOnInit();

        }, 1500);
      },
      err => {
        console.log(err);
        this.showsendSuccess = false;
        this.showsendFail = true;
        this.showLoader = false;

      }
    )
  }

  // send message for category

  sendMeaageForCategory() {
    this.sendMessageForCategoryForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    console.log(this.sendMessageForCategoryForm.value);
    this.showLoader = true;
    this.userServ.sendMessageToCategory(this.sendMessageForCategoryForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent for category');
        console.log(response);
        this.showLoader = false;
        this.showsendAllSuccess = true;
        setTimeout(() => {
          this.showsendAllSuccess = false;
          this.ngOnInit();

        }, 1500);
        // this.ngOnInit;
      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showsendAllFail = true;


      }
    )
  }

  getAllAdminMessages() {
    this.userServ.getAllAdminMessages("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all messages response");
        // console.log(response.data);
        this.messageObject = response.data;
        this.showLoader = false;
        // console.log(this.messageObject.profileId);
        for (const singleMessage of this.messageObject) {
          // console.log("single profile for message is ====");

          // console.log(singleMessage.profileId);
          this.userServ.getOneProfileData(singleMessage.profileId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
            (response: any) => {

              // console.log(response);
              this.messageReceiverName = response.data.firstName + " " + response.data.lastName;
              // console.log("message receiver profile response");
              // console.log(this.messageReceiverName);
              this.messageReceiverNames.push(this.messageReceiverName);



            }
          )

        }




      },
      err => {
        console.log(" no messages");
        this.showLoader = false;
        console.log(err);

      }


    )

  }

  closeSuccessDlg() {
    this.showEditSuccess = false;
    this.ngOnInit()
  }

  closeFailDlg() {
    this.showEditFail = false;


  }

}
