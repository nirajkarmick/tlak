import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  // search dropdown by key
  public pullSearch() {
    let result = this.http.get(environment.pullit + 'search-pullit');
    return result;
  }

  // search by country
  public pullSearchByCountry(country_id: any) {
    let result = this.http.get(environment.pullit + 'pullcountry?country_id=' + country_id);
    return result;
  }

  // destination/POI results
  public pullSearchByKey(keyword: any) {
    let result = this.http.get(environment.pullit + 'search-pullit-poi?keyword=' + keyword);
    return result
  }


  // destination data
  public pullSearchByDestination(dest_id: any) {
    let result = this.http.get(environment.pullit + 'tlk_pulldestination?dest_id=' + dest_id);
    return result;
    // https://api.tutterflycrm.com/ptprog/api/tlk_pulldestination?dest_id=4092
  }

  // Poi data
  public pullSearchByPoi(poi_id: any) {
    let result = this.http.get(environment.pullit_web + 'pullpoiTlakxm?poi_id=' + poi_id);
    return result;
  }

  // post location
  public location_create(package_id: any, all_search_data: any) {
    let data: any;
    data = {'all_search_data': all_search_data}
    return this.http.post(environment.ip + '/location-pois-bypkg/store/' + package_id, data);
  }

  // get selected data
  public getLocationWisePois(package_id: any) {
    let result = this.http.get(environment.ip + '/get-location-wise-pois?package_id=' + package_id);
    return result;
  }

  public DeleteLocation(location_id: any, package_id: any) {
    let data: any;
    data = {'package_id': package_id}
    return this.http.post(environment.ip + '/delete/destination/' + location_id, data);
  }

  /*============================================
              POI List API
  ============================================*/
  public getPOIlist(page: any) {
    let result = this.http.get(environment.ip + '/poi' + '?page=' + page);
    return result;
  }

  public delPoi(viewPoiid: any) {
    return this.http.delete(environment.ip + '/poi-delete/' + viewPoiid);
  }

  // post poi
  public addPOI(all_data: any) {
    return this.http.post(environment.ip + '/add-pois', all_data);
  }

  // destination/POI results
  public search_destination(keyword: any) {
    let result = this.http.get(environment.pullit + 'search_destination?keyword=' + keyword);
    return result
  }

  public poi_types() {
    let data: any;
    return this.http.get(environment.pullit_web + 'api/get-poi-types');
  }
}
