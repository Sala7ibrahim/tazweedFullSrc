import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
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
  adminRole;
  takeActionsPrivilage = false;
  addprivilage = false;
  constructor(private route:Router) { }

  ngOnInit(): void {
    this.adminRole = localStorage.getItem("adminRole");
    if(this.adminRole=='manager'){
      this.takeActionsPrivilage = true;
      this.addprivilage = false;
    }
    else  if(this.adminRole=='supervisor'){
      this.takeActionsPrivilage = false;
      this.addprivilage = false;
    }
    else{
      this.takeActionsPrivilage = true;
      this.addprivilage = true;
    }
  }


  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
  }

}
