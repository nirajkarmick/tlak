import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class ItineraryService {
  package_id: any;

  constructor(private http: HttpClient,
    private backend: HttpBackend,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
  }

  public daywise(package_id: any) {
    return this.http.get(environment.ip + '/get-day-wise-itenaries?package_id=' + package_id);
  }

  public dayDetails(day_no: any,package_id:any) {
    return this.http.get(environment.ip + '/get-day-wise-location-pois/' + day_no + '?package_id=' + package_id);
  }

  public imagesFromPullit(datas: any) {
    var dest = { "destinations": datas };
    let result = this.http.post('https://api.tutterflycrm.com/ptprog//api/det_top_des_img', dest)
    return result;
  }

  public dayItinerary(package_id:any, credentails:any, form:any) {
   var  data = {
      credentails,
      form
    }
    let result = this.http.post(environment.ip + '/itinerary/store/' + package_id, data)
    return result;
  }
}
