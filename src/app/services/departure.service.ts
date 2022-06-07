import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Data, ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DepartureService {
  package_id: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) {

    this.package_id = this.route.snapshot.queryParams['package_id'];
  }

  public departure_create(credentials: any) {
    let data: any;
    return this.http.post(environment.ip + '/departures/store', credentials);
  }

  public departure_update(credentials: any, pkg_id: any) {
    return this.http.patch(environment.ip + '/departure/' + pkg_id + '/update', credentials);
  }

  public country_list() {
    let data: any;
    return this.http.get(environment.ip + '/country-list');
  }

  public departureGet(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/departure/' + package_id + '/edit');
  }

  // Get process menu list
  public proccessStatus(package_id: any) {
    return this.http.get(environment.ip + '/departure-process-status?package_id=' + package_id);
  }

  public publishItineraryFinder(package_id: any) {
    let data = {
      id: package_id
    };
    return this.http.post(environment.ip + '/itineraryFinder/' + package_id, data);
  }


}
