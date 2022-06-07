import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import {HttpClient, HttpBackend} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Data, ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  package_id: any;
  private customHttpClient: HttpClient;

  constructor(
    private http: HttpClient,
    private backend: HttpBackend,
    private route: ActivatedRoute,
    private router: Router,) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    this.customHttpClient = new HttpClient(backend)
  }

  public createPDF(data: any, package_id:any) {
    return this.http.post(environment.ip + '/pdf-pages/store/' + package_id, data);
  }

  public getPdfcreatePage(package_id: any) {
    return this.http.get(environment.ip + '/pdf-pages/create/' + this.package_id);
  }

  public generatePDF() {
    var data:any
    return this.http.post(environment.ip + '/add-page', data);
  }

  public getPDFdata() {
    return this.http.get(environment.ip + '/pdf-pages/' + this.package_id);
  }

  public UpdateDayPDF(data: any) {
    return this.http.post(environment.ip + '/itinerary-update', data);
  }

 public response_pdf(usercode: any) {
  var data={'userCodes':usercode};
    return this.http.post(environment.ip + '/update_pdf_status', data);

  }
  public UpdateTermPDF(data: any) {
    return this.http.post(environment.ip + '/terms-update', data);
  }
  public UpdateBannerPDF(data: any) {
    return this.http.post(environment.ip + '/banner-update', data);
  }
   public UpdateContactPDF(data: any) {
    return this.http.post(environment.ip + '/contact-update', data);
  }

   public UpdateBasicPDF(data: any) {
    return this.http.post(environment.ip + '/basic-detail-update', data);
  }

   public UpdateInclusionPDF(data: any) {
    return this.http.post(environment.ip + '/inc-exc-update', data);
  }
  public UpdateHotelPDF(data: any) {
    return this.http.post(environment.ip + '/hotel-update', data);
  }

   public UpdateFlightPDF(data: any) {
    return this.http.post(environment.ip + '/flight-update', data);
  }

   public addDayDF(data: any) {
    return this.http.post(environment.ip + '/add-page', data);
  }

   public generate_PDF(pkg_id: any) {
    var data={"route_id":pkg_id};
    return this.http.post(environment.ip + '/generate_pdf', data);
  }


  public call_pdf(usercode:any,filename:any){
        let result  = this.http.get(environment.ip+'/call_pdf?fileName='+filename+'&userCodes='+usercode).pipe(map((response: Response) => response));
        return result;

  }

  public check_pdf_status(usercode:any,filename:any){
        let result  = this.http.get(environment.ip+'/check_pdf_status?fileName='+filename+'&userCodes='+usercode).pipe(map((response: Response) => response));
        return result;

  }
  public hotel_list(package_id: any) {
    return this.http.get(environment.ip + '/hotel/' + package_id);
  }
}

//https://xm.tlakapp.com/tlakvxm/index.php/api/v7/pdf-pages/424
//https://xm.tlakapp.com/tlakvxm/index.php/api/v7/pdf-pages/424
