import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';


@Injectable({
  providedIn: 'root'
})
export class UUIDService {
  uuidValue:string;
  constructor(private http:HttpClient) { }
  generateUUID(){
    this.uuidValue=UUID.UUID();
    return this.uuidValue;
  }
  
}
