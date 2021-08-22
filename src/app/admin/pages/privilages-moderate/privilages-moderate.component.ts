import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UploadFileService } from '../../../services/upload-file.service';
import { UserService } from '../../../services/user.service';
import { UUIDService } from '../../../services/uuid.service';
import {faTimes, faEye,faEyeSlash,faCheckCircle,faExclamationTriangle,faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-privilages-moderate',
  templateUrl: './privilages-moderate.component.html',
  styleUrls: ['./privilages-moderate.component.css']
})
export class PrivilagesModerateComponent implements OnInit {
  faEye = faEye;
  faExclamationCircle = faExclamationCircle;
  faEyeSlash = faEyeSlash;
  faCheckCircle = faCheckCircle;
  faTimes = faTimes;
  faExclamationTriangle = faExclamationTriangle;
  showLoader = false;
  showPasswordIcon:boolean = true;
  hidePasswordIcon:boolean = false;
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean;
  errorDetails:string;
  allCountries:any;
  notSelected=false;
  allAdmins;
  addMode = false;

  deleteUserMode = false;
  deleteSuccess = false;
  deleteFail = false;
  userToDelete;

  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService){ }
  uuidValue:any;
  userType:string="admin";
  ngOnInit(): void {
    this.getCountries()
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    this.getAllAdmins()
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndConditions: new FormControl(true,Validators.requiredTrue),
      country: new FormControl(0,Validators.required),
      role: new FormControl('disabled',Validators.required)
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
    else if(this.registerForm.get("role").value=='disabled'){
      alert("اختار نوع الصلاحية")
      this.notSelected = true;
      document.getElementById("role").focus();
    }
    else{
    this.showLoader = true;
    console.log(this.registerForm.value); 
    this.userServ.signUp(this.registerForm.value, this.userType, this.uuidValue).subscribe(
      (response:any) => {
        localStorage.clear();
        this.showFormSubmit = false;
        this.showFailMessage = false;
        this.showSuccessMessage = true;
        console.log("successfully registered ");
        console.log(response);
        this.showLoader = false;
        this.getAllAdmins()
      },
      err => {
        console.log(err);  
        this.showLoader = false;
        // this.showFailMessage = true;
        // this.errorDetails =  err.error.message;
       

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


  getAllAdmins(){
    this.userServ.getAllAdminsProfile("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response:any)=>{
        console.log("all admins profiles ")
        console.log(response)
        this.allAdmins = response.data;
      },
      err=>{
        console.log("error in get admins");
        console.log(err);
        
      }
    )
  }
  showDeleteUserDialog(admin){
    this.userToDelete = admin;
    this.deleteUserMode = true;
  }

  deleteAdminProfile(){
    this.showLoader = true;
    this.userServ.deleteUserProfile(this.userToDelete._id,"admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response:any)=>{
        this.showLoader = false;
        console.log("admin profile deleted ")
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteUserMode = false;
        }, 1500);
        this.getAllAdmins()
      },
      err=>{
        this.showLoader = false;
        console.log("error in delete admin");
        this.deleteFail = true;
        console.log(err);
        
      }
    )
  }

  closeDeleteUserDialog(){
    this.deleteUserMode = false;
  }


  showAddAdminForm(){
this.addMode = true;
  }
}
