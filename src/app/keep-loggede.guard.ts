import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class KeepLoggedeGuard implements CanActivate {
  constructor(private userServ:UserService,private route:Router){}
  canActivate(): boolean{
    if(this.userServ.isLoggedIn()){
      if(localStorage.getItem("sessionUserType")=='admin'){
        this.route.navigate(["/dashboard"]);
      }
      else{
        this.route.navigate(["/myProjects"]);
      }
      
      return false;
      
    }
    else{
      return true;
    }

  }
  
}
