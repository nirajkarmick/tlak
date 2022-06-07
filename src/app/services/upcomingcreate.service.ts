import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Data, ActivatedRoute, Router } from "@angular/router"

@Injectable({
  providedIn: 'root'
})
export class UpcomingcreateService {
  package_id: any;
  private customHttpClient: HttpClient;
  constructor(
    private http: HttpClient,
    private backend: HttpBackend,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    this.customHttpClient = new HttpClient(backend)
  }

  public upcomingList() {
    return this.http.get(environment.ip + '/optional-departure');
  }

  public createUpcomming(data: any) {
    return this.http.post(environment.ip + '/optionaldeparture/storetoor', data);
  }

  public UpdateUpcomming(data: any) {
    return this.http.post(environment.ip + '/optionaldeparture/updateToor', data);
  }

  public UpcommingStatus(data: any) {
    return this.http.post(environment.ip + '/upcommingTourStatus', data);
  }

  public getUpcomming(id: any) {
    return this.http.get(environment.ip + '/optionaldeparture/editToor/' + id);
  }

  public deleteupcomming(departureId: any) {
    return this.http.delete(environment.ip + '/destroyUpcomingTours/' + departureId);
  }

  public upcommingToursDeparture(package_id: any) {
    return this.http.get(environment.ip + '/upcoming-tours/' + package_id + '/edit');
  }

  public upcomgUpdate(data: any) {
    return this.http.post(environment.ip + '/upcoming-tours/' + this.package_id + '/update', data);
  }

  public upcomgUpdateStatus(upcomingStatusId:any) {
    var data:any
    return this.http.post(environment.ip + '/departure-disable/' + upcomingStatusId, data);
  }
}