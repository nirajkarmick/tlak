import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Data, ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  package_id: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router,) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
  }

  // create apis

  public addManager(package_id: any, credential: any) {
    return this.http.post(environment.ip + '/communication-manager/store/' + package_id, credential);
  }

  public addTourGuide(package_id: any, credentials: any) {
    return this.http.post(environment.ip + '/communication-guide/store/' + package_id, credentials);
  }

  public addContact(package_id: any, credentials: any) {
    return this.http.post(environment.ip + '/communication-scontact/store/' + package_id, credentials);
  }

  public addPlacard(package_id: any, credentials: any) {
    return this.http.post(environment.ip + '/communication-placard/store/' + package_id, credentials);
  }

  // overall data

  public CommList(package_id: any) {
    return this.http.get(environment.ip + '/communication/' + package_id);
  }

  // update apis

  public addManagerUpdate(DepManagerlistId: any, credentials: any) {
    return this.http.post(environment.ip + '/departure-mng-update/' + DepManagerlistId, credentials);
  }

  public addTourGuideUpdate(DepGuidelistId: any, credentials: any) {
    return this.http.post(environment.ip + '/departure-guide-update/' + DepGuidelistId, credentials);
  }

  public addEnmergencyUpdate(editEnmergencyId: any, credentials: any) {
    return this.http.post(environment.ip + '/departure-mng-update/' + editEnmergencyId, credentials);
  }

  public addPlaCardUpdate(editPlacardId: any, credentials: any) {
    return this.http.post(environment.ip + '/placard-update/' + editPlacardId, credentials);
  }

  // delete apis

  public deleteTourManager(DepManagerlistId: any) {
    const result = this.http.delete(environment.ip + '/departure-mng-delete/' + DepManagerlistId);
    return result;
  }

  public deleteTourGuide(DepGuidelistId: any) {
    const result = this.http.delete(environment.ip + '/departure-guide-delete/' + DepGuidelistId);
    return result;
  }

  public deleteEnmergencyContact(editEnmergencyId: any) {
    const result = this.http.delete(environment.ip + '/communication-delete/' + editEnmergencyId);
    return result;
  }

  public deleteplycard(editPlacardId: any) {
    const result = this.http.delete(environment.ip + '/placard-delete/' + editPlacardId);
    return result;
  }

  //Feedback page API
  public Feedback(package_id: any) {
    return this.http.get(environment.ip + '/app-feedback/' + package_id);
  }

  //Departure Setting page API
  public DepSettings(package_id: any) {
    return this.http.get(environment.ip + '/departure-setting/' + package_id);
  }

  //Tour Document page API

  public TourDoc(package_id: any) {
    return this.http.get(environment.ip + '/document-creation/' + package_id);
  }

  public TourUpload(package_id: any, credential: any) {
    return this.http.post(environment.ip + '/travel-document/store/' + package_id, credential);
  }

  public deleteDoc(docId: any) {
    return this.http.delete(environment.ip + '/document-delete/' + docId);
  }


//  Terms and condition API
  public TConditions(package_id: any) {
    return this.http.get(environment.ip + '/termandconditions/' + package_id);
  }
  public TermsUpdate(package_id: any, credential: any) {
    return this.http.post(environment.ip + '/terms/update/' + package_id, credential);
  }

  //country guide save:
  public SaveDepSettings(pkg_id: any, country_list: any) {
    return this.http.post(environment.ip + '/departure-settings/' + pkg_id, country_list);
  }
}
