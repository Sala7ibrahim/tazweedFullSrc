import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { UploadFileService } from '../services/upload-file.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
// import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] 
}) 
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  showFormSubmit : boolean;
  showSuccessMessage:boolean;
  showFailMessage:boolean;
  errorDetails:string;
  constructor(private userServ: UserService, private Uuid: UUIDService,private uploadServ: UploadFileService) { }
  // uuidValue = "62ebf87e-1d73-4b0f-a39e-8153abf4a0f2";
  uuidValue:any;
  userType:string="client";
  ngOnInit(): void {
    this.showFormSubmit = true;
    this.showSuccessMessage = false;
    this.showFailMessage = false;
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);
    
    // this.Uuid.getUuid().subscribe(
    //   (response)=>{
    //     // this.uuidValue = response;
    //     console.log("uuid value is ");  
    //     // console.log(this.uuidValue);
    //     console.log(response);


    //   }
    // );
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      termsAndConditions: new FormControl(false,Validators.requiredTrue), 
      // REpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      // status: new FormControl(null, Validators.required),
      // mobileNumber: new FormControl(null, Validators.required),
      // country: new FormControl(null, Validators.required),
      // fieldsOfInterest: new FormControl(),
      // urlPicture: new FormControl(null),
      // customerType: new FormControl(null),
      // attach: new FormControl(null),
      
      // hoppies: new FormArray([]),
      // fieldOfSpecialisation: new FormControl("test data"),
      // writerPage: new FormControl("test writer")
    });
  }
  // generateUUID(){
  //   this.uuidValue=UUID.UUID();
  //   return this.uuidValue;
  // }
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
    // this.registerForm.

  
  // convertToBase64(file: File) {
  //   this.myimage = new Observable((subscriber: Subscriber<any>) => {
  //     this.readFile(file, subscriber);
  //     // console.log(file)

  //   });
  //   this.myimage.subscribe(
  //     (upData) => {
  //       console.log(typeof (upData));
  //       this.registerForm.controls['attach'].setValue(upData);
  //     }
  //   )
  // }

  // readFile(file: File, subscriber: Subscriber<any>) {
  //   const filereader = new FileReader();
  //   filereader.readAsDataURL(file);

  //   filereader.onload = () => {
  //     subscriber.next(filereader.result);
  //     subscriber.complete();
  //   };
  //   filereader.onerror = (error) => {
  //     subscriber.error(error);
  //     subscriber.complete();
  //   };
  // }
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
      },
      err => {
        console.log(err);  
        this.showFailMessage = true;
        this.errorDetails =  err.statusText;
       

      }
    )
  }
  addHopy() {
    const control = new FormControl(null);
    (<FormArray>this.registerForm.get("hoppies")).push(control); 
  }

}
