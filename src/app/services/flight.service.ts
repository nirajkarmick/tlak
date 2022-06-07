import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
declare var moment: any;

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(
    private http: HttpClient
  ) {
  }

  public flightinfo(data: any, f_date: any) { 
  
    if (f_date) {
      var dd_d = f_date.split('/');
      var day = dd_d[1];
      var month = dd_d[2];
      var year = dd_d[0];
    }
     var date_format=year+"/"+month+"/"+day; 
    var datas = {
      "date_format": date_format,
      "airline": data.airline,
      "flight_no": data.flight_no
    };
    let result = this.http.post(environment.ip + '/search_flight', datas);
    return result;
  }

  public getAirportName (keywords: any) {
    var data = {
     "keyword" : keywords
    }
    let result = this.http.post(environment.pullit + 'get_airports', data);
    return result;
  }

  public Travellerslist(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/people/create/' + package_id);
  }

  public Flightlist(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/flight/create/' + package_id);
  }

  public flightApiPost(package_id: any, originateFlightData:any, selected_people:any) {
    const data = {
      flight: originateFlightData,
      peoples: selected_people,
     }
   // console.log(data)
    return this.http.post(environment.ip + '/flight/store/' + package_id, data);
  }

  public flightApiPostManual(package_id: any, manual_flight:any, selected_people:any) {
    const data = {
      flight: manual_flight,
      peoples: selected_people,
     }
  //   console.log(data)
    return this.http.post(environment.ip + '/flight/store/' + package_id, data);
  }

  public flightApiedit(flightUpdateId: any, manual_flightEdit: any,selected_people:any) {
    const data = {
      flight: manual_flightEdit,
      peoples: selected_people,
    }
    return this.http.post(environment.ip + '/flight/update/' + flightUpdateId, data );
  }

  public deleteFlight (flightID: any) {
    let result = this.http.delete(environment.ip + '/flight-delete/' + flightID);
    return result;
  }
 public searchAirport(datas:any){
  var cors=""; 
    if (location.hostname.search("192.168")>=0  ||  
      location.hostname.search("localh")>=0){ 
         cors="https://cors-anywhere.herokuapp.com/";   
    } 
  let result = this.http.post(cors+environment.pullit+'/get_airports',datas);
  return result;
 }
}
