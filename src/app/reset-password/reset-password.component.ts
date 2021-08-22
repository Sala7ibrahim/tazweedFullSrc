import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
import { faEye,faEyeSlash,faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit { 
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  resetPasswordForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean; 
  errorDetails:string;
  uuidValue:any;
  showLoader = false;
  constructor(private userServ: UserService, private Uuid: UUIDService) { }

  ngOnInit(): void {
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.resetPasswordForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email])
    });
  }
  resetPassword(){
    this.showLoader = true;
    console.log(this.resetPasswordForm.value);
    this.userServ.resetPassword(this.resetPasswordForm.value,localStorage.getItem("resetPasswordUserType"),this.uuidValue).subscribe(
      (response)=>{
        console.log("open you mail to complete reset password");
        console.log(response);
        this.showLoader = false;
        this.showSuccessMessage = true;
        
      },
      err=>{
        this.showLoader = false;
        console.log(err); 
        this.showFailMessage = true;
        
      }
    )
    
  }

  showPassword(id){
    document.getElementById(id).setAttribute("type","text");
    this.showPasswordIcon = false;
    this.hidePasswordIcon = true;
  }
  hidePassword(id){
    document.getElementById(id).setAttribute("type","password");
    this.showPasswordIcon = true;
    this.hidePasswordIcon = false;
  }
}
