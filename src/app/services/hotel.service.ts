import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Data, ActivatedRoute, Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class HotelService {
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

  public hotel_list(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/hotel/' + package_id);
  }

  public search_hotels(hotel_name: any) {
    let result = this.customHttpClient.get('https://engine.hotellook.com/api/v2/lookup.json?query=' + hotel_name + '&lang=en&lookFor=hotel&limit=10&token=3ab817b8117c83d3ab36b9f6015c988d');
    return result;
  }

  getGeoAddress(latitude: any, longitude: any) {
    var results = this.customHttpClient.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=AIzaSyDeTjgskGjNdPAOLeHfFN98yr8-UPH-O2I");
    return results;
  }

  public Travellerslist(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/people/create/' + package_id);
  }

  public hotelData(package_id: any, hotelForm: any) {
    return this.http.post(environment.ip + '/hotel/store/' + package_id, hotelForm);
  }

  public hotelUpdate(package_id: any, hotelForm: any, hotel_id: any) {
    return this.http.post(environment.ip + '/hotel/update/' + hotel_id, hotelForm);
  }

  public hoteldelete(HotellistId: any) {
    return this.http.delete(environment.ip + '/hotel-delete/' + HotellistId);
  }

  public getSocket (country:any) {
    return this.http.get(environment.pullit_web + 'api/socket/'+ country)
  }
  
}
