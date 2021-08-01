import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
import{faPlus} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-site-services',
  templateUrl: './site-services.component.html',
  styleUrls: ['./site-services.component.css']
})
export class SiteServicesComponent implements OnInit {
  faPlus = faPlus;
  showPayFail = false;
  uuidValue: any;
  math = Math;
  showLoader = false;
  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  mainprojectConfig;
  projectConfig;
  adminRole;
  takeActionsPrivilage = false;
  constructor(
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
  )  { }

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
    this.getJobConfig();
  }


  getJobConfig() {
    this.projectServ.getConfigJopPublic().subscribe(
      (configResponse: any) => {
        // console.log("main job config");

        // console.log(configResponse);
        this.mainprojectConfig = configResponse.data[0]._id;
        this.projectConfig = configResponse.data[0].jobConfig;
        console.log("main config");

        console.log(this.projectConfig);

      },
      err => {
        this.showLoader = false;
        console.log("error in getting project configuration");
        console.log(err);

      }
    )

  }
  editJobConfig(size, amount, day1, day2, day3, config) {
    this.showLoader = true;
    // console.log(size.value);
    // console.log(amount.value);
    // console.log(day1.value);
    // console.log(day2.value);
    // console.log(day3.value);
    if (size.value < 0 || amount.value < 0 || day1.value < 0 || day2.value < 0 || day3.value < 0) {
      alert("price inputs must be positive numbers")
    }

    else {

      let editObj = {
        _id: config._id,
        id: config.id,
        name: config.name,
        amount: amount.value,
        size: size.value,
        day1: day1.value,
        day2: day2.value,
        day3: day3.value
      }
      console.log(editObj);
      this.projectServ.editConfig(editObj, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
        (response) => {
          this.showLoader = false;
          console.log("prices edited successfully");
          console.log(response);
          this.showEditSuccess = true;

          setTimeout(() => {
            this.showEditSuccess = false;
            
          }, 1500);
          // this.route.navigate(["/dashboard"])


        },
        err => {
          this.showLoader = false;
          this.showEditSuccess = false;
          this.showEditFail = true;
          console.log("error in update prices");
          console.log(err);


        }
      )
    }



  }

  closeSuccessDlg() {
    this.showEditSuccess = false;
    this.ngOnInit()
  }

  closeFailDlg() {
    this.showEditFail = false;


  }


}
