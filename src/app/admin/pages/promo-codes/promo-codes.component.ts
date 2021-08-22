import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';
@Component({
  selector: 'app-promo-codes',
  templateUrl: './promo-codes.component.html',
  styleUrls: ['./promo-codes.component.css']
})
export class PromoCodesComponent implements OnInit {

  showEditSuccess: boolean = false;
  showEditFail: boolean = false;
  showLoaderInput = false;
  ValiditySuccess = false;
  ValidityFail = false;
 
  showLoader = false;
  allJobTypes;
  allPromoCodes;
  showAddCupon = false;
  addCuponSuccess = false;
  addCuponFail = false;
  uuidValue: any;
  math = Math;
  userImageBase;
  faArchive = faArchive;
  faUserAlt = faUserAlt;
  faUsersCog = faUsersCog;
  faToggleOff = faToggleOff;
  faToggleOn = faToggleOn;
  faCheck = faCheck;
  faTimesCircle = faTimesCircle;
  faChartBar = faChartBar;
  faTrashAlt = faTrashAlt;
  faPercentage = faPercentage;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;
  faHandHoldingUsd = faHandHoldingUsd;
  faUserTie = faUserTie;
  faFolderOpen = faFolderOpen;
  faMoneyBillWave = faMoneyBillWave;
  faThList = faThList;
  faHistory = faHistory;
  faEnvelope = faEnvelope;
  faEnvelope2 = faEnvelope;
  faBell = faBell;
  faSignOutAlt = faSignOutAlt;

  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName: string;
  sessionUserType;

  showActiveConfirmMessage = false;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  itemToEdit;


  addCuponForm: FormGroup;
  showDeleteDialog = false;
  deleteSuccess = false;
  deleteFail = false;
  promoToDelete;
  editedAmount;
  showEmailField = false;
  selectedPromoCodeId;
  selectedPromoCode;
  showOnePromoCodeDialog = false;
  showPromoCodeStatisDialog = false;
  statisticsResponse;
  constructor(
    private Uuid: UUIDService,
    private userServ: UserService
  ) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.uuidValue = this.Uuid.generateUUID();
    this.getAllPromoCodes();
    this.getAllJobTypes()
    this.addCuponForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      isPercentage: new FormControl(false, Validators.required),
      productId: new FormArray([], Validators.required),
      isReused: new FormControl(null),
      isPublic: new FormControl("true"),
      isLimited: new FormControl(false),
      numberOfUsagePerUser: new FormControl(null),
      isPrivate: new FormControl(false),
      numberOfUsageForUser: new FormControl(null),
      userEmail: new FormControl(null, Validators.email),

    })

    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        // console.log("all user profile object is --------------------------");
        // console.log(userProfileResponse.data);
        localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);

        this.userName = localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName");



      }
    )



  }

  getAllJobTypes() {
    this.userServ.getJobTypes(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all job types response");
        // console.log(response);
        this.allJobTypes = response.data;
      },
      err => {
        console.log(err);

      }
    )
  }

  closeActiveDialog() {
    this.showActiveConfirmMessage = false;
  }
 
  closeDeactiveDialog() {
    this.showDeactiveConfirmMessage = false;
  }
  showActive(user) {
    this.showActiveConfirmMessage = true;
    this.itemToEdit = user;
  }

  showDeactive(user) {
    this.showDeactiveConfirmMessage = true;
    this.itemToEdit = user;

  }

  closeSuccessDlg() {
    this.showEditSuccess = false;
    this.ngOnInit()
  }

  closeFailDlg() {
    this.showEditFail = false;


  }
  closeAddCuponDialog() {
    this.showAddCupon = false;
  }
  showAddCuponForm() {
    this.showAddCupon = true;
  }
  addCupon() {
    if (this.showEmailField == true) {
      if (this.addCuponForm.get("numberOfUsageForUser").value == null || this.addCuponForm.get("numberOfUsageForUser").value == '') {
        alert("من فضلك قم بادخال عدد المرات المتاحة للاستخدام")
      }

      else {
        const isPercentageBol = Boolean(JSON.parse(this.addCuponForm.get("isPercentage").value));
        this.addCuponForm.get("isPercentage").setValue(isPercentageBol);

        const isPublicBol = Boolean(JSON.parse(this.addCuponForm.get("isPublic").value));
        this.addCuponForm.get("isPublic").setValue(isPublicBol);

        // console.log(this.addCuponForm.value);
        if (this.addCuponForm.get("value").value < 0 || this.addCuponForm.get("numberOfUsagePerUser").value < 0 || this.addCuponForm.get("numberOfUsageForUser").value < 0) {
          alert("please enter positive value");

        }
        else {

          if (this.addCuponForm.get("numberOfUsagePerUser").value > 0 || this.addCuponForm.get("numberOfUsageForUser").value > 0) {
            this.addCuponForm.get("isReused").setValue(true);
          }



          else if (this.addCuponForm.get("isPublic").value == false || this.addCuponForm.get("isPublic").value == 'false') {
            this.addCuponForm.get("isPublic").setValue(false);
            this.addCuponForm.get("isPrivate").setValue(true);

          }

          else if (this.addCuponForm.get("numberOfUsageForUser").value == null) {
            this.addCuponForm.get("isPublic").setValue(true);
            this.addCuponForm.get("isLimited").setValue(false);
            this.addCuponForm.get("isPrivate").setValue(false);


          }
          // console.log(this.addCuponForm.value);
          const codeLower = this.addCuponForm.get("code").value;

          this.addCuponForm.get("code").setValue(codeLower.toLowerCase())
          const filtered = {};
          if (this.addCuponForm.valid) {
            for (let key in this.addCuponForm.value) {
              if (this.addCuponForm.value[key]) {
                filtered[key] = this.addCuponForm.value[key];
              }
            }
            console.log(filtered);
          }
          this.showLoader = true;
          this.userServ.addPromocode(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
            (response) => {
              this.showLoader = false;
              console.log("cupon added success");
              console.log(response);
              this.addCuponSuccess = true;
              setTimeout(() => {
                this.showAddCupon = false;
              }, 1500);
              this.getAllPromoCodes();


            },
            err => {
              this.showLoader = false;
              console.log("error in add cupon");
              console.log(err);
              this.addCuponFail = true;


            }
          )





        }


      }

    }
    else {


      const isPercentageBol = Boolean(JSON.parse(this.addCuponForm.get("isPercentage").value));
      this.addCuponForm.get("isPercentage").setValue(isPercentageBol);

      const isPublicBol = Boolean(JSON.parse(this.addCuponForm.get("isPublic").value));
      this.addCuponForm.get("isPublic").setValue(isPublicBol);

      // console.log(this.addCuponForm.value);
      if (this.addCuponForm.get("value").value < 0 || this.addCuponForm.get("numberOfUsagePerUser").value < 0 || this.addCuponForm.get("numberOfUsageForUser").value < 0) {
        alert("please enter positive value");

      }
      else {

        if (this.addCuponForm.get("numberOfUsagePerUser").value > 0 || this.addCuponForm.get("numberOfUsageForUser").value > 0) {
          this.addCuponForm.get("isReused").setValue(true);
        }



        else if (this.addCuponForm.get("isPublic").value == false || this.addCuponForm.get("isPublic").value == 'false') {
          this.addCuponForm.get("isPublic").setValue(false);
          this.addCuponForm.get("isPrivate").setValue(true);

        }

        else if (this.addCuponForm.get("numberOfUsageForUser").value == null) {
          this.addCuponForm.get("isPublic").setValue(true);
          this.addCuponForm.get("isLimited").setValue(false);
          this.addCuponForm.get("isPrivate").setValue(false);


        }
        // console.log(this.addCuponForm.value);
        const codeLower = this.addCuponForm.get("code").value;

        this.addCuponForm.get("code").setValue(codeLower.toLowerCase())
        const filtered = {};
        if (this.addCuponForm.valid) {
          for (let key in this.addCuponForm.value) {
            if (this.addCuponForm.value[key]) {
              filtered[key] = this.addCuponForm.value[key];
            }
          }
          console.log(filtered);
        }
        this.showLoader = true;
        this.userServ.addPromocode(filtered, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
          (response) => {
            this.showLoader = false;
            console.log("cupon added success");
            console.log(response);
            this.addCuponSuccess = true;
            setTimeout(() => {
              this.showAddCupon = false;
            }, 1500);
            this.getAllPromoCodes();


          },
          err => {
            this.showLoader = false;
            console.log("error in add cupon");
            console.log(err);
            this.addCuponFail = true;


          }
        )





      }
    }
  }

  getAllPromoCodes() {
    this.userServ.getAllPromocodes(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all promo codes response");
        // console.log(response);
        this.allPromoCodes = response.data;
        this.showLoader = false;
        // console.log(this.allPromoCodes);
      },
      err => {
        console.log(err);
        this.showLoader = false;

      }
    )
  }

  getOnePromoCode(id) {
    this.userServ.getOnePromocode(id, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("one promo code response");
        console.log(response);
        this.selectedPromoCode = response.data[0];
        console.log(this.selectedPromoCode);

      },
      err => {
        console.log(err);

      }
    )
  }
 

  getPromoCodeStatistics(id) {
    this.userServ.getPromocodeStatistics(id, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("promo code statistics response");
        console.log(response);
        this.statisticsResponse = response.data;
        // console.log(this.selectedPromoCode);

      },
      err => {
        console.log(err);

      }
    )
  }
 

  onCheckboxChange(event, valueReal) {
    // console.log(event);
    if (event.target.checked) {
      console.log(event.target.defaultValue);
      const checkValue = new FormControl(event.target.defaultValue);
      (<FormArray>this.addCuponForm.get("productId")).push(checkValue);
    }


  }
  checkCuponName(event) {
    this.ValiditySuccess = false;
    this.ValidityFail = false;
    console.log(event);
    console.log(this.addCuponForm.get("code").value);
    this.showLoaderInput = true;



    // check promo code name validity method
    if (this.addCuponForm.get("code").value == null || this.addCuponForm.get("code").value == '') {
      this.ValiditySuccess = false;
      this.ValidityFail = false;
      this.showLoaderInput = false;

    }
    else {
      setTimeout(() => {

        if (this.addCuponForm.get("code").value != null && this.addCuponForm.get("code").value != '') {


          this.userServ.checkPromoCodeValidity(this.addCuponForm.get("code").value, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
            (response: any) => {
              this.showLoaderInput = false;
              console.log("promo code name valid");
              console.log(response);
              this.ValiditySuccess = true;

            },
            err => {
              this.showLoaderInput = false;
              this.ValidityFail = true;
              console.log(err);

            }
          )
        }
      }, 1500);

    }

    // setTimeout(() => {
    //   this.showLoaderInput = false;
    //   this.ValiditySuccess = true;

    // }, 2000);


  }

  //localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")
  activateCupon(promo) {
    console.log(promo._id);
    this.showLoader = true;
    this.userServ.UpdatePromocode(promo._id, { status: "active" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        console.log("promo code activated");
        console.log(response);
        this.getAllPromoCodes();


      },
      err => {
        this.showLoader = false;
        console.log("error in activiating promo code");
        console.log(err);

      }
    )

  }

  deActivateCupon(promo) {
    console.log(promo._id);
    this.showLoader = true;
    this.userServ.UpdatePromocode(promo._id, { status: "deactive" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        console.log("promo code deActivated");
        console.log(response);

        this.getAllPromoCodes();
      },
      err => {
        this.showLoader = false;
        console.log("error in deActiviating promo code");
        console.log(err);

      }
    )

  }

  deleteCupon() {
    this.deleteFail = false;
    this.deleteSuccess = false;
    console.log("promo that will delete");

    console.log(this.promoToDelete._id);
    this.showLoader = true;
    this.userServ.deketePromocode(this.promoToDelete._id, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        this.showLoader = false;
        console.log("promo code deleted");
        console.log(response);
        this.deleteSuccess = true;
        setTimeout(() => {
          this.showDeleteDialog = false;
          
        }, 1500);
        this.getAllPromoCodes();


      },
      err => {
        this.showLoader = false;
        console.log("error in deleting promo code");
        console.log(err);
        this.deleteFail = true;

      }
    )

  }

  openPromoCodeDialog(code) {
    
    this.selectedPromoCodeId = code;
    this.getOnePromoCode(code);
    this.showOnePromoCodeDialog = true;
  }
  closePromoCodeDialog() {
    this.showOnePromoCodeDialog = false;
  }


  openPromoCodeStatDialog(code) {
    this.statisticsResponse = null;
    this.selectedPromoCodeId = code;
    this.getPromoCodeStatistics(code);
    this.showPromoCodeStatisDialog = true;
  }
  closePromoCodeStatDialog() {
    this.showPromoCodeStatisDialog = false;
  }
  openDeleteDialog(promo) {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.showDeleteDialog = true;
    this.promoToDelete = promo;
  }

  closeDeleteDialog() {
    this.deleteSuccess = false;
    this.deleteFail = false;
    this.showDeleteDialog = false;
  }

  showMail() {
    if (this.addCuponForm.get("isPublic").value == false || this.addCuponForm.get("isPublic").value == 'false') {
      this.showEmailField = true;
      this.addCuponForm.get("isPrivate").setValue(true);

    }
    else {
      this.showEmailField = false;
    }
  }





}
