import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../services/upload-file.service';
import { UserService } from '../../services/user.service';
import { UUIDService } from '../../services/uuid.service';
import { faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-partner-register',
  templateUrl: './partner-register.component.html',
  styleUrls: ['./partner-register.component.css']
})
export class PartnerRegisterComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faExclamationCircle = faExclamationCircle;
  showLoader = false;
  faExclamationTriangle = faExclamationTriangle;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean; 
  errorDetails:string;
  allCountries:any;
  notSelected=false;
  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService){ }
  uuidValue:any;
  userType:string="partner";
  ngOnInit(): void {
    this.getCountries()
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
      termsAndConditions: new FormControl(true,Validators.requiredTrue),
      writingAbility: new FormControl(null,Validators.required),
      searchingAbility: new FormControl(null,Validators.required),
      country: new FormControl(0,Validators.required)
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
    this.notSelected = false;
    if(this.registerForm.get("country").value==0 || this.registerForm.get("country").value=='0' ){
      // alert("اختار البلد")
      this.notSelected = true;
      document.getElementById("country").focus();
    }
    else{

   
    this.showLoader = true;
    console.log(this.registerForm.value); 
    this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
      (response:any) => {
        localStorage.clear();
        this.showLoader = false;
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
        this.showLoader = false;
        this.showFailMessage = true;
        this.errorDetails =  err.error.message;
       

      }
    )
  }
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
  getCountries(){
    this.userServ.getCountries().subscribe(
      (response:any)=>{
        console.log("all countries");
        console.log(response);
        this.allCountries = response;
        
      }
    )
  }

}
