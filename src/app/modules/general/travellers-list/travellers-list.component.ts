import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminControlService } from "../../../services/admin-control.service";
import { ToastrService } from "ngx-toastr";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-travellers-list',
  templateUrl: './travellers-list.component.html',
  styleUrls: ['./travellers-list.component.css']
})
export class TravellersListComponent implements OnInit {
  isLoading = true;
  EditableId = 0;
  id:any
  travelerList:any;
  isChecked = false;
  pkgid: any;
  userId:any
  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminControlService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.id = this.route.snapshot.queryParams['id'];
    if (this.id === undefined || this.id === null) {
      alert('You are not authorized!');
      this.router.navigateByUrl('/travellers');
    } else {
       this.renderData()
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }
  

  renderData() {
    this.adminService.travellersList(this.id).subscribe((res:any) => {
      console.log(res, 'datazzzzz')
      this.travelerList = res.data.travellers.data;
      console.log(this.travelerList, 'list')
    })
  }

  getStatus() { 
    this.adminService.travellerLogout(this.userId).subscribe(
      (res: any) => {
        this.toastr.success(res.success);
        this.renderData();
      },
      (error) => {
        alert('some thing went wrong');
      }
    );
  }

  editable_name="";
openLogout(user:any){
    this.userId = user.id;
    this.editable_name = user.name;

}
resetLg(){
  this.renderData();
}
}
