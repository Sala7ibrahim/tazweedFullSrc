import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageImageService } from '../services/manage-image.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
import { faFolderOpen, faTimes, faCheck, faThList } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-preview-profile-data',
  templateUrl: './preview-profile-data.component.html',
  styleUrls: ['./preview-profile-data.component.css']
})
export class PreviewProfileDataComponent implements OnInit {
  uuidValue: any;
  userImageBase;
  selectedUser: any;
  faFolderOpen = faFolderOpen;
  faTimes = faTimes;
  faCheck = faCheck;
  faThList = faThList;
  selectedUserImage = null;
  constructor(private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService) { }

  ngOnInit(): void {
    this.userServ.selectedUser.subscribe(
      (response) => {
        this.selectedUser = response;
      }
    )
    this.uuidValue = this.Uuid.generateUUID();
    console.log("this.uuidvalue");
    console.log(this.uuidValue);

    const userProfileData = {
      profileId: this.selectedUser._id,
      email: this.selectedUser.email
    }
    this.retrieveProfileImage(userProfileData);

  }


  reteieveProfileData() {
    // retrieve profile data 
    this.userServ.getOneProfileData(localStorage.getItem("userId"), localStorage.getItem("sessionUserType"), this.uuidValue, localStorage.getItem("auth")).subscribe(
      (userProfileResponse: any) => {
        console.log("all user profile object is --------------------------");
        console.log(userProfileResponse.data);




      }
    )
  }

  retrieveProfileImage(userProfileObject) {
    this.imageServ.retrieveImageFromServer(userProfileObject,
      localStorage.getItem("sessionUserType"),
      this.uuidValue,
      localStorage.getItem("auth")

    ).subscribe(
      (userImageResponse: any) => {

        if (userImageResponse.data.body.data == null) {
          console.log("no image found");
          this.selectedUserImage = "data:image/png;base64,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";


        }
        else {
          this.selectedUserImage = userImageResponse.data.body.data.image;
        }
        // console.log("user profile image exist");
        // console.log(userImageResponse);
        // this.selectedUserImage = userImageResponse.data.body.data.image;


        // if (this.selectedUserImage == null || userImageResponse.data.body.data == null) {
        //   this.selectedUserImage = "default";
        // }



      },
      err => {
        console.log("user profile image is not found");
        console.log(err);
        // this.selectedUserImage = "default";
        this.selectedUserImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA7CAYAAAA5MNl5AAAABHNCSVQICAgIfAhkiAAACGtJREFUaEPtmVtsFNcZx//f7GLX4lIHUwgGjHEDdeyCLyTY3Neq2gSpje0m+AGnKq7UB9qHGKlFqvqAVakkUKjtVqSibYRJ2qRVHgzYYQ1N6iWNRNVCWAxrvNgUcFMpvagx4ZLinXO+amZ2xrP39c5YqFLHD+OZPZfvd77rOUOYgSt82tcEyCpi8jFQrU1BQJCJA8yeYPnTgyfcnpbcHPCq31fqIT7KgC/DuEFSqG3VlwJBt+Z3DWRkwNdO4L0ACrMVjsHt5U+/251t+3TtXAEJnazfCcLRXAQiot0VXz7XlUtfex/HIBd7q0uJlYvT0USc0BNMsqamOXjTCYxjkAu/rQgwaKsTIUAIPNESanAyhiOQc6895iOFBp0IYPZlyQ3rvzYWyHUsRyDvHS1pB6Ez18lj+jF2b2obz9lXHIEM/nJRFzFecAOEwccavvmPnbmO5Qjkdy8/opmCM/+Ykjz4xW99VPNQQPzdswMAuwRCZ7e9cC9TIk3J6UgjfT/ydoD0JOjCRd1f+Y7anutAjkBOHsBORm6JMF5gAtqe2YOehwLSewDVCqAlQ8eXBGqa9yDn2suRRjTpTxyAFjKdRq7uxj3I2aw0ORyD9HaikCIIErA8F7UwcItnobp5NyZy6W/2cQyiDeTExCShofm7yDmjuwpiwRB6wKjKZmV1TQBNTvzCPo8rGrEPeGI/OkDIFJK75Sx0ODWnGQXRtdOJQqioViR8IGOrC0ZQKgjAi6CbAK6bVjbmNJNtXDetmRQ23dj/B3lYK59q3mlr5Kq/vhQRWh6BCqgqtD/j3wi0f1RV1ecy7uZz9K43je2XTLB5RUsmFy1cli8VZUL13h2temroXqaFywhy7Yyvmlk2gqmJmatZCgihglkad/1ZGHcZvevvo7+z7XfzvTT6SSkT5MsvmHttWdnqBQTMZ8l6uJNS3gbxdUj2A3RkddOf/xrfMSWIdtimGCW6tWubEt4GkVF4E9IGF4XXhLRfBbMLx5Yur1gEYK42l3ZJNmBMKNaf5SmwOFT11aHfpw2/1/ybdzIpCedUUl9FASlUfTX1O2vPce+l7Xe9vYi2i31vh5jz6QVDi4tXrgRRgQlhCM0GDDOMZ+3fKKRUX6p59vL3iSATNBIe2KoBJOydtc6W8BqELmwchNZGh7S9TwGlmZ55Fc4vHlzwaOlmAnsNDUSF1eU32plQ+t0OJeXe2pbLP4gBGRnY0kWgpCW5YVY2H0jqI7Hmk1wTxiKYq1u0sOTc/AVL18estCl81EdiIDSo6CKYkGBZaYGkMidz1SxzSqsJm0YymKE27qLFZRfmPvLoWt0HUpiPpREbFJvto1AMPqKD3Bj0FU4+4Bupjj21SdyOVouXfe78nLlFT1g+kGSlk5vTlK9ITXO6pYmwDhL2b+kAUcqK1e1oVfLZ1Wfz8mfrpy+x0cjm0Dbz0V3ejF4xmrPaj1NUGx+lSzjuRSuBkrI1F7x5+WstB7YcNy4qxTn6lDmZodgeCEQ/hU9vbgIrvalA3IpW2sovK/v8ZY83b7VhDmY0skWlKFSMD1iOnyR6TeWXb1PYv6UHRF9PB+I0WoF5fElp5X3F4y03zCmdUAakYU6JkFZgiP7OzH+r23FtKY34twSIUn8WcBatxCWPovy8eHnlN5gxFZ3sQkpT6GgGj8nkqTU3lfHlU/XPj52h8MBWzT+Sfi7LNVqpqnoWItJRXPb4CNirfXYon7Y5pTI/e7kC0Vy34/pxTcsaSGzBY7Ox6UYrKdVjUCc7GnZN3Ayd3FhCJAMMrJgyB7PcSO8j8eajLYIeaq3oJa8TuHHdjrGQVWulA8kqWgl5W7LapULtaWj7UP98NtxXtxLkCTBzsR3CqpUsc4rzlZhMboON+pSUcgLELy58EPnJirab/7H7dUqNZIpWQkRuseSuAvHvnpq2CetwbcRft0YIZRDM81NXr4lCJhSK9kzOfAcsflqAyYNrWseTpoq0IEmjlRCXpIh0rWsdTThwDvs3PKmqOANI3efsSUz3t7jqVRde94U4R9eTHrTiMwziQ6rn/q82tHzwSbpclxIkIVppDgzZUbP9StJTwVD/xs2A8DNj9rSqV2vfYULpqhiQgrvrWkdOpxM+o2nZo5VkeUzISFdNczDlSXnoVP02kkovs8w3zClq+1lWr9GC8Z5geYyEeujJ1tG/ZAuQ1tmZ5W2hqj2Kyl2PN/8x7ffvUN+G50D8Zs7VqxD/AuHHamTycP3zYx9PFyApCDNuEbgn71Mfd61oCGY8HQ/11bcS8KoElNiMnW4zZPgKM48zyYNFd+//Ij4C5QKj+4gGoEB2rNr2h6y/GA331+9i4DBL7dOE6cjJC7+Y6lXKq8y8/87C0K8bGrQjFXcuGvVv8q3c9t60jvVDfeu/B8K+WHNKEpVsNRUz/4lZvlS7/cpxorhTBxdYMh4Hxc9xpX99JzHa0+2lY3dw4h2AXqzdPvSOC/KmHCJrEGbQ8Fv1hwHalbl6FVomOM4s9tU+d+X8TAJYzp7NJMxQhvvrXwXQmpDUbNUrg1Vmft3jlfuqGofC2YztVpuMGuHza2cNf5j3JhiNqTZDUvInAL9CEPurnh36wC3hpjNOWpDRU4/lT4rPvAXwF2LLjejmh3GbWbzMgjprWy7+czoTu902JUhosGIO7s7zA9iUxJz+zoyD+Z67R8obw3fcFiqX8ZKC3OitLrznzX+bQGvtZ68MDoFFpzfy4LXKluHJXCacqT4JIFffXlck79O7IKqwzEnKM5JkZ1Xj+wMzJYjTcWOPTE9sLFYVdRCgVfoBAOMNDz34YeUzl6ydmNMJZ6q/BTJyct0KQUoAjCWCxW88EB2Vje+PzdTEbo9rgVzuq/8ZQc4jqe79XwIwF+S/gGASAA4W8a0AAAAASUVORK5CYII=";



      }
    )
  }


  activateAccount(profileId) {
    this.userServ.updateProfileByAdmin(profileId, { "status": "active" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.route.navigate(["/dashboard"]);

      },
      err => {
        console.log(err);


      }
    )
  }

  deActivateAccount(profileId) {
    this.userServ.updateProfileByAdmin(profileId, { "status": "pending" }, "admin", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (Response: any) => {
        console.log(Response);
        this.route.navigate(["/dashboard"]);

      },
      err => {
        console.log(err);

      }
    )
  }
}
