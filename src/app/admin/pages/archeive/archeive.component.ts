import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-archeive',
  templateUrl: './archeive.component.html',
  styleUrls: ['./archeive.component.css']
})
export class ArcheiveComponent implements OnInit {
  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;

  showLoader = false;
  allJobTypes;
  allPromoCodes;
  showAddCupon = false;
  addCuponSuccess = false;
  addCuponFail = false;
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
  adminStatistics: any;
  sessionUserType;
  numberOfPartners;
  numberOfClients;
  numberOfRecentPartners;
  numberOfActiveJobs;
  numberOfDoneJobs;
  numberOfMessages;
  profits = 0;
  visitors;
  allPrtners;
  allClients;
  showActiveConfirmMessage = false;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  itemToEdit;
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  unpaidBalance;
  showPayDialog = false;
  itemToPay;
  showPaySuccess = false;
  showPayFail = false;
  showsendAllSuccess = false;
  showsendAllFail = false;
  messageReceiverName;
  messageReceiverNames = [];
  allJobsAdmin;
  expiredJobs;
  prePaymentStatusArray = [];
  activeStatusArray = [];
  pendingStatusArray = [];
  inprogressStatusArray = [];
  reviewingStatusArray = [];
  completedStatusArray = [];
  rejectedStatusArray = [];
  expiredStatusArray = [];
  projectConfig;
  mainprojectConfig;
  addCuponForm: FormGroup;
  showDeleteDialog = false;
  deleteSuccess = false;
  deleteFail = false;
  promoToDelete;
  allArcheivedProjects;
  // editConfigForm:FormGroup;
  archieveMode = false;
  projectToArchive;
  editedAmount;
  showEmailField = false;
  selectedPromoCodeId;
  selectedPromoCode;
  showOnePromoCodeDialog = false;
  deleteprojectMode = false;
  projectToDelete;
  adminRole;
  takeActionsPrivilage = false;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
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




    this.getAllArcheivedJobs()

  }


  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["/dashboard/acceptPartnerByAdmin/" + project._id]);
  }

  previewProfileData(user) {
    this.userServ.selectedUser.next(user)
    this.route.navigate(["previewProfileData/" + user._id]);
  }


  getAllArcheivedJobs() {

    this.projectServ.getArcheivedProjectsForAdmin("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all archived jobs object ---------------------- ");

        console.log(response.data);
        this.allArcheivedProjects = response.data
        this.showLoader = false;


      },
      err => {
        console.log(err);
        this.showLoader = false;

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

  closeDeleteDialog() {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.showDeleteDialog = false;
  }

  showArchiveDialog(project) {
    this.projectToArchive = project;
    this.archieveMode = true;
  }

  closeArchiveDialog() {
    this.archieveMode = false;
  }


  showDeleteprojectDialog(project) {
    this.projectToDelete = project;
    this.deleteprojectMode = true;

    console.log("you will delete project with id ");
    console.log(JSON.stringify(this.projectToDelete));

    console.log(this.projectToDelete._id);
  }
  closeDeleteprojectDialog() {
    this.deleteprojectMode = false;
  }

  deleteProject() {


    this.showLoader = true;

    this.projectServ.deketeProject(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), "article", localStorage.getItem("email"), this.projectToDelete._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteprojectMode = false;
        }, 1500);

        this.getAllArcheivedJobs()



      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )

  }



}
