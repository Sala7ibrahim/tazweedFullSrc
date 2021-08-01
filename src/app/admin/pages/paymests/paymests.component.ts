import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-paymests',
  templateUrl: './paymests.component.html',
  styleUrls: ['./paymests.component.css']
})
export class PaymestsComponent implements OnInit {
  unpaidBalance;
  showPayDialog = false;
  itemToPay;
  showPaySuccess = false;
  showPayFail = false;
  uuidValue: any;
  math = Math;
  showLoader = false;
  showPayHistoryDialog = false;
  selectedPaymenthistory;
  projectDetailsMode = false;
  projectToShowId;
  projectToShow;
  adminRole;
  paymentActions;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
  ) { }
 
  ngOnInit(): void {

    this.adminRole = localStorage.getItem("adminRole");
    if(this.adminRole=='manager'){
      this.paymentActions = false;
    }
    else  if(this.adminRole=='supervisor'){
      this.paymentActions = false;
    }
    else{
      this.paymentActions = true;
    }
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getUnpaidBalance();
  }


  getUnpaidBalance() {
    this.userServ.getUnpaidBalance("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("unpaid balance response");
        console.log(response);
        this.unpaidBalance = response.data;
        this.showLoader = false;

      },
      err => {
        console.log(" no unpaid balance");
        this.showLoader = false;
        console.log(err);

      }


    )

  }

  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["/dashboard/acceptPartnerByAdmin/" + project._id]);
  }

  getPaymentHistory(partnerId) {
    this.userServ.getPartnerBalanceHistory(partnerId,"admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("payment history ");
        console.log(response);
        this.selectedPaymenthistory = response.data;
        // this.showLoader = false;

      },
      err => {
        console.log(" no payment history exist");
        console.log(err);

      }


    )

  }

  payForPartner(partnerId) {
    this.showLoader = true;
    this.userServ.updateUnpaidBalance({ "status": "paid" }, partnerId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        this.showPaySuccess = true;
        // setTimeout(() => {
        //   this.showPayDialog = false;
        // this.ngOnInit();
        // }, 2000);
        setTimeout(() => {
          this.showPayDialog = false;
          this.ngOnInit();

        }, 1500);

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showPaySuccess = false;
        this.showPayFail = true;

      }
    )
  }


  showPayDialoge(balance) {
    this.showPayDialog = true;
    this.itemToPay = balance;
    // console.log(balance._id.partnerId);

  }

  closePayDialog() {
    this.showPayDialog = false;
  }

  showPaymentHistoryDialog(partnerId){
    this.selectedPaymenthistory = null;
    this.showPayHistoryDialog = true;
    // this.selectedPaymenthistory = partnerId;
    this.getPaymentHistory(partnerId)
  }

  closePaymentHistoryDialog(){
    this.showPayHistoryDialog = false;
  }


  showProjectDetailsDialoge(projectId) {
    this.projectToShow = null;
    this.projectDetailsMode = true;
    this.projectToShowId = projectId;
    this.getProjectData(projectId);


  }
  
  closeProjectDetailsDialoge() {
    this.projectDetailsMode = false;
    this.projectToShowId = null;


  }


  getProjectData(projectId) {
    this.userServ.getOneProject(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
console.log("this.selectedProject");
console.log(response);

        this.projectToShow = response.data;
        // console.log("this.selectedProject");
        // console.log(this.selectedProject);
        // console.log(this.partnerId);




      },
      err => {
        console.log("error in get job by id");
        console.log(err);





      }
    )


  }



}
