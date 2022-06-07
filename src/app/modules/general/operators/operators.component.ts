import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { AdminControlService } from "../../../services/admin-control.service";
import { ToastrService } from "ngx-toastr";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {
  isLoading = true;
  EditableId = 0;
  id:any
  operatorList:any = [];
  operatorGuide:any = [];
  isChecked = false;
  Getstatus: any;
  pkgid: any
  type:any;
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
    this.adminService.operatorList(this.id).subscribe((res:any) => {
      console.log(res, 'datazzzzz')
      this.operatorList = res.data.departure_manager;
      this.operatorGuide = res.data.departure_guide;
      // this.operatorList.push(this.operatorGuide)
      console.log(this.operatorList, 'list')
    })
  }

  getStatus(type:any, id:any) {
    this.pkgid = id;
    this.type = type;
    alert('are you sure you want to change your status')
    this.adminService.operatorLogout(this.pkgid, this.type).subscribe(
      (res: any) => {
        this.toastr.success(res.success);
        this.renderData();
      },
      (error) => {
        alert('some thing went wrong');
      }
    );
  }

}
