import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { faEye, faEyeSlash, faExclamationTriangle, faEdit,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faEye = faEye;
  showLoader = false;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faExclamationTriangle = faExclamationTriangle;
  faEdit = faEdit;
  showPasswordIcon: boolean = true;
  hidePasswordIcon: boolean = false;
  loginForm: FormGroup;
  uuidValue: any;
  failedLogin;
  showFailed = false;
  registerNewLine: boolean = true;
  sessionUserStatus;
  activeTabType = "client";
  checkMailMessage = false;
  constructor(private route: Router, private userServ: UserService, private Uuid: UUIDService, private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // console.log("-----------------------------");

    this.activRoute.queryParams.subscribe(params => {
      this.activeTabType = params['customerType'];
      // console.log("tab active will be to " + this.activeTabType);

    });
    if (localStorage.getItem("isRegistered")) {
      this.registerNewLine = false;
    }
    else {
      this.registerNewLine = true;
    }
    this.uuidValue = this.Uuid.generateUUID();
    this.loginForm = new FormGroup({
      "email": new FormControl(null, [Validators.required, Validators.email]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(8)]),
      "rememberMe": new FormControl(false)
    });
  }

  // login method start
  login(userType: string) {

    this.checkMailMessage = false;
    this.showFailed = false;
    this.showLoader = true;
    if (localStorage.getItem("sessionUserType")) {
      this.userServ.signIn(this.loginForm.value, userType, this.uuidValue).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("login method 111111");
          console.log(response);
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("sessionUserType", userType);
          localStorage.setItem("userId", response.data.profileId);
          this.getUserData(response.data.profileId);
          if (userType === 'partner') {
            localStorage.setItem("partnerId", response.data.profileId);
            this.route.navigate(["allProjects"]);
          }
          else {
            localStorage.setItem("clientId", response.data.profileId);
            this.route.navigate(["myProjects"]);
          }

          localStorage.setItem("email", response.data.email);

        },
        err => {
          this.showLoader = false;
          this.showFailed = true;
          this.failedLogin = err;
          console.log(err);
          if(err.error.code=='44'){
            this.checkMailMessage = true;
          }
          

        }
      )


    }
    else {
      this.showLoader = true;
      this.userServ.signIn(this.loginForm.value, userType, this.uuidValue).subscribe(
        (response: any) => {
          console.log("login response");
          console.log(response);
          localStorage.setItem("userId", response.data.profileId);
          this.showLoader = false;
          localStorage.setItem("auth", response.data.token);
          localStorage.setItem("sessionUserType", userType);
          this.getUserData(response.data.profileId);





          if (userType === 'partner') {
            localStorage.setItem("partnerId", response.data.profileId);
            this.route.navigate(["allProjects"]);
          }
          else {
            localStorage.setItem("clientId", response.data.profileId);
            this.route.navigate(["myProjects"]);
          }

          localStorage.setItem("email", response.data.email);

        },
        err => {
          this.showLoader = false;
          
          console.log(err);
          if(err.error.code=='44'){
            this.checkMailMessage = true;
          }
          else{
            this.showFailed = true;
            this.failedLogin = err;
          }

        }
      )
    }

  
  }

  showPassword(id) {
    document.getElementById(id).setAttribute("type", "text");
    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
  }
  hidePassword(id) {
    document.getElementById(id).setAttribute("type", "password");
    this.showPasswordIcon = true;
    this.hidePasswordIcon = false;
  }

  resetPassword(userType) {
    // console.log("you will reset password for user of type " + userType);
    localStorage.setItem("resetPasswordUserType", userType);
    this.route.navigate(["/resetPassword"]);

  }

  getUserData(profileId) {
    this.userServ.getOneProfileData(profileId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("user profile data is ============");
        this.sessionUserStatus = response.data.status;
        console.log(response);
        if (this.sessionUserStatus == "active") {
          this.userServ.activeAccount.next(true);
        }
        else {
          this.userServ.activeAccount.next(false);
        }

        localStorage.setItem("sessionUserStatus", this.sessionUserStatus);

      },
      err => {
        console.log(err);

      }
    )
  }

  closeError(){
    this.showFailed = false;
  }

  closeErrorActiviate(){
    this.checkMailMessage = false;
  }

}
