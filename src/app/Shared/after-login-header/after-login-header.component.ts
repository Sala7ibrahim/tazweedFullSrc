import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {faQuestionCircle,faShoppingCart, faUserAlt, faFolderOpen,faBriefcase, faHistory, faBell, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from 'src/app/services/manage-image.service';
import { UUIDService } from 'src/app/services/uuid.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ManageProjectService } from 'src/app/services/manage-project.service';


@Component({
  selector: 'app-after-login-header',
  templateUrl: './after-login-header.component.html',
  styleUrls: ['./after-login-header.component.css']
})
export class AfterLoginHeaderComponent implements OnInit {
  allCartProjects;
  uuidValue: any;
  userImageBase;
  public isCollapsed = true;
  constructor(private imageServ: ManageImageService, private Uuid: UUIDService, private route: Router, private userServ: UserService,private projectServ: ManageProjectService) { }
  faUserAlt = faUserAlt;
  faFolderOpen = faFolderOpen;
  faShoppingCart = faShoppingCart;
  faHistory = faHistory;
  faBriefcase = faBriefcase;
  faEnvelope = faEnvelope;
  faBell = faBell;
  faQuestionCircle = faQuestionCircle;
  faSignOutAlt = faSignOutAlt;
  sessionUserType;
  showPartnerPart: boolean = false;
  showClientPart: boolean = false;
  userName: string;
  profileMessages: any;
  messagesStorage: any;
  newProfileImagePath;
  unreadMessagesArray = [];
  adminImage = false;
  readMessageStatus: boolean = false;
  projectsCount = 0;
  showMyPurposals = false;
  myPurposals;
  UserLoggedId;
  ngOnInit(): void {
    this.UserLoggedId = localStorage.getItem("userId");
if(localStorage.getItem("sessionUserType")=='admin'){
  this.adminImage = true;

} 
// localStorage.setItem("auth","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI1ZmY2NWU0OGNlNzRkNTNkOTg1MzMwZmEiLCJpYXQiOjE2MTk3MzI2ODIuNTY5LCJzdWIiOiJ0YXp3ZWVkfDc3IiwiZXhwIjoxNjE5ODIyNjgyLjU2OX0.08taYC3zphJu0XDnl1eA2I3DM5_747McWjCIOdXbMYc")
this.uuidValue = this.Uuid.generateUUID();
    this.sessionUserType = localStorage.getItem("sessionUserType");
    if (this.sessionUserType == "partner") {
      this.showPartnerPart = true;
      this.showClientPart = false;
      

      this.projectServ.getPartnerPurposals(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
        (response: any) => {
          this.myPurposals = response.data;
          // console.log("all purposals array length");
          // console.log(this.myPurposals.length);
          if(this.myPurposals.length==0){
            this.showMyPurposals = false;
          }
          else{
            this.showMyPurposals = true;
          }


       



        },
        err => {
          console.log(err)

        }
      )


    }
    else {
      this.showPartnerPart = false;//showPartnerPart showClientPart
      this.showClientPart = true;
    }

    this.getAllCartProjects()
    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        // console.log(userProfileResponse.data);
        localStorage.setItem("sessionFirstName", userProfileResponse.data.firstName);
        localStorage.setItem("sessionLastName", userProfileResponse.data.lastName);

        this.userName = localStorage.getItem("sessionFirstName") + " " + localStorage.getItem("sessionLastName");



      },
      err=>{
        console.log("error in getting project configuration");
        console.log(err);

        if(err.status==401){
          alert("انتهى وقت الجلسة.. فضلا أعد تسجيل الدخول")
          localStorage.clear()
          this.route.navigate(["/login"]);
        }

        // if(err.error.mesaage=="Token is expired, Please try to sign in first"){
        //   alert("انتهى وقت الجلسة.. فضلا أعد تسجيل الدخول")
        //   // localStorage.clear()
        //   // this.route.navigate(["/login"]);
        // }
      }
    )
    setTimeout(() => {
      this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"));


      // this.messagesStorage.sort((a,b) => a.message.localeCompare(b.message));

    }, 1000);


    // console.log("message from storage ==== " + this.messagesStorage);
    if (!localStorage.getItem("profileMessagesStorage")) {
      this.getProfileMessages();
    }
    else if (this.messagesStorage == null || this.messagesStorage == '' || !this.messagesStorage) {
      this.getProfileMessages();
    }
    else {
      this.messagesStorage = JSON.parse(localStorage.getItem("profileMessagesStorage"))

    }

    this.newProfileImagePath = localStorage.getItem("userImage");

    if (!this.newProfileImagePath) {
      // console.log("first load ");
      this.getUserImage();

    }
    else {
      // console.log("second load ");

    }
    // if (this.newProfileImagePath == null || this.newProfileImagePath == '') {
    //   this.newProfileImagePath = "data:image/png;base64,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";
    // }
    // else {
    //   this.getUserImage();
    // }

  }
  signOut() {
    this.route.navigate(["/login"]);
    this.userServ.signOut(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response)=>{
        console.log("signed out from system");
        console.log(response);
        
        
      }
    )
    localStorage.clear();
  }




  getUserImage() {

    const userProfileData = {
      profileId: localStorage.getItem("userId"),
      email: localStorage.getItem("email")
    }

    this.imageServ.retrieveImageFromServer(userProfileData,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {
        // console.log("user profile image exist");
        // console.log(userImageResponse);
        if (userImageResponse.data.body.data == null) {
          console.log("no image found");
          this.newProfileImagePath = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA7CAYAAAA5MNl5AAAABHNCSVQICAgIfAhkiAAACGtJREFUaEPtmVtsFNcZx//f7GLX4lIHUwgGjHEDdeyCLyTY3Neq2gSpje0m+AGnKq7UB9qHGKlFqvqAVakkUKjtVqSibYRJ2qRVHgzYYQ1N6iWNRNVCWAxrvNgUcFMpvagx4ZLinXO+amZ2xrP39c5YqFLHD+OZPZfvd77rOUOYgSt82tcEyCpi8jFQrU1BQJCJA8yeYPnTgyfcnpbcHPCq31fqIT7KgC/DuEFSqG3VlwJBt+Z3DWRkwNdO4L0ACrMVjsHt5U+/251t+3TtXAEJnazfCcLRXAQiot0VXz7XlUtfex/HIBd7q0uJlYvT0USc0BNMsqamOXjTCYxjkAu/rQgwaKsTIUAIPNESanAyhiOQc6895iOFBp0IYPZlyQ3rvzYWyHUsRyDvHS1pB6Ez18lj+jF2b2obz9lXHIEM/nJRFzFecAOEwccavvmPnbmO5Qjkdy8/opmCM/+Ykjz4xW99VPNQQPzdswMAuwRCZ7e9cC9TIk3J6UgjfT/ydoD0JOjCRd1f+Y7anutAjkBOHsBORm6JMF5gAtqe2YOehwLSewDVCqAlQ8eXBGqa9yDn2suRRjTpTxyAFjKdRq7uxj3I2aw0ORyD9HaikCIIErA8F7UwcItnobp5NyZy6W/2cQyiDeTExCShofm7yDmjuwpiwRB6wKjKZmV1TQBNTvzCPo8rGrEPeGI/OkDIFJK75Sx0ODWnGQXRtdOJQqioViR8IGOrC0ZQKgjAi6CbAK6bVjbmNJNtXDetmRQ23dj/B3lYK59q3mlr5Kq/vhQRWh6BCqgqtD/j3wi0f1RV1ecy7uZz9K43je2XTLB5RUsmFy1cli8VZUL13h2temroXqaFywhy7Yyvmlk2gqmJmatZCgihglkad/1ZGHcZvevvo7+z7XfzvTT6SSkT5MsvmHttWdnqBQTMZ8l6uJNS3gbxdUj2A3RkddOf/xrfMSWIdtimGCW6tWubEt4GkVF4E9IGF4XXhLRfBbMLx5Yur1gEYK42l3ZJNmBMKNaf5SmwOFT11aHfpw2/1/ybdzIpCedUUl9FASlUfTX1O2vPce+l7Xe9vYi2i31vh5jz6QVDi4tXrgRRgQlhCM0GDDOMZ+3fKKRUX6p59vL3iSATNBIe2KoBJOydtc6W8BqELmwchNZGh7S9TwGlmZ55Fc4vHlzwaOlmAnsNDUSF1eU32plQ+t0OJeXe2pbLP4gBGRnY0kWgpCW5YVY2H0jqI7Hmk1wTxiKYq1u0sOTc/AVL18estCl81EdiIDSo6CKYkGBZaYGkMidz1SxzSqsJm0YymKE27qLFZRfmPvLoWt0HUpiPpREbFJvto1AMPqKD3Bj0FU4+4Bupjj21SdyOVouXfe78nLlFT1g+kGSlk5vTlK9ITXO6pYmwDhL2b+kAUcqK1e1oVfLZ1Wfz8mfrpy+x0cjm0Dbz0V3ejF4xmrPaj1NUGx+lSzjuRSuBkrI1F7x5+WstB7YcNy4qxTn6lDmZodgeCEQ/hU9vbgIrvalA3IpW2sovK/v8ZY83b7VhDmY0skWlKFSMD1iOnyR6TeWXb1PYv6UHRF9PB+I0WoF5fElp5X3F4y03zCmdUAakYU6JkFZgiP7OzH+r23FtKY34twSIUn8WcBatxCWPovy8eHnlN5gxFZ3sQkpT6GgGj8nkqTU3lfHlU/XPj52h8MBWzT+Sfi7LNVqpqnoWItJRXPb4CNirfXYon7Y5pTI/e7kC0Vy34/pxTcsaSGzBY7Ox6UYrKdVjUCc7GnZN3Ayd3FhCJAMMrJgyB7PcSO8j8eajLYIeaq3oJa8TuHHdjrGQVWulA8kqWgl5W7LapULtaWj7UP98NtxXtxLkCTBzsR3CqpUsc4rzlZhMboON+pSUcgLELy58EPnJirab/7H7dUqNZIpWQkRuseSuAvHvnpq2CetwbcRft0YIZRDM81NXr4lCJhSK9kzOfAcsflqAyYNrWseTpoq0IEmjlRCXpIh0rWsdTThwDvs3PKmqOANI3efsSUz3t7jqVRde94U4R9eTHrTiMwziQ6rn/q82tHzwSbpclxIkIVppDgzZUbP9StJTwVD/xs2A8DNj9rSqV2vfYULpqhiQgrvrWkdOpxM+o2nZo5VkeUzISFdNczDlSXnoVP02kkovs8w3zClq+1lWr9GC8Z5geYyEeujJ1tG/ZAuQ1tmZ5W2hqj2Kyl2PN/8x7ffvUN+G50D8Zs7VqxD/AuHHamTycP3zYx9PFyApCDNuEbgn71Mfd61oCGY8HQ/11bcS8KoElNiMnW4zZPgKM48zyYNFd+//Ij4C5QKj+4gGoEB2rNr2h6y/GA331+9i4DBL7dOE6cjJC7+Y6lXKq8y8/87C0K8bGrQjFXcuGvVv8q3c9t60jvVDfeu/B8K+WHNKEpVsNRUz/4lZvlS7/cpxorhTBxdYMh4Hxc9xpX99JzHa0+2lY3dw4h2AXqzdPvSOC/KmHCJrEGbQ8Fv1hwHalbl6FVomOM4s9tU+d+X8TAJYzp7NJMxQhvvrXwXQmpDUbNUrg1Vmft3jlfuqGofC2YztVpuMGuHza2cNf5j3JhiNqTZDUvInAL9CEPurnh36wC3hpjNOWpDRU4/lT4rPvAXwF2LLjejmh3GbWbzMgjprWy7+czoTu902JUhosGIO7s7zA9iUxJz+zoyD+Z67R8obw3fcFiqX8ZKC3OitLrznzX+bQGvtZ68MDoFFpzfy4LXKluHJXCacqT4JIFffXlck79O7IKqwzEnKM5JkZ1Xj+wMzJYjTcWOPTE9sLFYVdRCgVfoBAOMNDz34YeUzl6ydmNMJZ6q/BTJyct0KQUoAjCWCxW88EB2Vje+PzdTEbo9rgVzuq/8ZQc4jqe79XwIwF+S/gGASAA4W8a0AAAAASUVORK5CYII=";


        }
        else{
          this.newProfileImagePath = userImageResponse.data.body.data.image;
        }
        // this.userImageBase = userImageResponse.data.body.data.image;
        this.newProfileImagePath = userImageResponse.data.body.data.image;
        // if (this.newProfileImagePath == null) {
        //   this.newProfileImagePath = "data:image/png;base64,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";
        // }
        localStorage.setItem("userImage", this.newProfileImagePath);


      },
      err => {
        console.log("user profile image is not found");
        console.log(err);
        // this.userImageBase = "default";
        localStorage.setItem("userImage", "data:image/png;base64,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");

      }
    )

  }


  getProfileMessages() {
    this.userServ.getProfileMessages(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {
        this.profileMessages = response.data;
        console.log("messages in profile ***************");
        console.log(response.data);
        response.data.sort((a, b) => {
          return <any>new Date(b.createAt) - <any>new Date(a.createAt);
        });
        localStorage.setItem("profileMessagesStorage", JSON.stringify(response.data));
        for (const message of response.data) {
          if (message.read == false && message.from != this.UserLoggedId) {
            this.unreadMessagesArray.push(message);
            // this.readMessageStatus = false;
          }
          else {
            // this.readMessageStatus = true;
          }

        }



      },
      err => {
        // console.log("no messages");
        console.log(err);


      }
    )
  }
 
  readMessage(message) {

    this.userServ.updateMessage(message._id, localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response) => {
        // console.log("message updated to status read");
        // console.log(response);
        this.ngOnInit();
        this.userServ.messageToRead.next(message);
        this.route.navigate(["/messageDetails"]);


      },
      err => {
        console.log("error in update message " + err);

      }
    )
  }


  getAllCartProjects(){
    this.projectServ.getAllCartProjectsNew(localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth"),localStorage.getItem("userId")).subscribe(
      (response: any) => {
        // console.log("all cart projects");
        // console.log(response);
        
        this.allCartProjects = response.data;
        this.projectsCount = this.allCartProjects.length;

     
      

      },
      err => {
        console.log("something went wrong");
        console.log(err)


      }
    )
  }
 
 

  openAllMessags(message){

    if (message.from == this.UserLoggedId) {

      this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
        this.route.navigate(["/previewAllMessages/" +message._id.profileId ]);

      });
      
      
    }
    
    else{
      
      this.route.navigateByUrl('/afterLoginHeader', { skipLocationChange: true }).then(() => {
        this.route.navigate(["/previewAllMessages/" +message._id.from ]);

      });
    }
 


  }

}
