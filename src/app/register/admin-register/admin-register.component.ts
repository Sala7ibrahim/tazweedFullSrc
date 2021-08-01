import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { UUIDService } from '../../services/uuid.service';
import { faEye,faEyeSlash,faCheckCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean;
  errorDetails:string;
  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService){ }
  uuidValue:any;
  userType:string="admin";

  ngOnInit(): void {
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndConditions: new FormControl(true,Validators.requiredTrue)
    });
    
  }
  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.registerForm.controls['attach'].setValue(upData); 
      }
    )
  }
  register() {
    console.log(this.registerForm.value); 
    this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
      (response:any) => {
        localStorage.clear();
        this.showFormSubmit = false;
        this.showFailMessage = false;
        this.showSuccessMessage = true;
        console.log("successfully registered ");
        console.log(response);
        localStorage.setItem("newUserId",response.data._id);
        localStorage.setItem("sessionUserType",this.userType);
        localStorage.setItem("sessionUuidValue",this.uuidValue);
        localStorage.setItem("isRegistered","true");
      },
      err => {
        console.log(err);  
        this.showFailMessage = true;
        this.errorDetails =  err.statusText;
       

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
