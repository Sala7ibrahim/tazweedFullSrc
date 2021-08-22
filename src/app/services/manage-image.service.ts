import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageImageService {
  baseUrl:string = "https://www.tazweedservice.ml/rest/api/v1/";   
  profileImagePathShared = new BehaviorSubject<string>("");

  constructor(private http:HttpClient) { } 
  uploadImageToServer(data:FormData,customerType:string,X_Request_ID:string,token){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type':customerType,
      'X-Request-ID':X_Request_ID,
      'auth':token
      
    })

    return this.http.post(this.baseUrl+"uploadImage",data,{ headers: headers });
  }

  retrieveImageFromServer(data,customerType:string,X_Request_ID:string,token){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type':customerType,
      'X-Request-ID':X_Request_ID,
      'auth':token
      
    })

    return this.http.post(this.baseUrl+"retrieveImage",data,{ headers: headers });
  }


}
