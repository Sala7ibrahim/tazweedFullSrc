import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserAlt, faArchive, faUsersCog, faTimes, faMoneyBillWave, faToggleOn, faToggleOff, faCheckCircle, faTimesCircle, faFolderOpen, faCheck, faHistory, faPercentage, faTrashAlt, faBell, faEnvelope, faSignOutAlt, faThList, faUserTie, faChartBar, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';
import { UserService } from 'src/app/services/user.service';
import { UUIDService } from 'src/app/services/uuid.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  adminStatistics: any;
  sessionUserType;
  numberOfPartners;
  numberOfClients;
  numberOfRecentPartners;
  numberOfActiveJobs;
  numberOfDoneJobs;
  numberOfMessages;
  profits = 0;
  visitors;
  allPrtners;
  allClients;
  showActiveConfirmMessage = false;
  showDeactiveConfirmMessage = false;
  showMessageDialog = false;
  showsendSuccess = false;
  showsendFail = false;
  itemToEdit;
  messageReceiver;
  sendMessageSpecificUserForm: FormGroup;
  sendMessageForCategoryForm: FormGroup;
  messageObject;
  unpaidBalance;
  showPayDialog = false;
  itemToPay;
  showPaySuccess = false;
  showPayFail = false;
  showsendAllSuccess = false;
  showsendAllFail = false;
  messageReceiverName;
  messageReceiverNames = [];
  allJobsAdmin;
  expiredJobs;
  prePaymentStatusArray = [];
  activeStatusArray = [];
  pendingStatusArray = [];
  inprogressStatusArray = [];
  reviewingStatusArray = [];
  completedStatusArray = [];
  rejectedStatusArray = [];
  expiredStatusArray = [];
  projectConfig;
  mainprojectConfig;
  addCuponForm: FormGroup;
  showDeleteDialog = false;
  deleteSuccess = false;
  deleteFail = false;
  promoToDelete;
  allArcheivedProjects;
  // editConfigForm:FormGroup;
  archieveMode = false;
  projectToArchive;
  editedAmount;
  showEmailField = false;
  selectedPromoCodeId;
  selectedPromoCode;
  showOnePromoCodeDialog = false;
  deleteprojectMode = false;
  projectToDelete;
  constructor(
    private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private projectServ: ManageProjectService
  ) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();
    // console.log("this.uuidvalue");
    // console.log(this.uuidValue);
    this.getJobConfig();
    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }

    this.getAllJobTypes()
    this.getAllPromoCodes();
    this.sendMessageSpecificUserForm = new FormGroup({
      profileId: new FormControl(null),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    })
    this.addCuponForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      value: new FormControl(null, Validators.required),
      isPercentage: new FormControl(false, Validators.required),
      // productId: new FormControl("1"),
      productId: new FormArray([], Validators.required),
      isReused: new FormControl(null),
      isPublic: new FormControl("true"),
      isLimited: new FormControl(false),
      numberOfUsagePerUser: new FormControl(null),
      isPrivate: new FormControl(false),
      numberOfUsageForUser: new FormControl(null),
      userEmail: new FormControl(null, Validators.email),

    })

    this.sendMessageForCategoryForm = new FormGroup({
      for: new FormControl("partner"),
      message: new FormControl(null),
      from: new FormControl(localStorage.getItem("userId")),
      fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))

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
    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        // console.log("user profile image exist");
        // console.log(userImageResponse);
        if (userImageResponse.data.body.data == null) {
          this.userImageBase = "default";

        }
        else {
          this.userImageBase = userImageResponse.data.body.data.image;
        }
 
        // if (this.userImageBase == null) {
        //   this.userImageBase = "default";
        // }
        localStorage.setItem("userImage", this.userImageBase);


      },
      err => {
        // console.log("user profile image is not found");
        // console.log(err);
        this.userImageBase = "default";
        localStorage.setItem("userImage", this.userImageBase);

      }
    )

    this.userServ.getStatistics("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("statistics ======");

        // console.log(response);
        this.adminStatistics = response.data;
        this.numberOfPartners = response.data.numberOfPartners;
        this.numberOfClients = response.data.numberOfClients;
        this.numberOfRecentPartners = response.data.numberOfRecentPartners;
        this.numberOfActiveJobs = response.data.numberOfActiveJobs;
        this.numberOfDoneJobs = response.data.numberOfDoneJobs;
        this.numberOfMessages = response.data.numberOfMessages;
        this.profits = response.data.profits;
        this.visitors = response.data.visitorsNumber;

      },
      err => {
        console.log(err);

      }
    )
    this.getAllPartners();
    this.getAllClients();
    this.getAllAdminMessages();
    this.getUnpaidBalance();
    this.getAllJobs();
    this.getAllArcheivedJobs()
    this.getExpiredJobs();

    // for (const project of this.allJobsAdmin) {
    //   if (project.status == "prePayment") {
    //     this.prePaymentStatusArray.push("1");
    //   }
    //   else if (project.status == "active") {
    //     this.activeStatusArray.push("1");
    //   }
    //   else if (project.status == "pending") {
    //     this.pendingStatusArray.push("1");
    //   }
    //   else if (project.status == "inprogress") {
    //     this.inprogressStatusArray.push("1");
    //   }
    //   else if (project.status == "reviewing") {
    //     this.reviewingStatusArray.push("1");
    //   }
    //   else if (project.status == "completed") {
    //     this.completedStatusArray.push("1");
    //   }

    // }
  }

  signOut() {
    this.route.navigate(["/admin/login"]);
    localStorage.clear();
  }

  getAllPartners() {
    this.userServ.getAllPartners("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all partners object ---------------------- ");

        console.log(response.data);
        this.allPrtners = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }
  openProject(project) {
    this.projectServ.selectedPoject.next(project);
    this.route.navigate(["acceptPartner/" + project._id]);
  }
  getAllClients() {
    this.userServ.getAllClients("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all clients object ---------------------- ");

        // console.log(response.data);
        this.allClients = response.data;

      },
      err => {
        console.log(err);

      }
    )
  }
  showPayDialoge(balance) {
    this.showPayDialog = true;
    this.itemToPay = balance;
    // console.log(balance._id.partnerId);

  }
  closeActiveDialog() {
    this.showActiveConfirmMessage = false;
  }
  closePayDialog() {
    this.showPayDialog = false;
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

  sendMeaasge(receiver) {
    this.showMessageDialog = true;
    this.messageReceiver = receiver;

  }
  closeMessageDialog() {
    this.showMessageDialog = false;

  }

  activateAccount(profileId) {
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "active" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        setTimeout(() => {
          this.showActiveConfirmMessage = false;
        }, 3000);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showActiveConfirmMessage = false;

      }
    )
  }

  deActivateAccount(profileId) {
    // console.log("wait for response");
    this.showLoader = true;
    this.userServ.updateProfileByAdmin(profileId, { "status": "deactivate" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.showLoader = false;
        setTimeout(() => {
          this.showDeactiveConfirmMessage = false;
        }, 3000);

        this.ngOnInit();

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showDeactiveConfirmMessage = false;

      }
    )
  }

  sendMeaage() {
    // fromName: new FormControl(localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName"))
    this.sendMessageSpecificUserForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    this.sendMessageSpecificUserForm.get("profileId").setValue(this.messageReceiver._id);
    console.log(this.sendMessageSpecificUserForm.value);
    this.showLoader = true;
    this.userServ.sendMessageToUser(this.sendMessageSpecificUserForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent');
        console.log(response);
        this.showLoader = false;
        this.showsendSuccess = true;
        this.showsendFail = false;
        setTimeout(() => {
          this.showsendSuccess = false;
          this.ngOnInit();

        }, 2000);
      },
      err => {
        console.log(err);
        this.showsendSuccess = false;
        this.showsendFail = true;
        this.showLoader = false;

      }
    )
  }

  // send message for category

  sendMeaageForCategory() {
    this.sendMessageForCategoryForm.get("fromName").setValue(
      localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName")
    )
    console.log(this.sendMessageForCategoryForm.value);
    this.showLoader = true;
    this.userServ.sendMessageToCategory(this.sendMessageForCategoryForm.value, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log('message sent for category');
        console.log(response);
        this.showLoader = false;
        this.showsendAllSuccess = true;
        setTimeout(() => {
          this.showsendAllSuccess = false;
          this.ngOnInit();

        }, 2000);
        // this.ngOnInit;
      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showsendAllFail = true;


      }
    )
  }

  getAllAdminMessages() {
    this.userServ.getAllAdminMessages("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all messages response");
        // console.log(response.data);
        this.messageObject = response.data;
        // console.log(this.messageObject.profileId);
        for (const singleMessage of this.messageObject) {
          // console.log("single profile for message is ====");

          // console.log(singleMessage.profileId);
          this.userServ.getOneProfileData(singleMessage.profileId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
            (response: any) => {

              // console.log(response);
              this.messageReceiverName = response.data.firstName + " " + response.data.lastName;
              // console.log("message receiver profile response");
              // console.log(this.messageReceiverName);
              this.messageReceiverNames.push(this.messageReceiverName);



            }
          )

        }




      },
      err => {
        console.log(" no messages");
        console.log(err);

      }


    )

  }

  // math(number){
  //   Math.round(number)
  // }
  getUnpaidBalance() {
    this.userServ.getUnpaidBalance("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("unpaid balance response");
        console.log(response);
        this.unpaidBalance = response.data;


      },
      err => {
        console.log(" no unpaid balance");
        console.log(err);

      }


    )

  }


  payForPartner(partnerId) {
    this.showLoader = true;
    this.userServ.updateUnpaidBalance({ "status": "paid" }, partnerId, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        this.showLoader = false;
        console.log(Response);
        this.showPaySuccess = true;
        // setTimeout(() => {
        //   this.showPayDialog = false;
        // this.ngOnInit();
        // }, 2000);
        setTimeout(() => {
          this.ngOnInit();

        }, 2000);

      },
      err => {
        this.showLoader = false;
        console.log(err);
        this.showPaySuccess = false;
        this.showPayFail = true;

      }
    )
  }

  getExpiredJobs() {
    this.userServ.getExpiredJobs("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("expired jobs object ---------------------- ");

        // console.log(response.data);
        this.expiredJobs = response.data;
        for (const project of this.expiredJobs) {
          this.expiredStatusArray.push(project);

        }

      },
      err => {
        console.log(err);

      }
    )
  }
  previewProfileData(user) {
    this.userServ.selectedUser.next(user)
    this.route.navigate(["previewProfileData/" + user._id]);
  }
  // get all jobs

  getAllJobs() {

    this.projectServ.getAllProjectsForAdmin("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all admin jobs object ---------------------- ");

        // console.log(response.data);
        this.allJobsAdmin = response.data;
        // this.allClients = response.data;

        for (const project of response.data) {
          if (project.status == "prePayment") {
            this.prePaymentStatusArray.push("1");
          }
          else if (project.status == "active") {
            this.activeStatusArray.push("1");
          }
          else if (project.status == "pending") {
            this.pendingStatusArray.push("1");
          }
          else if (project.status == "inprogress") {
            this.inprogressStatusArray.push("1");
          }
          else if (project.status == "reviewing") {
            this.reviewingStatusArray.push("1");
          }
          else if (project.status == "rejected") {
            this.rejectedStatusArray.push("1");
          }
          else if (project.status == "completed") {
            this.completedStatusArray.push("1");
          }

        }

      },
      err => {
        console.log(err);

      }
    )
  }




  getAllArcheivedJobs() {

    this.projectServ.getArcheivedProjectsForAdmin("admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        console.log("all archived jobs object ---------------------- ");

        console.log(response.data);
        this.allArcheivedProjects = response.data

        // for (const project of response.data) {
        //   if (project.status == "prePayment") {
        //     this.prePaymentStatusArray.push("1");
        //   }
        //   else if (project.status == "active") {
        //     this.activeStatusArray.push("1");
        //   }
        //   else if (project.status == "pending") {
        //     this.pendingStatusArray.push("1");
        //   }
        //   else if (project.status == "inprogress") {
        //     this.inprogressStatusArray.push("1");
        //   }
        //   else if (project.status == "reviewing") {
        //     this.reviewingStatusArray.push("1");
        //   }
        //   else if (project.status == "rejected") {
        //     this.rejectedStatusArray.push("1");
        //   }
        //   else if (project.status == "completed") {
        //     this.completedStatusArray.push("1");
        //   }

        // }

      },
      err => {
        console.log(err);

      }
    )
  }


  getJobConfig() {
    this.projectServ.configJop(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (configResponse: any) => {
        this.mainprojectConfig = configResponse.data[0]._id;
        this.projectConfig = configResponse.data[0].jobConfig;
        // console.log("main config");

        // console.log(this.mainprojectConfig);

      },
      err => {
        console.log("error in getting project configuration");
        console.log(err);
        if (err.error.mesaage == "Token is expired, Please try to sign in first") {
          alert("تم انتهاء جلسه الدخول من فضلك قم باعادة تسجيل الدخول")
          // localStorage.clear()
          // this.route.navigate["/login"]
        }

      }
    )

  }
  editJobConfig(size, amount, day1, day2, day3, config) {
    // console.log(size.value);
    // console.log(amount.value);
    // console.log(day1.value);
    // console.log(day2.value);
    // console.log(day3.value);
    if (size.value < 0 || amount.value < 0 || day1.value < 0 || day2.value < 0 || day3.value < 0) {
      alert("price inputs must be positive numbers")
    }

    else {

      let editObj = {
        _id: config._id,
        id: config.id,
        name: config.name,
        amount: amount.value,
        size: size.value,
        day1: day1.value,
        day2: day2.value,
        day3: day3.value
      }
      console.log(editObj);
      this.projectServ.editConfig(editObj, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.mainprojectConfig).subscribe(
        (response) => {
          console.log("prices edited successfully");
          console.log(response);
          this.showEditSuccess = true;
          // this.route.navigate(["/dashboard"])


        },
        err => {
          this.showEditSuccess = false;
          this.showEditFail = true;
          console.log("error in update prices");
          console.log(err);


        }
      )
    }



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
              }, 3000);
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
            }, 3000);
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
  getAllPromoCodes() {
    this.userServ.getAllPromocodes(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        // console.log("all promo codes response");
        // console.log(response);
        this.allPromoCodes = response.data;
        // console.log(this.allPromoCodes);
      },
      err => {
        console.log(err);

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
      }, 1000);

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


  showArchiveDialog(project) {
    this.projectToArchive = project;
    this.archieveMode = true;
  }

  closeArchiveDialog() {
    this.archieveMode = false;
  }

  showDeleteprojectDialog(project) {
    this.projectToDelete = project;
    this.deleteprojectMode = true;

    console.log("you will delete project with id ");
console.log(JSON.stringify(this.projectToDelete) );

console.log(this.projectToDelete._id);
  }
  closeDeleteprojectDialog() {
    this.deleteprojectMode = false;
  }

  deleteProject(){


    this.showLoader = true;

    this.projectServ.deketeProject(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"),"article",localStorage.getItem("email"),this.projectToDelete._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          this.deleteprojectMode = false;
        }, 3000);

        this.getAllArcheivedJobs()



      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )

  }

  archiveProject() {
    // alert(JSON.stringify(this.projectToArchive))

    this.showLoader = true;
    this.projectServ.editJob({ status: "archived" }, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"), this.projectToArchive._id).subscribe(
      (response: any) => {
        this.showLoader = false;
        this.deleteSuccess = true;
        setTimeout(() => {
          this.archieveMode = false;
        }, 3000);



      },
      err => {
        this.showLoader = false;
        console.log("something went wrong");
        console.log(err);
        this.deleteFail = true;


      }
    )
  }




}
