import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-confirm-reset-password',
  templateUrl: './confirm-reset-password.component.html',
  styleUrls: ['./confirm-reset-password.component.css']
})
export class ConfirmResetPasswordComponent implements OnInit {
  userTypeInUrl: string;
  mailInUrl:string;
  token;
  showEditSuccessMessage:boolean = false;
  showPasswordMatchError:boolean = false;
  showResetPasswordMessage:boolean = false;
  resetPasswordForm:FormGroup;
  showResetPasswordMessageFail = false;
  uuidValue: any;
  showLoader = false;
  isTypical = false;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private Uuid: UUIDService,
    private userServ:UserService
    ) { } 
  confirmResetPasswordUserType;
  ngOnInit(): void {
    console.log("user type ==== " + this.userTypeInUrl); 
    this.router.queryParams.subscribe(params => {
      this.userTypeInUrl = params['customerType'];
      this.mailInUrl = params['email'];
      this.token = params['token'];
      console.log("token ==== " + this.token); 
    });
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);

    // reset passwrd form
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(this.mailInUrl),
      newPassword: new FormControl(null,Validators.required),
      reNewPassword:new FormControl(null,Validators.required),
      token:new FormControl(this.token)
    })
  }

 
  closeDialog(){
    this.showEditSuccessMessage = false;
    // this.ngOnInit();
  }

  resetPassword(){
    this.showLoader = true;
    this.showPasswordMatchError = false;
    console.log(this.resetPasswordForm.value);
    if(this.resetPasswordForm.get("newPassword").value!=this.resetPasswordForm.get("reNewPassword").value){
      this.showLoader = false;
      this.showPasswordMatchError = true;
      
    }
    else{
      this.isTypical = true;
      this.showPasswordMatchError = false;
      this.userServ.resetPasswordInProfile(this.resetPasswordForm.value,this.userTypeInUrl,this.uuidValue).subscribe(
        (response)=>{
          this.showLoader = false;
          console.log("password reseted successfully");
          console.log(response);
          this.showResetPasswordMessage = true;
          setTimeout(() => {
            this.route.navigate(["/login"])
          }, 1500);
          
          
          
        },
        err=>{
          this.showLoader = false;
          console.log("something went wrong in reseting password");
          console.log(err);
          this.showResetPasswordMessage = false;
          this.showResetPasswordMessageFail = true;
          
          
        }
      )
    }
    
  }
  closeDialogfail(){
    this.showResetPasswordMessageFail = false;
  }

}
