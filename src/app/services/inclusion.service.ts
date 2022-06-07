import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Data, ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InclusionService {
  package_id: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
  }

  public CreateInclusion(package_id: any) {
    let data: any;
    return this.http.get(environment.ip + '/inclusion/create/' + package_id);
  }

  public CreateExclusion(package_id: any) {
    let data = {
      pkg_id : package_id
    }
    return this.http.post(environment.ip + '/exclusion-List', data);
  }

  public addInclusion(package_id: any, credentials: any) {
    let addinlcusion = this.http.post(environment.ip + '/inclusion/' + package_id + '/addinclusionlist', credentials);
    return addinlcusion;
  }
   public UpdateInclusion(id: any, data:any) {
    let UpdateInclusion = this.http.post(environment.ip + '/inclusion-name/' + id , data);
    return UpdateInclusion;
  }
  public saveInclusion(package_id: any, inclusion_selected: any) {
    let data = {
      names : inclusion_selected
    }
    let addinlcusion = this.http.post(environment.ip + '/inclusion/' + package_id + '/update', data);
    return addinlcusion;
  }

  public addExclusion(package_id: any, credentials: any) {
    let addexlcusion = this.http.post(environment.ip + '/exclusion/store/' + package_id, credentials);
    return addexlcusion;
  }

  public deleteExclusion(exclusionId: any) {
    const result = this.http.delete(environment.ip + '/exclusion/' + exclusionId + '/delete');
    return result;
  }

  public deleteInclusion(Id: any) {
    const result = this.http.delete(environment.ip + '/inclusion/' + Id + '/delete');
    return result;
  }
}
