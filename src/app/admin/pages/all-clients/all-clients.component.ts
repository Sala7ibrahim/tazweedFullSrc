import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {faTimes, faCheck,faToggleOn,faToggleOff} from '@fortawesome/free-solid-svg-icons';
import {faCommentDots,faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.css']
})
export class AllClientsComponent implements OnInit {

  faTimes = faTimes;
  faCheck = faCheck;
  faToggleOn = faToggleOn;
  faToggleOff = faToggleOff;
  faTrashAlt = faTrashAlt;
  faCommentDots = faCommentDots;
  uuidValue: any;
  showLoader = false;
  showActiveConfirmMessage = false;
  itemToEdit;
  allClients;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  messageReceiverName;
  messageReceiverNames = [];
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  showsendSuccess = false;
  showsendFail = false;
  adminRole;
  takeActionsPrivilage = false;
  deleteUserMode = false;
  deleteSuccess = false;
  deleteFail = false;
  userToDelete;
  constructor(
    private userServ:UserService,
    private Uuid: UUIDService,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");
    if(this.adminRole=='manager'){
      this.takeActionsPrivilage = true;
    }
    else  if(this.adminRole=='supervisor'){
      this.takeActionsPrivilage = false;
    }
    else{
      this.takeActionsPrivilage = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();

    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })

    this.getAllClients();
  }

  getAllClients() {
    this.userServ.getAllClients("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all clients object ---------------------- ");

        // console.log(response.data);
        this.allClients = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }

  closeActiveDialog() {
    this.showActiveConfirmMessage = false;
  }


  showActive(user) {
    this.showActiveConfirmMessage = true;
    this.itemToEdit = user;
  }


  activateAccount(profileId) {
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "active" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        setTimeout(() => {
          this.showActiveConfirmMessage = false;
        }, 1500);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showActiveConfirmMessage = false;

      }
    )
  }

  deActivateAccount(profileId) {
    // console.log("wait for response");
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "deactivate" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showLoader = false;
        setTimeout(() => {
          this.showDeactiveConfirmMessage = false;
        }, 1500);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showDeactiveConfirmMessage = false;

      }
    )
  }

  closeDeactiveDialog() {
    this.showDeactiveConfirmMessage = false;
  }

  showDeactive(user) {
    this.showDeactiveConfirmMessage = true;
    this.itemToEdit = user;

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

  previewProfileData(user) {
    this.userServ.selectedUser.next(user)
    this.route.navigate(["/dashboard/previewProfileDataInAdmin/" + user._id]);
    
  }




  showDeleteUserDialog(user){
    this.userToDelete = user;
    this.deleteUserMode = true;
  }

  deleteUserProfile(){
    this.showLoader = true;
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.userServ.deleteUserProfile(this.userToDelete._id,"admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response:any)=>{
        this.showLoader = false;
        console.log("client profile deleted ")
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteUserMode = false;
        }, 1500);
        this.getAllClients()
      },
      err=>{
        this.showLoader = false;
        console.log("error in delete client");
        this.deleteFail = true;
        console.log(err);
        
      }
    )
  }

  closeDeleteUserDialog(){
    this.deleteUserMode = false;
  }
}
