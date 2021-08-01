import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';

@Component({
  selector: 'app-manage-my-project',
  templateUrl: './manage-my-project.component.html',
  styleUrls: ['./manage-my-project.component.css']
})
export class ManageMyProjectComponent implements OnInit {
  showAddJobLssThanLimit = false;
  finalCostFterPromo;
  promoCodeValue;
  promoCodeType;
  promoCodeDiscount;
  promoCodeold;
  currentRate = 8;
  uuidValue: any;
  projectId;
  editedProjectObject;
  editProjectForm: FormGroup;
  day1;
  day2;
  day3;
  showEditSuccessMessage: boolean = false;
  showLoader = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  additionVlaue;
  showSuccessMessage = false;
  projectConfig;
  projectCost;
  finalCost;
  packageSizeNameArabic: string;
  timeInit;
  amountInit;
  finalTotalCost;
  showPaymentMessage = false;
  showPromocodeMessage = false;
  paymentUrlGenerated;
  promocodeGenerated;
  editModeWithPromoCode = false;
  finalTotalCostAfterpromoCode = 0;
  projectIdShoot;
  constructor(private router: ActivatedRoute, private projectSev: ManageProjectService, private Uuid: UUIDService, private route: Router, private userServ: UserService) { }

  ngOnInit(): void {
    this.day1 = 1;
    this.day2 = 2;
    this.day3 = 3;
    this.uuidValue = this.Uuid.generateUUID();
    this.projectIdShoot = this.router.snapshot.params["id"];
    // console.log("project id is ");

    // console.log(this.projectIdShoot);

    this.projectSev.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        // console.log("config object ====== ");
        this.projectConfig = configResponse.data[0].jobConfig;
        // console.log(this.projectConfig);
       

      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);
      }
    )
    // this.getProjectData(this.projectIdShoot);


    this.editProjectForm = new FormGroup({
      projectTitle: new FormControl(null),
      // projectType: new FormControl("Article"),
      projectField: new FormControl(null),
      projectIdea: new FormControl(null),
      timePerDay: new FormControl(null),
      category: new FormControl("string"),
      language: new FormControl("string"),
      size: new FormControl(null),

      amount: new FormControl(null),
      totalCost: new FormControl(null),
      addtionalAmount: new FormControl(null),
      hasPromoCode: new FormControl(false),
      promoCode: new FormControl(null)


    })



    this.userServ.getOneProject(this.projectIdShoot, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
        // console.log("get job by id response");
        // console.log(response);
        this.editedProjectObject = response.data;


        this.editProjectForm.get("projectTitle").setValue(response.data.projectTitle);
        this.editProjectForm.get("projectField").setValue(response.data.projectField);
        this.editProjectForm.get("projectIdea").setValue(response.data.projectIdea);
        this.editProjectForm.get("size").setValue(response.data.size);

        this.editProjectForm.get("timePerDay").setValue(response.data.timePerDay);
        const totalCostAfterDiscount = response.data.totalCost;
        this.finalTotalCostAfterpromoCode = +totalCostAfterDiscount;
        if (response.data.hasPromoCode == true) {
          this.editModeWithPromoCode = true;
          this.editProjectForm.get("hasPromoCode").setValue(true);
          this.editProjectForm.get("promoCode").setValue(response.data.promoCode);
          this.promoCodeold = response.data.promoCode;
          this.getPromoCodeData();
          // this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);

        }
        else {
          this.editModeWithPromoCode = false;
        }
        this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);
        this.editProjectForm.get("addtionalAmount").setValue(this.editedProjectObject.addtionalAmount);
        if (this.editedProjectObject.addtionalAmount == null || this.editedProjectObject.addtionalAmount == '') {
          this.editProjectForm.get("addtionalAmount").setValue(0);
        }


        let size = this.editProjectForm.get("size").value;
        let packagInitCost;
        if (size == "1") {
          packagInitCost = this.projectConfig[0].amount;
        }
        else if (size == "2") {
          packagInitCost = this.projectConfig[1].amount;
    
        }
        else if (size == "3") {
          packagInitCost = +this.projectConfig[2].amount;
    
        }
        else {
          packagInitCost = '0';
    
        }
        this.editProjectForm.get("amount").setValue(packagInitCost);
        let time = this.editProjectForm.get("timePerDay").value;
        let totalCost;
    
        switch (time) {
          case 1:
            totalCost = +packagInitCost + 25;
            break;
    
          case 2:
            totalCost = +packagInitCost + 10;
            break;
    
          case 3:
            totalCost = +packagInitCost + 0;
            break;
    
          default:
            totalCost = +packagInitCost;
            break;
        }
        this.projectCost = totalCost;
        this.finalCost = +this.projectCost;
        // this.addProjectForm.get("additionFake").setValue("0");
        this.editProjectForm.get("totalCost").setValue(this.finalCost);
        this.editProjectForm.get("amount").setValue(this.finalCost);
        this.addAddition();
        if (this.editModeWithPromoCode == true) {
    
           this.getPromoCodeData();
        }
       


      },
      err => {
        console.log("error in get job by id");
        console.log(err);

      }
    )


    // this.projectSev.selectedPoject.subscribe(
    //   (response) => {
    //     this.editedProjectObject = response;


    //     this.editProjectForm.get("projectTitle").setValue(this.editedProjectObject.projectTitle);
    //     this.editProjectForm.get("projectField").setValue(this.editedProjectObject.projectField);
    //     this.editProjectForm.get("projectIdea").setValue(this.editedProjectObject.projectIdea);
    //     this.editProjectForm.get("size").setValue(this.editedProjectObject.size);

    //     this.editProjectForm.get("timePerDay").setValue(this.editedProjectObject.timePerDay);
    //     const totalCostAfterDiscount = this.editedProjectObject.totalCost;
    //     this.finalTotalCostAfterpromoCode = +totalCostAfterDiscount;
    //     if (this.editedProjectObject.hasPromoCode == true) {
    //       this.editModeWithPromoCode = true;
    //       this.editProjectForm.get("hasPromoCode").setValue(true);
    //       this.editProjectForm.get("promoCode").setValue(this.editedProjectObject.promoCode);
    //       this.promoCodeold = this.editedProjectObject.promoCode;
    //       this.getPromoCodeData();

    //     }
    //     else {
    //       this.editModeWithPromoCode = false;
    //     }
    //     this.editProjectForm.get("totalCost").setValue(this.editedProjectObject.totalCost);
    //     this.editProjectForm.get("addtionalAmount").setValue(this.editedProjectObject.addtionalAmount);
    //     if (this.editedProjectObject.addtionalAmount == null || this.editedProjectObject.addtionalAmount == '') {
    //       this.editProjectForm.get("addtionalAmount").setValue(0);
    //     }



    //   },
    //   err => {
    //     console.log("no project selected");

    //   }
    // )
    this.projectId = this.router.snapshot.paramMap.get("id");





  }

  editProject() {

    this.showAddJobLssThanLimit = false;
    this.showLoader = true;



    const addittionValue = this.editProjectForm.get("addtionalAmount").value;

    let packagInitCost;
    if (this.editProjectForm.get("size").value == '1') {
      packagInitCost = this.projectConfig[0].amount;
      this.editProjectForm.get("amount").setValue(+packagInitCost);
    }
    else if (this.editProjectForm.get("size").value == '2') {
      packagInitCost = this.projectConfig[1].amount;
      this.editProjectForm.get("amount").setValue(+packagInitCost);

    }
    else if ((this.editProjectForm.get("size").value == '3')) {
      packagInitCost = this.projectConfig[2].amount;
      this.editProjectForm.get("amount").setValue(+packagInitCost);

    }
    else {
      this.editProjectForm.get("amount").setValue("0");

    }

    let time = this.editProjectForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case 1:
        totalCost = +packagInitCost + 25;
        break;

      case 2:
        totalCost = +packagInitCost + 10;
        break;

      case 3:
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;

    this.editProjectForm.get("amount").setValue(this.projectCost);
    console.log(this.editProjectForm.value);
    if (addittionValue < 0) {
      alert("addional value must Be Positive Value")
    }
    else {

      const additonValll = this.editProjectForm.get("addtionalAmount").value;
      this.finalTotalCost = +additonValll + +this.projectCost;
      this.editProjectForm.get("totalCost").setValue(this.finalTotalCost);
      // if(this.editModeWithPromoCode==true){
      //   // console.log("has promocode submit");
      //   this.editProjectForm.get("totalCost").setValue(this.finalCostFterPromo);
      // }
      // else{
      //   // console.log("no promocode submit");
      //   this.editProjectForm.get("totalCost").setValue(this.finalTotalCost);
      // }






      const filtered2 = {};
      if (this.editProjectForm.valid) {
        for (let key in this.editProjectForm.value) {
          if (this.editProjectForm.value[key]) {
            filtered2[key] = this.editProjectForm.value[key];
          }
        }

      }
      console.log(filtered2);

      this.projectSev.editJob(filtered2, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectId).subscribe(
        (editResponse: any) => {
          console.log("project updated successfully");
          console.log(editResponse);
          this.showLoader = false;
          if (editResponse.data.redirectUrl) {
            this.showPaymentMessage = true;
            this.paymentUrlGenerated = editResponse.data.redirectUrl;
            setTimeout(() => {
              this.showPaymentMessage = false;
              window.location.href = this.paymentUrlGenerated;



            }, 1500);
          }

          else if (editResponse.data.promoCode) {
            this.showPromocodeMessage = true;
            this.promocodeGenerated = editResponse.data.promoCode;
            setTimeout(() => {
              this.route.navigate(['/myProjects']);
            }, 2000);
          }
          else {
            this.showEditSuccessMessage = true;
            setTimeout(() => {
              this.route.navigate(['/myProjects']);
            }, 2000);
          }
        },
        err => {
          console.log("error in update project");
          console.log(err);
          this.showLoader = false;
          if (err.error.code == '42' || err.error.message == "You can't pay less than 5 SAR") {
            this.showAddJobLssThanLimit = true;
          }


        }
      )

    }

  }
  closeDialog() {
    this.showEditSuccessMessage = false;
  }


  calculateCost() {
    // console.log("-----------------------------------");
    // console.log(this.projectConfig);

    // console.log(this.projectConfig[0].amount);
    // console.log(this.projectConfig[1].amount);
    // console.log(this.projectConfig[2].amount);

    let size = this.editProjectForm.get("size").value;
    let packagInitCost;
    if (size == "1") {
      packagInitCost = this.projectConfig[0].amount;
    }
    else if (size == "2") {
      packagInitCost = this.projectConfig[1].amount;

    }
    else if (size == "3") {
      packagInitCost = +this.projectConfig[2].amount;

    }
    else {
      packagInitCost = '0';

    }
    this.editProjectForm.get("amount").setValue(packagInitCost);
    let time = this.editProjectForm.get("timePerDay").value;
    let totalCost;

    switch (time) {
      case 1:
        totalCost = +packagInitCost + 25;
        break;

      case 2:
        totalCost = +packagInitCost + 10;
        break;

      case 3:
        totalCost = +packagInitCost + 0;
        break;

      default:
        totalCost = +packagInitCost;
        break;
    }
    this.projectCost = totalCost;
    this.finalCost = +this.projectCost;
    // this.addProjectForm.get("additionFake").setValue("0");
    this.editProjectForm.get("totalCost").setValue(this.finalCost);
    this.editProjectForm.get("amount").setValue(this.finalCost);
    this.addAddition();
    if (this.editModeWithPromoCode == true) {

       this.getPromoCodeData();
    }
   



    // return this.addProjectForm.get("size").value;
  }
  addAddition() {
    // console.log(val);
    if (this.editProjectForm.get("addtionalAmount").value < 0) {
      alert("addition value must be positive");
    }
    else {
      // this.addProjectForm.get("addtionalAmount").patchValue(val);

      this.finalTotalCost = +this.editProjectForm.get("addtionalAmount").value + +this.projectCost;
      this.editProjectForm.get("totalCost").setValue(this.finalCost);
      if (this.editModeWithPromoCode == true) {
        this.getPromoCodeData();
      }


    }

  }

  closePaymentDialog() {
    this.showPaymentMessage = false;
  }

  closePromocodeDialog() {
    this.showPromocodeMessage = false;
  }


  getPromoCodeData() {
    this.userServ.getOnePromocode(this.promoCodeold, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("one promo code response");
        // console.log(response);
        //  promoCodeValue;  promoCodeType;   promoCodeDiscount;

        this.promoCodeValue = response.data[0].value;
        // console.log(this.promoCodeValue);

        if (response.data[0].isPercentage == true) {
          this.promoCodeType = 'percentage';
          // console.log("percentage");

        }
        else {
          this.promoCodeType = 'value';
          // console.log("promocode in value");
        }


        const promVal = +this.promoCodeValue;
        const costBefore = +this.finalTotalCost;
        if (this.promoCodeType == 'percentage') {
          this.promoCodeDiscount = (costBefore / 100) * promVal;

          const promoDisco = +this.promoCodeDiscount;

          console.log("costBefore" + costBefore);
          console.log("promoDisco" + promoDisco);

          this.finalCostFterPromo = costBefore - promoDisco;

        }
        else {

          // console.log("promocode will be in value calculation");

          const promVal = +this.promoCodeValue;
          // console.log("promVal" + promVal);

          const costBefore = +this.finalTotalCost;
          // console.log("costBefore" + costBefore);
          this.promoCodeDiscount = +this.promoCodeValue;
          const promoDisco = +this.promoCodeDiscount;

          this.finalCostFterPromo = costBefore - promoDisco;
        }


      }
    )
  }
  closeaddLimitDialog() {
    this.showAddJobLssThanLimit = false;

  }



  getProjectData(projectId) {
    this.userServ.getOneProject(projectId, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), localStorage.getItem("email")).subscribe(
      (response: any) => {
        console.log("get job by id response");
        console.log(response);



      },
      err => {
        console.log("error in get job by id");
        console.log(err);

      }
    )


  }


  //localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")

}
