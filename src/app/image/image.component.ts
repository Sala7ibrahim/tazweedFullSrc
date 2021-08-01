import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ManageImageService } from '../services/manage-image.service';
import { UploadFileService } from '../services/upload-file.service';
import { UUIDService } from '../services/uuid.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  uuidValue:any;
  uploadImageForm: FormGroup;
  constructor(private uploadServ: UploadFileService,private Uuid: UUIDService,private uploadImgServ:ManageImageService) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);


    this.uploadImageForm = new FormGroup({
      image : new FormControl(null,Validators.required),
      profileId : new FormControl(localStorage.getItem("userId")), 
      email : new FormControl(localStorage.getItem("email"))

    })
    
  }



  onChange($event: Event) {
    const file = ($event.target as HTMLInputElement).files[0];
    this.uploadServ.convertToBase64(file);
    this.uploadServ.myimage.subscribe(
      (upData) => {
        console.log(typeof (upData));
        this.uploadImageForm.controls['image'].setValue(upData); 
      }
    )
  }


  uploadImage(){
    console.log(this.uploadImageForm.value);
    this.uploadImgServ.uploadImageToServer(
      this.uploadImageForm.value,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")
      ).subscribe(
        (response:any)=>{
          console.log("image uploaded successfully");
          console.log(response);
          this.ngOnInit();
          
          
        },
        err=>{
          console.log("error in upload");
          console.log(err);
          
        }
      )
    
  }
  

}
