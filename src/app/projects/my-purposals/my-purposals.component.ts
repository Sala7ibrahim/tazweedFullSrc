import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import {faTimes } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-my-purposals',
  templateUrl: './my-purposals.component.html',
  styleUrls: ['./my-purposals.component.css']
})
export class MyPurposalsComponent implements OnInit {
  uuidValue: any;
  myPurposals;
  showLoader = false;
  faTimes = faTimes;
  cancelpurposalMode = false;
  purposaltocanel;
  cancelSuccess = false;
  cancelFail = false;
  userType = localStorage.getItem("sessionUserType");
  constructor(
    private projectServ: ManageProjectService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    this.showLoader = true;
    if (this.userType == "partner") {

      this.projectServ.getPartnerPurposals(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("all purposals response");
          console.log(response);


          this.myPurposals = response.data;



        },
        err => {
          console.log(err)
          this.showLoader = false;

        }
      )
    }


  }


  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["projectDetailsNoActions/" + project]);
  }

 
  openCancelPurposalDialog(purposal){
    this.cancelFail = false;
    this.cancelpurposalMode = false;
    this.purposaltocanel = purposal;
    console.log("purposaltocanel");
    console.log(this.purposaltocanel);
    this.projectServ.deletePurposal(this.purposaltocanel, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.ngOnInit()

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cancelpurposalMode = true;
        this.cancelFail = true;

      }
    )

    
    
    
  }


  rejectPurposal(purposalId){
    this.projectServ.editPurposal({status: "canceled"}, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"),purposalId).subscribe(
      (response: any) => {
        // console.log(response);
        
        this.ngOnInit()


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cancelpurposalMode = true;
        this.cancelFail = true;

      }
    )

    



  }

}
