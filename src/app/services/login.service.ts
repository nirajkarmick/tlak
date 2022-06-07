import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  public login(credentials: any) {
    let data: any;
    return this.http.post(environment.ip + '/login', credentials);;
  }

  public register(register: any) {
    return this.http.post(environment.ip + '/register', register);
  }

  public resend(data: any) {
    return this.http.post(environment.ip + '/email/resend', data);
  }

  public logout() {
    let data: any;
    return this.http.post(environment.ip + '/logout', null);;
  }


}
