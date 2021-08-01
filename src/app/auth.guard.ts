import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {UserService} from './services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate { 
  constructor(private userServ:UserService,private route:Router){}
  canActivate(): boolean{
    if(this.userServ.isLoggedIn()){
      return true;
    }


  }
}
