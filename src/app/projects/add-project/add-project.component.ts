import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { faChevronLeft, faChevronRight, faCheckCircle, faSignOutAlt, faTimes, faFileAlt, faCube, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { MatChipInputEvent } from '@angular/material/chips';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {
  showAddToCartMessage = false;
  showAddJobLssThanLimit = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;
  url: SafeResourceUrl;
  faTimesCircle = faTimesCircle;
  showAddForm: boolean = true;
  paymentUrl: string;
  uuidValue: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  tagsList: any = [];
  externalLinks: any = [];
  addProjectForm: FormGroup;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faCheckCircle = faCheckCircle;
  faSignOutAlt = faSignOutAlt;
  faFileAlt = faFileAlt;
  faTwitter = faTwitter;
  faTimes = faTimes;
  faCube = faCube;
  stepValue = 1;
  progressValue;
  tags;
  additionVlaue;
  showSuccessMessage = false;
  showAdditionnalValueMessage = false;
  projectConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic: string;
  textPattern;
  showIframe: boolean = false;
  showLoaderIframe: boolean = false;
  showAddSuccessIframeContainer: boolean = false;
  activeArticles: boolean = true;
  activeProducts: boolean = false;
  activeTweets: boolean = false;
  jobType: string = "article";
  promocodeadded = false;
  finalCostFterPromo;
  promoCodeValue;
  promoCodeType;
  promoCodeDiscount;
  showRemovePromoBtn = false;
  userLoggedEmail;
  showLoader = false;
  constructor(private userServ: UserService, private projectServ: ManageProjectService, private Uuid: UUIDService, private route: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userLoggedEmail = localStorage.getItem("email");
    // this.textPattern = "^(?:[\u0009-\u000D\u001C-\u007E\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$";
    this.textPattern = "^(?:[\u0009-\u000D\u001C-\u007E\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){0,30}$";
    this.uuidValue = this.Uuid.generateUUID();
    this.projectServ.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        this.projectConfig = configResponse.data[0].jobConfig;
        // console.log("/////////////////////");

        // console.log(this.projectConfig);

      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);

      }
    )
    if (this.stepValue == 0) {
      this.progressValue = 20
    }
    if (this.stepValue == 1) {
      this.progressValue = 25
    }
    else if (this.stepValue == 2) {
      this.progressValue = 50
    }
    else if (this.stepValue == 3) {
      this.progressValue = 75
    }
    else if (this.stepValue == 4) {
      this.progressValue = 100
    }
    this.addProjectForm = new FormGroup({
      clientId: new FormControl(localStorage.getItem("clientId")),
      projectTitle: new FormControl(null, Validators.required),
      projectType: new FormControl("Article"),
      projectField: new FormControl(null, Validators.required),
      projectIdea: new FormControl(null),
      projectTags: new FormArray([]),
      resource: new FormControl(null),
      helpfulLinks: new FormArray([]),
      category: new FormControl("string"),
      language: new FormControl("string"),
      size: new FormControl(null, Validators.required),
      timePerDay: new FormControl(null, Validators.required),
      // status: new FormControl("active"),
      amount: new FormControl(null),
      addtionalAmount: new FormControl(0),
      totalCost: new FormControl(null),
      briefProject: new FormControl(null),
      // additionFake: new FormControl(null),
      clientEmail: new FormControl(localStorage.getItem("email")),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null),
      redirectToPaymentGetway: new FormControl(true)

    })
  }

  add(event: MatChipInputEvent): void {
    const tag = new FormControl(event.value);
    const input = event.input;
    const value = event.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input")
    }
    else {
      if ((value || '').trim()) {

        this.tagsList.push({ name: value.trim() });
        (<FormArray>this.addProjectForm.get("projectTags")).push(tag);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }

  }
  remove(tag): void {
    const index = this.tagsList.indexOf(tag);

    if (index >= 0) {
      this.tagsList.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['projectTags'];
      control.removeAt(index);
    }
  }

  logValue(event, formControlName) {
    const value = event.target.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input");
      this.addProjectForm.get(formControlName).setValue("");
    }
    else {

    }
  }


  addLinks(event: MatChipInputEvent): void {
    const externalLink = new FormControl(event.value);
    const input = event.input;
    const value = event.value;

    if (value.includes("<scri")) {
      alert("Enter Valid Input")
    }
    else {
      if ((value || '').trim()) {

        this.externalLinks.push({ name: value.trim() });
        (<FormArray>this.addProjectForm.get("helpfulLinks")).push(externalLink);
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }
    }

  }
  removeLink(link): void {
    const index = this.externalLinks.indexOf(link);

    if (index >= 0) {
      this.externalLinks.splice(index, 1);
      const control = <FormArray>this.addProjectForm.controls['helpfulLinks'];
      control.removeAt(index);
    }
  }




  addProject() {
    this.showLoader = true;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addProjectForm.get("timePerDay").value;
    this.addProjectForm.get("timePerDay").setValue(timePerDayInt);
    console.log(this.addProjectForm.value);

    if (this.addProjectForm.get("hasPromoCode").value == false) {
      if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              filtered[key] = this.addProjectForm.value[key];
            }
          }
          console.log(filtered);
        }



        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.paymentUrl = response.data.redirectUrl;
            this.showAddForm = false;
            this.showSuccessMessage = true;

            setTimeout(() => {
              this.showSuccessMessage = false;
              window.location.href = this.paymentUrl;



            }, 1000);


          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showSuccessMessage = false;
            this.showAddForm = true;

            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        this.showLoader = false;
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {

      // this.showLoader = false;
      if (this.ValidityFail) {
        this.addProjectForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addProjectForm.valid) {
        for (let key in this.addProjectForm.value) {
          if (this.addProjectForm.value[key]) {
            filtered[key] = this.addProjectForm.value[key];
          }
        }
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);
          this.paymentUrl = response.data.redirectUrl;
          this.showAddForm = false;
          this.showSuccessMessage = true;

          setTimeout(() => {
            this.showSuccessMessage = false;
            window.location.href = this.paymentUrl;



          }, 1000);


        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showSuccessMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }



  }


  // loadEditor(){


  //   var simplemde = new SimpleMDE({ element: document.getElementById("MyID") });
  // }
  closeIframe() {
    this.route.navigate(["/myProjects"])
    this.showAddSuccessIframeContainer = false;
  }

  signOut() {
    this.route.navigate(["/login"]);
    localStorage.clear();
  }

  calculateCost() {
    let size = this.addProjectForm.get("size").value;
    let packagInitCost;
    if (size == "1") {
      // packagInitCost = '31';
      packagInitCost = this.projectConfig[0].amount;
    }
    else if (size == "2") {
      // packagInitCost = '59';
      packagInitCost = this.projectConfig[1].amount;

    }
    else if (size == "3") {
      // packagInitCost = '79';
      packagInitCost = this.projectConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }
    this.addProjectForm.get("amount").setValue(packagInitCost);
    let time = this.addProjectForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case '1':
        totalCost = +packagInitCost + 25;
        break;

      case '2':
        totalCost = +packagInitCost + 10;
        break;

      case '1':
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;
    // this.addProjectForm.get("additionFake").setValue("0");
    this.addProjectForm.get("totalCost").setValue(this.finalCost);
    this.addProjectForm.get("amount").setValue(this.finalCost);




    // return this.addProjectForm.get("size").value;
  }
  addAddition(val) {
    // console.log(val);
    if (this.addProjectForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {
      // this.addProjectForm.get("addtionalAmount").patchValue(val);

      this.finalCost = +this.addProjectForm.get("addtionalAmount").value + this.projectCost;
      this.addProjectForm.get("totalCost").setValue(this.finalCost);
      this.showAdditionnalValueMessage = true;
      setTimeout(() => {
        this.showAdditionnalValueMessage = false;
      }, 1500);
    }

  }



  closeDialog() {
    this.showAdditionnalValueMessage = false;
  }
  selectArticles() {


    this.activeArticles = true;
    this.activeProducts = false;
    this.activeTweets = false;
    this.jobType = "article";
    console.log(this.jobType);
  }
  selectProducts() {

    this.activeArticles = false;
    this.activeProducts = true;
    this.activeTweets = false;
    this.jobType = "productDescription";
    console.log(this.jobType);
  }

  selectTweets() {
    this.activeArticles = false;
    this.activeProducts = false;
    this.activeTweets = true;
    this.jobType = "tweets";
    console.log(this.jobType);
  }


  addPromoCodeToJop() {
    this.showRemovePromoBtn = true;
    // this.checkCuponNameValidity();
    const promoCodetrimmed = (this.addProjectForm.get("promoCode").value).trim();
    this.addProjectForm.get("promoCode").setValue(promoCodetrimmed.toLowerCase());
    this.addProjectForm.get("hasPromoCode").setValue(true);
    this.promocodeadded = true;
    const promVal = +this.promoCodeValue;
    const costBefore = +this.finalCost;
    if (this.promoCodeType == 'percentage') {
      this.promoCodeDiscount = (costBefore / 100) * promVal;
      const promoDisco = +this.promoCodeDiscount;

      console.log("costBefore" + costBefore);
      console.log("promoDisco" + promoDisco);

      this.finalCostFterPromo = costBefore - promoDisco;

    }
    else {
      const promVal = +this.promoCodeValue;
      const costBefore = +this.finalCost;
      this.promoCodeDiscount = +this.promoCodeValue;
      const promoDisco = +this.promoCodeDiscount;

      this.finalCostFterPromo = costBefore - promoDisco;
    }
    // this.promoCodeDiscount = 
    // this.finalCostFterPromo 

  }


  removePromoCodefromJop() {
    this.addProjectForm.get("hasPromoCode").setValue(false);
    this.addProjectForm.get("promoCode").setValue("");
    this.promocodeadded = false;
    this.ValidityFail = false;
    this.ValiditySuccess = false;
    this.showRemovePromoBtn = false;

  }



  checkCuponNameValidity() {

    this.showRemovePromoBtn = false;
    this.ValiditySuccess = false;
    this.ValidityFail = false;
    // console.log(this.addProjectForm.get("promoCode").value);
    // if(this.addProjectForm.get("promoCode").value ==null ||this.addProjectForm.get("promoCode").value ==' ' ){
    //   this.ValiditySuccess = false;
    //   this.ValidityFail = false;
    // }
    // else{

    // }
    this.showLoaderInput = true;
    const promoCodetrimmed = (this.addProjectForm.get("promoCode").value).trim();
    // check promo code name validity method
    if (promoCodetrimmed == null || promoCodetrimmed == '') {
      // console.log("empty value");
      this.showLoaderInput = false;
      this.ValidityFail = false;
      this.ValiditySuccess = false;
    }
    else {
      // console.log("small letters for code");

      this.userServ.checkPromoCodeValidityInProject((promoCodetrimmed).toLowerCase(), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType, this.userLoggedEmail).subscribe(
        (response: any) => {
          this.showLoaderInput = false;
          // console.log("promo code name valid");
          // console.log(response);


          //value
          //isPercentage
          this.promoCodeValue = response.data.value;
          if (response.data.isPercentage == true) {
            this.promoCodeType = 'percentage';
          }
          else {
            this.promoCodeType = 'value';
          }

          // console.log("promo code value");
          // console.log(this.promoCodeValue);
          // console.log("promo code type");
          // console.log(this.promoCodeType);


          this.ValiditySuccess = true;
          this.ValidityFail = false;

        },
        err => {
          this.showLoaderInput = false;
          this.ValidityFail = true;
          this.ValiditySuccess = false;
          console.log(err);

        }
      )


    }





  }

  hideallStatus() {
    if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
      this.showLoaderInput = false;
      this.ValiditySuccess = false;
      this.ValidityFail = false;

    }
  }
  closeaddLimitDialog() {
    this.showAddJobLssThanLimit = false;

  }

  addProjectToCart() {
    this.addProjectForm.get("redirectToPaymentGetway").setValue(false);


    // originnal add project method


    this.showLoader = true;
    this.showAddJobLssThanLimit = false;
    let timePerDayInt;
    timePerDayInt = +this.addProjectForm.get("timePerDay").value;
    this.addProjectForm.get("timePerDay").setValue(timePerDayInt);
    // console.log(this.addProjectForm.value);

    if (this.addProjectForm.get("hasPromoCode").value == false) {
      if (this.addProjectForm.get("promoCode").value == null || this.addProjectForm.get("promoCode").value == '') {
        if (this.ValidityFail) {
          this.addProjectForm.get("promoCode").setValue(null);
        }
        const filtered = {};
        if (this.addProjectForm.valid) {
          for (let key in this.addProjectForm.value) {
            if (this.addProjectForm.value[key]) {
              console.log(key);
              
              filtered[key] = this.addProjectForm.value[key];
            }
          }
         
          filtered["redirectToPaymentGetway"] = false;
          console.log(filtered);

        }



        this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType).subscribe(
          (response: any) => {
            this.showLoader = false;
            console.log("success");
            console.log(response);
            this.showAddForm = false;
            this.showAddToCartMessage = true;



          },
          err => {
            this.showLoader = false;
            console.log("error");
            console.log(err);
            this.showAddToCartMessage = false;
            this.showAddForm = true;

            if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
              this.showAddJobLssThanLimit = true;
            }


          }
        )



      }
      else {
        alert("من فضلك قم بتفعيل البروموكود")
      }

    }
    else {


      if (this.ValidityFail) {
        this.addProjectForm.get("promoCode").setValue(null);
      }
      const filtered = {};
      if (this.addProjectForm.valid) {
        for (let key in this.addProjectForm.value) {
          if (this.addProjectForm.value[key]) {
            filtered[key] = this.addProjectForm.value[key];
          }
        }
        // console.log(filtered);

        
        filtered["redirectToPaymentGetway"] = false;
        console.log(filtered);
      }



      this.projectServ.addJop(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.jobType).subscribe(
        (response: any) => {
          this.showLoader = false;
          console.log("success");
          console.log(response);
          this.showAddForm = false;
          this.showAddToCartMessage = true;



        },
        err => {
          this.showLoader = false;
          console.log("error");
          console.log(err);
          this.showAddToCartMessage = false;
          this.showAddForm = true;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )


    }


  }
  newProjectAdd(){
    this.ngOnInit()
    this.showAddToCartMessage = false;
    this.stepValue = 1;
    this.showAddForm = true;
  }


}
