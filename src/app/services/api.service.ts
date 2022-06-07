import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {tokenize} from '@angular/compiler/src/ml_parser/lexer';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable()
export class ApiService {
  package_id: any;
  tenant_id = localStorage.getItem('tenant_id');

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id']
  }

  public getDashboardData(): Observable<any> {
    return this.http.get(environment.ip + '/dashboard');
  }

  public getdepartureData(page: any, keyword: any, fromdate: any, todate: any, status: any): Observable<any> {
    return this.http.get(environment.ip + '/departure?page=' + page + '&search=' + keyword + '&from=' + fromdate + '&to=' + todate + '&status=' + status);

    return this.http.get(environment.ip + '/departure?page=' + page);

  }

  public realTimeTrack(dep_id: any) {
    return this.http.get(environment.ip + '/getLatLong/' + dep_id);
  }

  // forget password email api
  public forgetPass(credentials: any) {
    let data: any;
    return this.http.post(environment.ip + '/forgot-password', credentials);
  }

  //  password rest api
  public resetPass(credentials: any, token: any) {
    let data: any;
    return this.http.post(environment.ip + '/password/reset/' + token, credentials,);
  }

  public updatePass(credentials: any) {
    let data: any;
    return this.http.post(environment.ip + '/settings/email-password/update/password', credentials,);
  }

  // get email for reset password
  public email(token: any) {
    let data: any;
    data = {'token': token}
    return this.http.post(environment.ip + '/check-token', data);
  }

  public Search(keyword: any, fromdate: any, todate: any, status: any) {
    return this.http.get(environment.ip + '/departure?search=' + keyword + '&from=' + fromdate + '&to=' + todate + '&status=' + status);
  }

  public copyDeparture(package_id: any) {
    let data: any;
    return this.http.post(environment.ip + '/settings/email-password/update/password' + package_id, data);
  }

  /*=================================================
              Departure Billing
  ===================================================*/
  public depBilling(package_id: any) {
    return this.http.get(environment.ip + '/departure_biling/' + package_id);
  }

  public DepActivate(data: any) {
    //data = {'Id': this.package_id, 'tenant_id':this.tenant_id}
    return this.http.post(environment.ip + '/activate_departure', data);
  }

  public Depdisbale(package_id: any) {
    var data: any;
    //data = {'Id': this.package_id, 'tenant_id':this.tenant_id}
    return this.http.post(environment.ip + '/departure-disable/' + package_id, data);
  }

  /*=================================================
                      Recharge
  ===================================================*/
  public getRecharge() {
    return this.http.get(environment.ip + '/add_credit');
  }

  public payCredit(data: any) {
    //data = {'Id': this.package_id, 'tenant_id':this.tenant_id}
    return this.http.post(environment.ip + '/pay_credit', data);
  }

  public departureCopy(depid: any, formData: any) {
    return this.http.post(environment.ip + '/departure-copy/' + depid, formData);
  }

  // verification User

  public userVerify(id: any, data: any) {
    return this.http.post(environment.ip + '/email/verify/' + id, data);
  }

  public paymentResponse(data: any) {
    return this.http.post(environment.ip + '/payment_response', data);
  }

  // Notification

  public scheduledNotificationstore(package_id: any, data: any) {
    return this.http.post(environment.ip + '/add_scheduled_noticefication/' + package_id, data);
  }
  public intantNotificationstore(package_id: any, data: any) {
    return this.http.post(environment.ip + '/add_instant_noticefication/' + package_id, data);
  }
  public notificationList(package_id: any) {
    return this.http.get(environment.ip + '/notifications/' + package_id);
  }
  public intantNotificationdel(id: any) {
    return this.http.delete(environment.ip + '/instant-notification-delete/' + id);
  }
  public scheduleNotificationdel(id: any) {
    return this.http.delete(environment.ip + '/schedule-notification-delete/' + id);
  }
}
