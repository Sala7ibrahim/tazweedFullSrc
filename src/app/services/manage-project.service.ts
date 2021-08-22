import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManageProjectService {
  baseUrl: string = "https://www.tazweedservice.ml/rest/api/v1/";
  selectedPoject = new BehaviorSubject<any>("");

  constructor(private http: HttpClient) { }


  configJop(customerType: string, X_Request_ID: string, token) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/config/job", { headers: headers });


    //https://www.tazweedservice.ml/rest/api/v1/admin/config/job/public
  }

  editConfig(data, customerType: string, X_Request_ID: string, token, jopConfigId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "admin/config/job/" + jopConfigId, data, { headers: headers });
  }

  addJop(data, customerType: string, X_Request_ID: string, token, X_Job_Type: string) {



    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-Job-Type': X_Job_Type

    })
    console.log(headers);
    return this.http.post(this.baseUrl + "profile/job", data, { headers: headers });
  }


  getAllProjects(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "job/profile", { headers: headers });
  }




  getAllProjectsForAdmin(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "admin/job", { headers: headers });
  }

  getArcheivedProjectsForAdmin(customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    console.log(this.baseUrl + "admin/job/archived");

    return this.http.get(this.baseUrl + "admin/job/archived", { headers: headers });
  }

  //admin/profile?customerType=partner


  getMyProjects(customerType: string, X_Request_ID: string, token, userId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // + "?status=prePayment&redirectToPaymentGetway=false"

    return this.http.get(this.baseUrl + customerType + "/job/" + userId, { headers: headers });

  }


  // getAllCartProjects(customerType: string, X_Request_ID: string, token, UserID) {


  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'X-Customer-Type': customerType,
  //     'X-Request-ID': X_Request_ID,
  //     'auth': token

  //   })

  //   return this.http.get(this.baseUrl + customerType + "/job/" + UserID + "?status=prePayment&redirectToPaymentGetway=false", { headers: headers });
  // }

  editJob(data, customerType: string, X_Request_ID: string, token, jopId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "profile/job/" + jopId, data, { headers: headers });
  }


  addPurposalToJob(data, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "proposal", data, { headers: headers });
  }
  getJobPurposals(jobId, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "proposal/job/" + jobId + "?status=inprogress", { headers: headers });
  }

  repayJop(data, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.post(this.baseUrl + "payment", data, { headers: headers });
  }



  deketeProject(customerType: string, X_Request_ID: string, token, X_Job_Type, x_user_email, projectId) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token,
      'X-Job-Type': X_Job_Type,
      'x-user-email': x_user_email

    })

    return this.http.delete(this.baseUrl + "job/profile/" + projectId, { headers: headers });

    //https://www.tazweedservice.ml/rest/api/v1/job/profile/:_id  
  }





  getAllCartProjectsNew(customerType: string, X_Request_ID: string, token, User) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    // console.log(this.baseUrl + customerType + "/job/" + User + "?status=prePayment&redirectToPaymentGetway=false");

    return this.http.get(this.baseUrl + customerType + "/job/" + User + "?status=prePayment&redirectToPaymentGetway=false", { headers: headers });
  }




  deletePurposal(purposalId, customerType: string, X_Request_ID: string, token) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.delete(this.baseUrl + "proposal/" + purposalId, { headers: headers });

  }

  getPartnerPurposals(partnerId, customerType: string, X_Request_ID: string, token) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "proposal/profile/" + partnerId + "?status=inprogress", { headers: headers });

  }



  editPurposal(data, customerType: string, X_Request_ID: string, token, purposalId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.put(this.baseUrl + "proposal/" + purposalId, data, { headers: headers });
  }


  getConfigJopPublic() {
    return this.http.get(this.baseUrl + "admin/config/job/public");

  }




  getProjectRatings(profileId, customerType: string, X_Request_ID: string, token, jobId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
    return this.http.get(this.baseUrl + "profile/rate/" + profileId + "?jobId=" + jobId, { headers: headers });

  }


  getMyCompletedProjects(customerType: string, X_Request_ID: string, token, userId) {


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Customer-Type': customerType,
      'X-Request-ID': X_Request_ID,
      'auth': token

    })
// console.log(this.baseUrl + customerType + "/job/" + userId + "?status=completed");


    return this.http.get(this.baseUrl + customerType + "/job/" + userId + "?status=completed", { headers: headers });

  }

}