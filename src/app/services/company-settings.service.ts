import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Data, ActivatedRoute, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class CompanySettingsService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  public CompnaySettings() {
    return this.http.get(environment.ip + '/settings');
  }

  public Compnayedit(tenentId: any) {
    return this.http.get(environment.ip + '/settings/' + tenentId + '/edit');
  }

  public logoUpdate(tenentID: any, croppedImage: any) {
    let data: any;
    data = { 'Cropedimage': croppedImage }
    return this.http.post(environment.ip + '/settings/logo/' + tenentID + '/update', data);
  }

  public addAgent(data: any) {
    return this.http.post(environment.ip + '/store-agents', data);
  }

  public editAgent(AgentId: any, data: any) {
    return this.http.post(environment.ip + '/update-agent/' + AgentId, data);
  }

  public agentList(tenentID: any) {
    return this.http.get(environment.ip + '/agents?tenant_id=' + tenentID);
  }

  public deleteAgent(AgentId: any) {
    return this.http.delete(environment.ip + '/delete-agent/' + AgentId);
  }

  public compEditForm(tenentID: any, data: any) {
    return this.http.post(environment.ip + '/settings/' + tenentID + '/update', data);
  }

  //https://xm.tlakapp.com/api/v7/settings/REiqY1M2E61574689299/update

}
