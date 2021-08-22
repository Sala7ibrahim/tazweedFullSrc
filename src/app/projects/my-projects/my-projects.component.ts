import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faArrowLeft, faLongArrowAltDown, faFolderOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  faArrowLeft = faArrowLeft;
  faLongArrowAltDown = faLongArrowAltDown;
  faFolderOpen = faFolderOpen;
  faTrashAlt = faTrashAlt;
  uuidValue: any;
  myProjects;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  isEditable = false;
  stepperValue;
  showApplyBoxFail = false;
  showApplyBoxSuccess = false;
  showLoaderMaster = false;
  showSuccessForPartner = true;
  showdeliverBox = false;
  haspurposalsArray = [];
  prePaymentStatusArray = [];
  activeStatusArray = [];
  pendingStatusArray = [];
  inprogressStatusArray = [];
  reviewingStatusArray = [];
  completedStatusArray = [];
  rejectedStatusArray = [];
  userType = localStorage.getItem("sessionUserType");
  paymentUrl;
  profileRating;
  logErrors: any;
  cartMode = false;
  projectToCart;
  cartSuccess = false;
  cartFail = false;
  cartForm: FormGroup;
  constructor(
    private projectServ: ManageProjectService,
    private Uuid: UUIDService,
    private route: Router,
    private _formBuilder: FormBuilder,
    private userServ: UserService

  ) { }

  ngOnInit(): void {
    // console.log("salah");

    //     console.log(window.console);
    this.cartForm = new FormGroup({
      redirectToPaymentGetway: new FormControl(false)

    })
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['']
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['']
    });
    this.uuidValue = this.Uuid.generateUUID();
    this.getProfileRating();
    this.projectServ.getMyProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")).subscribe(
      (response: any) => {
        this.myProjects = response.data;
        this.myProjects.sort((a, b) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        const projectStatue = this.myProjects.status;
        if (projectStatue == 'active') {
          this.stepperValue = 1;

        }
        else if (projectStatue == 'pending') {
          this.stepperValue = 2;

        }
        else {
          this.stepperValue = 3;

        }

        for (const project of this.myProjects) {

          if (project.hasProposal == true) {
            if (project.status == "active") {
              this.haspurposalsArray.push("1");
              this.activeStatusArray.push("1");
              this.pendingStatusArray.push("1");
            }
            else if (project.status == "pending") {
              this.haspurposalsArray.push("1");
              this.pendingStatusArray.push("1");
            }

            else if (project.status == "inprogress") {
              this.inprogressStatusArray.push("1");
            }
            else if (project.status == "reviewing") {
              this.reviewingStatusArray.push("1");
            }
            else if (project.status == "completed") {
              this.completedStatusArray.push("1");
            }
            else if (project.status == "rejected") {
              this.rejectedStatusArray.push("1");
            }



          }

          else {

            // this.prePaymentStatusArray.push("1");
            if (project.status == "prePayment") {
              this.prePaymentStatusArray.push("1");
            }

            else if (project.status == "active") {
              this.activeStatusArray.push("1");
            }
            else if (project.status == "pending") {
              this.pendingStatusArray.push("1");
            }
            else if (project.status == "inprogress") {
              this.inprogressStatusArray.push("1");
            }
            else if (project.status == "reviewing") {
              this.reviewingStatusArray.push("1");
            }
            else if (project.status == "completed") {
              this.completedStatusArray.push("1");
            }
            else if (project.status == "rejected") {
              this.rejectedStatusArray.push("1");
            }


          }
          // if (project.status == "prePayment") {
          //   this.prePaymentStatusArray.push("1");
          // }
          // else if (project.hasProposal == true && project.status == "active" ) {
          //   this.haspurposalsArray.push("1");


          // }
          // else if (project.status == "active") {
          //   this.activeStatusArray.push("1");
          // }

          // else if (project.status == "inprogress") {
          //   this.inprogressStatusArray.push("1");
          // }
          // else if (project.status == "reviewing") {
          //   this.reviewingStatusArray.push("1");
          // }
          // else if (project.status == "completed") {
          //   this.completedStatusArray.push("1");
          // }
          // else if(project.status == "rejected"){
          //   this.rejectedStatusArray.push("1");
          // }
        }
      },
      err => {
        console.log(err)

      }
    )

  }
  editPoject(project) {
    // console.log("you will edit project with ID = " + JSON.stringify(project));
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["updateProject/" + project._id]);

  }

  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/" + project._id]);
  }

  logStepValue(status: string) {
    if (status == 'active') {
      this.showApplyBoxFail = true;
      this.showApplyBoxSuccess = false;
    }
    else {
      this.showApplyBoxFail = false;
      this.showApplyBoxSuccess = true;

    }

  }
  deliverProjectForClient() {
    this.showSuccessForPartner = false;
    this.showdeliverBox = true;
  }


  repayProject(project) {

    const prjectPrePayment = {
      "profileId": localStorage.getItem("userId"),
      "jobId": project._id
    }
    console.log(prjectPrePayment);
    this.showLoaderMaster = true;
    this.projectServ.repayJop(prjectPrePayment, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("success");
        console.log(response);
        this.paymentUrl = response.data.redirectUrl;
        window.location.href = this.paymentUrl;
        this.showLoaderMaster = false;

      },
      err => {
        console.log("error");
        console.log(err);

      }
    )

  }


  getProfileRating() {
    this.userServ.getRating(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("rating object ==== ");
        // console.log(response.data);
        this.profileRating = response.data;
      },
      err => {
        console.log("no rating found");


      }
    )
  }

  openCartprojectDialog(project) {
    this.cartSuccess = false;
    this.cartFail = false;
    this.projectToCart = null;
    this.projectToCart = project
    this.cartMode = true

  }

  closeCartprojectDialog() {
    this.projectToCart = null;
    this.cartMode = false
  }

  addProjectToCart(project) {
    this.projectToCart = project
    this.cartForm.get("redirectToPaymentGetway").setValue(false);


    this.projectServ.editJob(this.cartForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), project._id).subscribe(
      (response: any) => {
        // this.cartSuccess = true;
        // setTimeout(() => {
        //   this.cartSuccess = false;
        // }, 1500);
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);
          // this.ngOnInit()




        });

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cartFail = true;
      }
    )

  }


}
