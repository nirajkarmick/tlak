import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Data, ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TravellersService {
  package_id: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
  }

  public Travellerslist(package_id: any, page: any) {
    let data: any;
    return this.http.get(environment.ip + '/people/create/' + package_id +  '?page=' + page);
  }

  public TravellerslistPage(package_id: any, page: any) {
    let data: any;
    return this.http.get(environment.ip + '/people/create/' + package_id + '?page=' + page);
  }

  public createPeople(package_id: any, credentials: any) {
    let Addpeople = this.http.post(environment.ip + '/people-store-single/' + package_id, credentials);
    return Addpeople;
  }

  public uploadCSV(package_id: any, importfile: any) {
    var data = {"travellers": importfile};
    let upload = this.http.post(environment.ip + '/people/store/' + package_id, data);
    return upload;
  }

  public removePeople(People_id: any) {
    let data: any;
    let remove = this.http.post(environment.ip + '/people-delete/' + People_id, data);
    return remove;
  }

  public updatePeople(People_id: any, editable_name: any) {
    let data: any;
    data = {
      'People_id': People_id,
      'name': editable_name
    }
    let Update = this.http.post(environment.ip + '/people-update/' + People_id, data);
    return Update;
  }


//  Departure break API
  public Getagents(data: any) {
    return this.http.get(environment.ip + '/get-agent-traveller?package_id=' + data);
  }

  public GetAgentsList(package_id: any) {
    return this.http.get(environment.ip + '/get-assigned-agent-traveller/' + package_id);
  }

  public depBreakSubmit(package_id: any, data: any) {
    let remove = this.http.post(environment.ip + '/assign-traveller-against-agent/' + package_id, data);
    return remove;
  }

  public agentUpdateSubmit(package_id: any, data: any) {
    let remove = this.http.post(environment.ip + '/update-assigned-travellers/' + package_id, data);
    return remove;
  }

  public agentDelete(package_id: any, data:any) {
    /*var data = {
      agent_id: del_agent_id,
      travellers: del_travellers,
      passcode: del_passcode,
    }*/
    let remove = this.http.post(environment.ip + '/delete-assigned-travellers/' + package_id, data);
    return remove;
  }

  //get-assigned-agent-traveller/561
  public editTravelerPass(agent_id: any, package_id: any) {
    return this.http.get(environment.ip + '/edit-assigned-agent-traveller/' + agent_id + '?package_id=' + package_id);
  }
}
