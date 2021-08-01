import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faTimes, faTrashAlt, faFileAlt, faHourglassHalf, faMoneyBillWave, faArrowLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.css']
})
export class CartMainComponent implements OnInit {
  uuidValue: any;
  allCartProjects;
  faFileAlt = faFileAlt;
  faTrashAlt = faTrashAlt;
  faHourglassHalf = faHourglassHalf;
  faTimes = faTimes;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  faFolderOpen = faFolderOpen;
  showProjectsContainer = false;
  showNoProjectsContainer = false;
  userStatus;
  showProjects = true;
  showLoaderMaster = false;
  paymentUrl;
  projectsCount = 0;
  deleteprojectMode = false;
  projectToDelete;
  showLoader = false;
  deleteSuccess = false;
  deleteFail = false;
  allCartProjectsIds = [];
  allAdditionalArray = [];
  allAdditionalCost = 0;
  allCostArray = [];
  allCost = 0;
  allFinalTotal = 0;
  constructor(
    private projectServ: ManageProjectService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
 

  
    this.getAllCartProjects();
  }

//localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("userId")

  getAllCartProjects() {
    this.projectServ.getAllCartProjectsNew("client",this.uuidValue,localStorage.getItem("auth"),localStorage.getItem("userId")).subscribe(
      (response: any) => {
        this.showLoader = false;
        console.log("all cart projects");
        console.log(response);


        // if(response.data.body.data ==null){

        // }
        // else{
        this.allCartProjects = response.data;
        if (this.allCartProjects.length == 0) {
          this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;
        }
        else {
          this.showProjectsContainer = true;
          this.showNoProjectsContainer = false;
          this.projectsCount = this.allCartProjects.length;
          this.allCartProjects.sort((a, b) => {
            return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
          });

          this.calculateTotal()


        }
        // for (const project of this.allCartProjects) {
        //   this.allCostArray.push(project.totalCost)
        //   this.allCartProjectsIds.push(project._id)
        //   if(project.addtionalAmount || project.addtionalAmount!=null || project.addtionalAmount !=undefined){
        //     this.allAdditionalArray.push(project.addtionalAmount);
        //   }

        // }

        // console.log("this.allAdditionalArray ");
        // console.log(this.allAdditionalArray);

        // this.allAdditionalCost = this.allAdditionalArray.reduce(
        //   (current , sum)=>{
        //     return current + sum;
        //   }
        // )

        // this.allCost =  this.allCostArray.reduce(
        //   (current , sum)=>{
        //     return current + sum;
        //   }
        // )
        // this.allFinalTotal = this.allCost - this.allAdditionalCost;
        // console.log("this.allCost ");
        // console.log(this.allCost);






      },
      err => {
        console.log("something went wrong");
        console.log(err)
        this.showProjectsContainer = false;
        this.showNoProjectsContainer = true;

      }
    )
  }


  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/" + project._id]);
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


  repayAllProject() {
    console.log("this.allCartProjectsIds");
    console.log(this.allCartProjectsIds);
    const prjectPrePayment = {
      "profileId": localStorage.getItem("userId"),
      "jobId": this.allCartProjectsIds
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


  showDeleteprojectDialog(project) {
    this.deleteSuccess = false;
    this.deleteFail = false;
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
        this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
          this.route.navigate(['/cart']);
          this.getAllCartProjects()
          // this.ngOnInit()




        });



      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )

  }


  calculateTotal() {

    this.allCostArray.length = 0;
    this.allCartProjectsIds.length = 0;
    // this.allAdditionalArray.length = 0;

    this.allAdditionalCost = 0;
    this.allCost = 0;
    this.allFinalTotal = 0;
    for (const project of this.allCartProjects) {
      this.allCostArray.push(project.totalCost)
      this.allCartProjectsIds.push(project._id)
      if (project.addtionalAmount || project.addtionalAmount != null || project.addtionalAmount != undefined) {
        this.allAdditionalArray.push(project.addtionalAmount);
      }

    }

    // console.log("this.allAdditionalArray ");
    // console.log(this.allAdditionalArray);

    // this.allAdditionalCost = this.allAdditionalArray.reduce(
    //   (current, sum) => {
    //     return current + sum;
    //   }
    // )

    this.allCost = this.allCostArray.reduce(
      (current, sum) => {
        return current + sum;
      }
    )
    this.allFinalTotal = this.allCost - this.allAdditionalCost;
    console.log("this.allCost ");
    console.log(this.allCost);

  }
}
