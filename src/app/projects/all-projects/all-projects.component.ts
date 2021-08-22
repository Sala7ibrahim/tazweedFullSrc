import { Component, OnInit } from '@angular/core';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { faSignOutAlt,faSearch, faFileAlt, faHourglassHalf, faMoneyBillWave, faArrowLeft, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { project } from 'src/app/Model/project';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  uuidValue: any;
  faSignOutAlt = faSignOutAlt;
  userImageBase;
  // allProjects:project[];
  allProjects;
  filterProjectForm:FormGroup;
  faFileAlt = faFileAlt;
  faHourglassHalf = faHourglassHalf;
  faMoneyBillWave = faMoneyBillWave;
  faArrowLeft = faArrowLeft;
  faFolderOpen = faFolderOpen;
  faSearch = faSearch;
  filteredStatus = '';
  checkValue;
  showProjectsContainer = false;
  showNoProjectsContainer = false;
  userStatus;
  showProjects=true;
  showErrorConnection = false;
  constructor(private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private imageServ: ManageImageService,private userServ:UserService) { }

  ngOnInit(): void {
    // localStorage.setItem("sessionUserStatus", this.sessionUserStatus);
    this.userServ.activeAccount.subscribe(
      (response)=>{
        // console.log("active account from service value is ==== " + response); 
        
        this.showProjects = response;
      },
      err=>{
        this.showErrorConnection = true;
      }
    )
    this.userStatus = localStorage.getItem("sessionUserStatus");
    if(this.userStatus =="active"){
      this.showProjects = true;
    }
    else{
      this.showProjects = false;

    }
    this.filterProjectForm = new FormGroup({
      filterSize:new FormControl(null)
    })
    this.uuidValue = this.Uuid.generateUUID();
    // this.userStatus = localStorage.getItem("sessionUserStatus");
    this.imageServ.profileImagePathShared.subscribe(
      (response) => {
        // console.log("user profile image exist");
        // console.log(response);
        this.userImageBase = response;

      },
      err => {
        console.log("error in get profile image from service");
        this.userImageBase = "default";

      }
    )
    
    // if(this.userStatus =="active"){
      this.getAllProjects();
    
    // }
    // else{
    //   console.log("error error error");
    //   // this.ngOnInit()
      
    // }



  }

  getAllProjects(){
    this.projectServ.getAllProjects(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.allProjects = response.data.body.data;
        this.allProjects.sort((a, b) => {
          return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
        });
        if (this.allProjects == "") {
          this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;

        }
        else{
          this.showProjectsContainer = true;
          this.showNoProjectsContainer = false;
        }


      },
      err => {
        console.log("something went wrong");
        console.log(err)
        this.showProjectsContainer = false;
          this.showNoProjectsContainer = true;

      }
    )
  }
  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }
  onCheckboxChange(event, valueReal) {
    console.log(event);
    if (event.target.checked) {
      console.log(valueReal.value);
      const checkValue = valueReal.value;


      if (checkValue == "") {
        this.ngOnInit()
      }

      if (checkValue == 1) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == 1;
          }
        )
      }
      if (checkValue == 2) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == 2;
          }
        )
      }
      if (checkValue == 3) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == 3;
          }
        )
      }
      if (checkValue == 1 && checkValue == 3) {
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == 1 && res.size == 3;
          }
        )
      }

      // else {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       // return (res.size).toString().match(this.filteredStatus.toString())
      //       return res.size ==1;
      //     }
      //   )
      // }

    }
    else {
      this.ngOnInit()
    }


  }
  searchWithFilter() {
    // if (this.allProjects.size == 1) { 
    //   this.allProjects.size = "مشروع قصير";
    // }
    // else if (this.allProjects.size == 2) {
    //   this.allProjects.size = "مشروع متوسط";
    // }
    // else if (this.allProjects.size == 3) {
    //   this.allProjects.size = "مشروع طويل";
    // }
    // else if (this.allProjects.size == 4) {
    //   this.allProjects.size = "مشروع غير محدد"; 
    // }
    if (this.filteredStatus == "") {
      this.ngOnInit()
    }
    else {
      this.allProjects = this.allProjects.filter(
        res => {
          return (res.projectTitle).toString().match(this.filteredStatus.toString())
          // return res.size == 1;
        }
      )
    }


  }
  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["projectSetails/" + project._id]);
  }

  onChangeSize(projectSize){
    // this.ngOnInit()
    // this.allProjects = this.allProjects
    console.log("filter size value =====");
    
    // console.log(this.filterProjectForm.get("filterSize").value);



     this.checkValue = this.filterProjectForm.get("filterSize").value;
    console.log(this.checkValue);

      if (this.checkValue == "") {
        this.ngOnInit()
      }
      else{
        this.allProjects = this.allProjects.filter(
          res => {
            return res.size == this.checkValue;
          }
        )
      }

      // if (checkValue == 1) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 1;
      //     }
      //   )
      // }
      // if (checkValue == 2) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 2;
      //     }
      //   )
      // }
      // if (checkValue == 3) {
      //   this.allProjects = this.allProjects.filter(
      //     res => {
      //       return res.size == 3;
      //     }
      //   )
      // }
    
  }
}
