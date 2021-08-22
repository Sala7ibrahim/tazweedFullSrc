import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFolderOpen, faTimes, faCheck, faThList } from '@fortawesome/free-solid-svg-icons';
import { ManageImageService } from '../services/manage-image.service';
import { UserService } from '../services/user.service';
import { UUIDService } from '../services/uuid.service';
@Component({
  selector: 'app-preview-profile-data-by-admin',
  templateUrl: './preview-profile-data-by-admin.component.html',
  styleUrls: ['./preview-profile-data-by-admin.component.css']
}) 
export class PreviewProfileDataByAdminComponent implements OnInit {
  uuidValue: any;
  userImageBase;
  selectedUser: any;
  faFolderOpen = faFolderOpen;
  faTimes = faTimes;
  faCheck = faCheck;
  faThList = faThList;
  selectedUserImage = null;
  profileId;
  userobj;
 
  constructor(private imageServ: ManageImageService,
    private Uuid: UUIDService,
    private route: Router,
    private userServ: UserService,
    private actroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.uuidValue = this.Uuid.generateUUID();

    
    this.profileId = this.actroute.snapshot.params["id"];
    // console.log("profile id is === ");
    // console.log(this.profileId);


    this.userServ.getOneProfileData(this.profileId,"partner", this.uuidValue, localStorage.getItem("auth")).subscribe(
      (response: any) => {



        
        console.log("general data for this user data ====== ");
        console.log(response.data);
        this.userobj = response.data;

      },
      err => {
        console.log(err);

      }
    )

  }

}
