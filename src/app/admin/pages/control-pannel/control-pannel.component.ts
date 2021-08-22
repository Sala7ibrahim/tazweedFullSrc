import { Component, OnInit } from '@angular/core';
import { faUserAlt, faUserTie,faFolderOpen,faCheck,faEnvelope,faChartBar,faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
@Component({
  selector: 'app-control-pannel',
  templateUrl: './control-pannel.component.html',
  styleUrls: ['./control-pannel.component.css']
})
export class ControlPannelComponent implements OnInit {
  faUserAlt = faUserAlt;
  faCheck = faCheck;
  faChartBar = faChartBar;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;

  uuidValue: any;
  math = Math;
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
  showLoader = false;
  showVisitors;
  adminRole;
  isManager= false;
  isSupervisor = false;
  showProfits = false;
  showCompletedJobs = false;
  constructor(private Uuid: UUIDService,private userServ: UserService) { }
 
  ngOnInit(): void {

    this.adminRole = localStorage.getItem("adminRole");
    if(this.adminRole=='manager'){
      this.isManager = true;
      this.isSupervisor = false;
      this.showVisitors = false;
      this.showProfits = false;
      this.showCompletedJobs = true;
    }
    else  if(this.adminRole=='supervisor'){
      this.isManager = false;
      this.isSupervisor = true;
      this.showVisitors = false;
      this.showProfits = false;
      this.showCompletedJobs = false;
    }
    else{
      this.showVisitors = true;
      this.showProfits = true;
      this.showCompletedJobs = true;
    }


    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.userServ.getStatistics("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("statistics ======");

        // console.log(response);
        this.adminStatistics = response.data;
        this.numberOfPartners = response.data.numberOfPartners;
        this.numberOfClients = response.data.numberOfClients;
        this.numberOfRecentPartners = response.data.numberOfRecentPartners;
        this.numberOfActiveJobs = response.data.numberOfActiveJobs;
        this.numberOfDoneJobs = response.data.numberOfDoneJobs;
        this.numberOfMessages = response.data.numberOfMessages;
        this.profits = response.data.profits;
        this.visitors = response.data.visitorsNumber;
        this.showLoader = false;

      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }

}
