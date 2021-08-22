import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faEnvelope,faClock,faCalendar,faWrench, faGrinStars, faTimes, faCheck, faExclamationTriangle, faHourglassHalf, faMoneyBillWave, faFileAlt, faChevronDown, faExclamationCircle, faChevronUp, faArrowLeft, faFileDownload, faAddressCard, faUserAlt, faMobileAlt, faFlag, faVenusMars, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { project } from 'src/app/Model/project';

@Component({
  selector: 'app-accept-partner',
  templateUrl: './accept-partner.component.html',
  styleUrls: ['./accept-partner.component.css']
})
export class AcceptPartnerComponent implements OnInit {
  showUserData = false;
  showWhthdrawDlg = false;
  idToShow;
  public isCollapsed = true;
  faEnvelope = faEnvelope;
  faCalendar = faCalendar;
  faClock = faClock;
  faChevronUp = faChevronUp;
  faWrench = faWrench;
  faArrowLeft = faArrowLeft;
  cancelJobMessageP = false;
  faGrinStars = faGrinStars;
  faExclamationTriangle = faExclamationTriangle;
  faExclamationCircle = faExclamationCircle;
  showCanceljobConfirm = false;
  faTimes = faTimes;
  faCheck = faCheck;
  faFileAlt = faFileAlt;
  faMoneyBillWave = faMoneyBillWave;
  faChevronDown = faChevronDown;
  faHourglassHalf = faHourglassHalf;
  faFileDownload = faFileDownload;
  faAddressCard = faAddressCard;
  faMobileAlt = faMobileAlt;
  faUserAlt = faUserAlt;
  faFlag = faFlag;
  tags;
  cancelJobMessage = false;
  withdrowJobMessage = false;
  faVenusMars = faVenusMars;
  faFolderOpen = faFolderOpen;
  currentRate = 0;
  showApplyBoxFail = false;
  showApplyBoxSuccess = false;
  addRatingForPartnerForm: FormGroup;
  addRatingForClientForm: FormGroup;
  uuidValue: any;
  selectedProject;
  projectId;
  partnerId;
  partnerName;
  partnerDialogObject;
  acceptJobForm: FormGroup;
  rejectJobForm: FormGroup;
  deliverJobForm: FormGroup;
  cancelJobForm: FormGroup;
  withdrawJobForm: FormGroup;
  clientAddCommentForm: FormGroup;
  finishProjectFrom: FormGroup;
  rejectProjectForm: FormGroup;
  rejectEditingProjectForm: FormGroup;
  showRejectForm: boolean = false;
  showFinishBoxSuccess = false;
  deliverJobSuccess = false;
  showProjectPartnerMessage: boolean = false;
  partnerNumOfCompletedJobs;
  partnerNumOfRejectedJobs;
  partnerRatingAverage;
  loggedUserType;
  commentForJob;
  showdeliverBox = false;
  showRequetsEditsForm = false;
  showLoader = false;
  helpfulLinks;
  clientId;
  showRateFail = false;
  showRateSuccess = false;
  showMessages = false;
  content = '';
  projectIdShoot;
  projectDocument;
  projectTitle;
  status;
  actionErrorMessage = false;
  projectDataNotExist = false;
  userNameInAdminDialog;
  showDeadLine = false;
  userNumOfCompletedJobsInAdminDialog;
  userNumOfRejectedJobsInAdminDialog;
  userRatingAverageInAdminDialog;
  showPartnerName = false;
  allPurposals;
  math = Math;
  cancelpurposalMode = false;
  purposaltocanel;
  cancelSuccess = false;
  cancelFail = false;
  showRatingDialog = false;
  showFinishRatingDialog = false;
  allJobRatings;
  singlerating;
  showPartnerRatingDialog = false;
  remainingDays;
  remainingHours;
localTime;
localTimeConverted:any;
  constructor(private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private userServ: UserService, private actroute: ActivatedRoute) { }

  ngOnInit(): void {
this.getTime()
    // console.log("project id is === ");
    // console.log(this.actroute.snapshot.params["id"]);
    this.projectIdShoot = this.actroute.snapshot.params["id"];
    this.projectId = this.projectIdShoot;
    this.loggedUserType = localStorage.getItem("sessionUserType");
    this.acceptJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      status: new FormControl("inprogress"),
      partnerId: new FormControl(null)

    })
    this.rejectJobForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      partnerId: new FormControl(null),
      status: new FormControl("rejected"),
      rejectionReason: new FormControl(null, Validators.required)

    })
    this.rejectEditingProjectForm = new FormGroup({
      clinetId: new FormControl(localStorage.getItem("clientId")),
      status: new FormControl("rejected"),
      rejectionReason: new FormControl(null, Validators.required)

    })


    this.deliverJobForm = new FormGroup({
      status: new FormControl("reviewing"),
      document: new FormControl(null)

    })

    this.cancelJobForm = new FormGroup({
      status: new FormControl("canceled"),

    })
    this.withdrawJobForm = new FormGroup({
      status: new FormControl("withdrawn"),

    })
    this.finishProjectFrom = new FormGroup({
      status: new FormControl("completed")
    })

    this.rejectProjectForm = new FormGroup({
      status: new FormControl("rejected")
    })

    this.uuidValue = this.Uuid.generateUUID();
    // this.projectSev.selectedPoject.subscribe(
    //   (result) => {
    //     this.selectedProject = result;
    //     this.projectId = result._id;
    //     this.partnerId = result.partnerId;
    //     this.clientId = result.clientId;
    //     this.tags = result.projectTags;
    //     this.helpfulLinks = result.helpfulLinks;
    //   }
    // )
    // console.log("this.projectIdShoot");
    // console.log(this.projectIdShoot);

    this.getProjectData(this.projectIdShoot);
    this.getAllPurposals()
    this.getComments();


    this.addRatingForPartnerForm = new FormGroup({
      profileId: new FormControl(this.clientId),
      firstName: new FormControl(localStorage.getItem("sessionFirstName")),
      lastName: new FormControl(localStorage.getItem("sessionLastName")),
      rate: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      jobId: new FormControl(this.projectId)
    })

    this.addRatingForClientForm = new FormGroup({
      profileId: new FormControl(this.partnerId),
      firstName: new FormControl(localStorage.getItem("sessionFirstName")),
      lastName: new FormControl(localStorage.getItem("sessionLastName")),
      rate: new FormControl(null, Validators.required),
      comment: new FormControl(null, Validators.required),
      jobId: new FormControl(this.projectId)
    })






    this.clientAddCommentForm = new FormGroup({
      jobId: new FormControl(this.projectId),
      message: new FormGroup({
        profileId: new FormControl(localStorage.getItem("userId")),
        firstName: new FormControl(localStorage.getItem("sessionFirstName")),
        lastName: new FormControl(localStorage.getItem("sessionLastName")),
        content: new FormControl(null)
      })

    })

  }


  logStepValue(status: string) {
    if (status == 'active') {
      this.showApplyBoxFail = true;
      this.showApplyBoxSuccess = false;
    }
    else {

      this.userServ.getOneProfileData(this.partnerId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.partnerName = response.data.userName;
          console.log("partner for this project data ====== ");
          console.log(response.data);
          this.partnerDialogObject = response.data;


        }
      )
      this.showApplyBoxFail = false;
      this.showApplyBoxSuccess = true;




    }

  }

  showPartnerData() {
    // console.log("this.partnerId");
    // console.log(this.partnerId);




    this.userServ.getOneProfileData(this.partnerId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.partnerName = response.data.userName;
        // console.log("partner for this project data ====== ");
        // console.log(response.data);
        this.partnerDialogObject = response.data;
        this.partnerNumOfCompletedJobs = response.data.numOfCompletedJobs;
        this.partnerNumOfRejectedJobs = response.data.numOfRejectedJobs;
        this.partnerRatingAverage = response.data.ratingAverage;



      },
      err => {
        console.log(err);

      }
    )







  }
  acceptPartner(partnerId) {
    this.acceptJobForm.get("partnerId").setValue(partnerId);
    this.actionErrorMessage = false;
    console.log(this.acceptJobForm.value)


    this.projectSev.editJob(this.acceptJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم قبول الكاتب");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )

  }

  rejectPartner() {
    console.log(this.rejectJobForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.rejectJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم رفض الكاتب");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }
  rejectEditPartner() {
    console.log(this.rejectEditingProjectForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.rejectEditingProjectForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم رفض الكاتب");
        console.log(response)
        this.route.navigate(['/myProjects']);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }
  showReject() {
    this.showRejectForm = true;
  }
  addRateForPartner() {
    this.addRatingForPartnerForm.get("jobId").setValue(this.projectId)
    this.addRatingForPartnerForm.get("profileId").setValue(this.clientId)
    this.showLoader = true;
    console.log(this.addRatingForPartnerForm.value)
    this.userServ.addRating(this.addRatingForPartnerForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        this.showPartnerRatingDialog = false;
        this.showFinishRatingDialog = true;
        this.addRatingForPartnerForm.reset()



      },
      err => {
        this.showLoader = false;

        console.log(err);
        this.showRateFail = true;

      }
    )

  }
  addRateForClient() {



    this.showLoader = true;
    console.log(this.addRatingForClientForm.value)
    this.userServ.addRating(this.addRatingForClientForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        console.log("rate added successfully");
        this.showRatingDialog = false;
        this.showFinishRatingDialog = true;
        this.addRatingForClientForm.reset()



      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showRateFail = true;
      }
    )

  }

  addComment() {
    console.log("comment object ==== ");
    console.log(this.clientAddCommentForm.value);

    this.actionErrorMessage = false;
    this.userServ.addComment(this.clientAddCommentForm.value, localStorage.getItem("sessionUserType"), this.uuidValue + "fheossss", localStorage.getItem("auth")).subscribe(
      (response) => {
        console.log("comment added successfully");
        console.log(response);
        this.ngOnInit()

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )


  }
  getComments() {
    this.userServ.getComment(this.projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("comments for job ==== ");
        // console.log(response);

        // console.log(response);
        // console.log(response.data.body.data[0].message);
        if (response.data.body.data == null || response.data.body.data == "") {
          // console.log("comments is empty");
          this.showMessages = false;

        }
        else {
          this.showMessages = true;
          this.commentForJob = response.data.body.data[0].message;
        }




      },
      err => {
        console.log("no comments exist for this project");
        console.log(err);
        this.showMessages = false;


      }
    )

  }



  // getComments() {
  //   this.userServ.getComment("60032edbda8fea565543daaa","client","185acb4b-38e0-4afc-a025-c8794c8a43a3","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZmY2NWU0OGNlNzRkNTNkOTg1MzMwZmEiLCJpYXQiOjE2MTA4NDY5MTIuMTU0LCJzdWIiOiJ0YXp3ZWVkfDc3IiwiZXhwIjoxNjEwOTMzMzEyLjE1NH0.VTCdXVMMuAVAbzbSm9CJLRtP7iYS08_yo-rQllmJW0E").subscribe(
  //     (response: any) => {
  //       console.log("comments for job ==== ");
  //       console.log(response);
  //       this.commentForJob = response;


  //     },
  //     err => {
  //       console.log("no comments exist for this project");
  //       console.log(err);


  //     }
  //   )

  // }


  deliverProjectForClient() {
    this.showdeliverBox = true;
  }
  deliverJob() {
    // this.deliverJobForm.get("document").setValue(this.content);
    console.log(this.deliverJobForm.value);

    this.actionErrorMessage = false;
    this.projectSev.editJob(this.deliverJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        console.log("تم نسليم المشروع");
        console.log(response)
        this.deliverJobSuccess = true;
        setTimeout(() => {
          this.deliverJobSuccess = false;
          this.route.navigate(['/myProjects']);

        }, 2500);


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )

  }


  completeProject() {
    // jobId:new FormControl(this.projectId
    this.addRatingForClientForm.get("jobId").setValue(this.projectId)
    this.addRatingForClientForm.get("profileId").setValue(this.partnerId)
    console.log(this.finishProjectFrom.value);

    this.actionErrorMessage = false;
    // this.showRatingDialog = true;
    this.projectSev.editJob(this.finishProjectFrom.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.showRatingDialog = true;


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;


      }
    )



  }

  closeRatingDialog() {
    this.showRatingDialog = false;
    // this.ngOnInit()
  }
  closePartnerRatingDialog() {
    this.showPartnerRatingDialog = false;
  }
  rejectProject() {
    this.showRequetsEditsForm = true;
    // console.log(this.rejectProjectForm.value);
    // this.projectSev.editJob(this.rejectProjectForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
    //   (response: any) => {
    //     console.log("تم نسليم المشروع");
    //     console.log(response)
    //     this.route.navigate(['/myProjects']);

    //   },
    //   err => {
    //     console.log("something went wrong");
    //     console.log(err);


    //   }



  }

  showReviewBox() {
    this.showFinishBoxSuccess = true;
  }

  Export2Doc(element, filename = '') {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body style='direction:rtl'>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById(element).innerText + postHtml;

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html)

    filename = filename ? filename + '.doc' : 'document.doc';

    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      downloadLink.href = url;

      downloadLink.download = filename;

      downloadLink.click();
    }

    document.body.removeChild(downloadLink);


  }

  closeDialog() {
    this.showProjectPartnerMessage = false;
  }
  closeRateFailDlg() {
    this.showRateFail = false;
  }
  closeRateSuccessDlg() {
    this.showRateSuccess = false;
  }




  getProjectData(projectId) {
    this.userServ.getOneProject(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {

        console.log(response);


        this.selectedProject = response.data;
        this.projectDocument = response.data.document;
        this.projectTitle = response.data.projectTitle;
        this.partnerId = response.data.partnerId;
        this.clientId = response.data.clientId;
        // const birthday = new Date(response.data.completedDate);
        // console.log("completedDate");
        //2021-08-05T20:15:29.471Z
        // console.log(birthday.toLocaleString());

       
        if (response.data.status == "completed") {

          if (this.loggedUserType == "client") {
            // alert("completed and client")
            // console.log("this.partnerId");
            // console.log(this.partnerId);
            this.getJobRatings(this.partnerId);
          }
          else {
            // alert("completed and partner")
            // console.log("this.clientId");
            // console.log(this.clientId);
            this.getJobRatings(this.clientId);
          }

        }

        if (this.partnerId == undefined) {
          this.showPartnerName = false;
        }
        else {
          // alert("partner id " + this.partnerId)

          this.showPartnerName = true;
          this.showPartnerData();

        }
        // console.log("this.selectedProject");
        // console.log(this.selectedProject);
        // console.log(this.partnerId);
        this.addRatingForPartnerForm.get("profileId").setValue(this.partnerId)

        if (this.partnerId == null || this.partnerId == 'undefined') {

        }
        else {
          this.showPartnerData();
        }
        if (response.data.status == "inprogress" || response.data.status == "rejected" ||response.data.status == "reviewing" ) {
          this.showDeadLine = true;
          this.calculateHours()
          
          
        }

        this.clientId = response.data.clientId;
        this.tags = response.data.projectTags;
        this.helpfulLinks = response.data.helpfulLinks;

      },
      err => {
        console.log("error in get job by id");
        console.log(err);

        this.projectDataNotExist = true;



      }
    )


  }
  closeActionError() {
    this.actionErrorMessage = false;
  }



  cancelJob() {
    console.log(this.cancelJobForm.value);
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.cancelJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {
        this.cancelJobMessageP = true;

        setTimeout(() => {
          this.route.navigate(['/myProjects']);
        }, 3000);


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }


  withdrawJob() {
    // console.log(this.withdrawJobForm.value);
    this.withdrowJobMessage = false;
    this.actionErrorMessage = false;
    this.projectSev.editJob(this.withdrawJobForm.value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {

        this.withdrowJobMessage = true;

        setTimeout(() => {
          this.route.navigate(['/myProjects']);
        }, 3000);


      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.actionErrorMessage = true;
      }
    )

  }

  openWithDrawDialog() {
    this.showWhthdrawDlg = true;
  }

  closeWithDrawDialog() {
    this.showWhthdrawDlg = false;
  }
  closecancelDialog() {
    this.cancelJobMessage = false;
  }
  openCancelJobDLG() {
    this.showCanceljobConfirm = true;
  }

  closeCancelJobDialogM() {
    this.showCanceljobConfirm = false;
  }

  showUserDataDialog(userId) {
    this.showUserData = true;
    this.idToShow = userId;
    this.showPartnerDataForAdmin(this.idToShow);
  }

  previewProfileData(userId) {
    this.route.navigate(["previewProfileDataByAdmin/" + userId]);
  }

  closeUserDataDlg() {
    this.showUserData = false;

  }



  showPartnerDataForAdmin(userId) {
    // console.log("this.partnerId");
    // console.log(this.partnerId);




    this.userServ.getOneProfileData(userId, "partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {




        console.log("general data for this project data ====== ");
        console.log(response.data);
        this.userNameInAdminDialog = response.data.userName;
        this.userNumOfCompletedJobsInAdminDialog = response.data.numOfCompletedJobs;
        this.userNumOfRejectedJobsInAdminDialog = response.data.numOfRejectedJobs;
        this.userRatingAverageInAdminDialog = response.data.ratingAverage;





      },
      err => {
        console.log(err);

      }
    )







  }



  getAllPurposals() {


    this.projectSev.getJobPurposals(this.projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        console.log(" all job purposals ");
        console.log(response);

        this.allPurposals = response.data

      },
      err => {
        console.log("something went wrong");
        console.log(err);

      }
    )


  }

  openCancelPurposalDialog(purposal) {
    // this.cancelSuccess = false;
    this.cancelFail = false;
    this.cancelpurposalMode = false;
    // this.cancelpurposalMode = true;
    this.purposaltocanel = purposal;
    // console.log("purposaltocanel");
    // console.log(this.purposaltocanel);
    this.projectSev.deletePurposal(this.purposaltocanel, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        //  this.cancelSuccess = true;

        // setTimeout(() => {
        //   this.cancelSuccess = false;
        // }, 1500);
        this.ngOnInit()
        // setTimeout(() => {
        //   this.cancelpurposalMode = false;
        //   this.ngOnInit()
        // }, 2000);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cancelpurposalMode = true;
        this.cancelFail = true;

      }
    )




  }
  closeCancelPurposalDialog() {
    this.cancelpurposalMode = false;

  }
  confirmCancelPurposal() {
    //(purposalId, customerType: string, X_Request_ID: string, token)
    this.projectSev.deletePurposal(this.purposaltocanel, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {

        this.cancelSuccess = true;

        setTimeout(() => {
          this.cancelSuccess = false;
        }, 1500);

        setTimeout(() => {
          this.cancelpurposalMode = false;
          this.ngOnInit()
        }, 2000);

      },
      err => {
        console.log("something went wrong");
        console.log(err);
        this.cancelFail = true;

      }
    )


  }


  rejectPurposal(purposalId) {
    this.projectSev.editPurposal({ status: "rejected" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), purposalId).subscribe(
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

  closeFinishRatingDialog() {
    this.showFinishRatingDialog = false;
    this.ngOnInit()
  }



  getJobRatings(profileId) {


    this.projectSev.getProjectRatings(profileId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
      (response: any) => {

        console.log(" all job ratings ");
        console.log(response);

        this.allJobRatings = response.data
        this.singlerating = response.data[0]
        // console.log(this.allJobRatings);
        // console.log(this.singlerating);
        
        if (this.allJobRatings.length == 0) {
          

          if(this.loggedUserType == "client"){
            this.showRatingDialog = true;
            this.addRatingForClientForm.get("jobId").setValue(this.projectId)
            this.addRatingForClientForm.get("profileId").setValue(this.partnerId)
          }
          else{
            this.showPartnerRatingDialog = true;
            this.addRatingForPartnerForm.get("jobId").setValue(this.projectId)
            this.addRatingForPartnerForm.get("profileId").setValue(this.clientId)
          }
          
          
        }

      },
      err => {
        console.log("something went wrong");
        console.log(err);

      }
    )


  }

  getTime(){
    this.userServ.getTime().subscribe(
      (response:any)=>{
        this.localTime = response.currentTiem;
        console.log("time ----");
        // console.log(this.localTime);
        const timeNow = new Date(this.localTime)
  
        // console.log(timeNow.getTime());
        this.localTimeConverted = timeNow.getTime();
        // const now = new Date().getTime();
        
        
      },
      err=>{
        // console.log(err);
        
      }
    )
  }
  calculateHours(){

  //  console.log(timeDiffCalc(new Date('2019/10/1 04:10:00'), new Date('2019/10/2 18:20:00')));

    // const now = new Date().getTime();
    const now = this.localTimeConverted;
    console.log("now");
    console.log(this.localTimeConverted);
     const countDownDate = new Date(this.selectedProject.completedDate).getTime();
     let diffInMilliSeconds = Math.abs(countDownDate - now) / 1000;
     const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    // console.log('calculated hours', hours);
    //  console.log("complete date ");
     
    // console.log(countDownDate);



var timeleft = countDownDate - now;
    
const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
// const hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);


// const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
//     diffInMilliSeconds -= hours * 3600;
//     console.log('calculated hours', hours);

this.remainingDays = days;
this.remainingDays = +this.remainingDays
if(this.remainingDays <0){
  this.showDeadLine = false;
}
this.remainingHours = hours;
// console.log("complete date in days ");
     
// console.log(days);
    
  }



  //  timeDiffCalc(dateFuture, dateNow) {
  //   let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;


  //   const days = Math.floor(diffInMilliSeconds / 86400);
  //   diffInMilliSeconds -= days * 86400;
  //   console.log('calculated days', days);


  //   const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  //   diffInMilliSeconds -= hours * 3600;
  //   console.log('calculated hours', hours);


  //   const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  //   diffInMilliSeconds -= minutes * 60;
  //   console.log('minutes', minutes);

  //   let difference = '';
  //   if (days > 0) {
  //     difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  //   }

  //   difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

  //   difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

  //   return difference;
  // }




}
