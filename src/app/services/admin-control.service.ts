import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminControlService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public billing() {
    return this.http.get(environment.ip + '/billing');
  }

  public billingDetails() {
    return this.http.get(environment.ip + '/payment-details');
  }

  public roles() {
    return this.http.get(environment.ip + '/roles/page');
  }

  public users() {
    return this.http.get(environment.ip + '/users');
  }

  public travellers() {
    return this.http.get(environment.ip + '/travellers');
  }

  public travellersList(id: any) {
    return this.http.get(environment.ip + '/travellers/package/' + id);
  }

  public operatorList(id: any) {
    return this.http.get(environment.ip + '/user/package/' + id);
  }

  public travellerLogout(userId: any) {
    let result = this.http.get(environment.ip + '/loginTraveller?up_id=' + userId);
    return result;
  }

  public operatorLogout(pkgid: any, type: any) {
    var data = {
      up_id: pkgid,
      type: type
    }
    return this.http.post(environment.ip + '/logoutOperator', data);
  }

  // create role name
  public createRole(data: any) {
    return this.http.post(environment.ip + '/add_role', data);
  }

  // add users
  public addRole(data: any) {
    return this.http.post(environment.ip + '/add_user', data);
  }

  public userCreate() {
    return this.http.get(environment.ip + '/users/create');
  }

  //User update form
  public userUpdate(userListId: any) {
    return this.http.get(environment.ip + '/users/edit/' + userListId);
  }

  // users update send
  public sendUser(userListId: any, data: any) {
    return this.http.post(environment.ip + '/update_user/' + userListId, data);
  }

  //email send
  public emailSend(userListId: any,) {
    let data: any;
    return this.http.post(environment.ip + '/resend-email/' + userListId, data);
  }

  public rolesUpdate(role_id: any, data:any) {
    return this.http.post(environment.ip + '/role-update/' + role_id, data);
  }

  public ActiveUser(id: any) {
    var data :any;
    return this.http.post(environment.ip + '/activate-user/' +  id, data);
  }


  public InactiveUser(id: any) {
    var data :any;
    return this.http.post(environment.ip + '/inactivate-user/' + id, data);
  }

  public downloadSample(id: any) {
    return this.http.get(environment.ip + '/print-pdf/' + id);
  }

}
