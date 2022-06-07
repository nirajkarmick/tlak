import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UpcomingcreateService } from "../../../services/upcomingcreate.service";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-upcoming-tour',
  templateUrl: './upcoming-tour.component.html',
  styleUrls: ['./upcoming-tour.component.css']
})
export class UpcomingTourComponent implements OnInit {
  isLoading = true;
  data: any;
  departureId: any;
  departureName: any;
  bannerimgPath: any;
  status = 'Originating';
  public upcomingtourList: any = [];
  isChecked = false;
  Getstatus: any;
  pkgid: any;
  optionalDepartureCreate = false;
  optionalDepartureEdit = false;
  optionalDepartureDelete = false;
  optionalDepartureView = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private UpcomingcreateService: UpcomingcreateService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
    this.loadPermissionMenu();
    if (this.optionalDepartureView == false) {
      this.toastr.error("You are not authorized");
      this.router.navigateByUrl('/');
    }

  }

  render_data() {
    this.isLoading = true;
    this.upcomingtourList = [];
    this.UpcomingcreateService.upcomingList().subscribe((res: any) => {
      console.log(res);
      this.bannerimgPath = res.data.upcommingSRCPath;
      if (res.data.upcomingtourpackage.data.length > 0) {
        for (let i = 0; i < res.data.upcomingtourpackage.data.length; i++) {
          this.upcomingtourList.push(res.data.upcomingtourpackage.data[i]);
        }
      }
      this.isLoading = false;
    })
  }

  ngOnInit(): void {
    this.render_data();
    var checkedValue = $('.toggle:checked').val();
    console.log(checkedValue)
  }


  getStatus(status: any, id: any) {
    var switchStatus = status;
    this.pkgid = id;
    var upcoming = {
      up_id: this.pkgid
    }
    this.UpcomingcreateService.UpcommingStatus(upcoming).subscribe(
      (res: any) => {
        if(res.success) {
        this.toastr.success(res.success);
        this.render_data();
        } if (res.error) {
        this.toastr.error(res.error);
        this.render_data();
        } 
      },
      // (error) => {
      //   alert('some thing went wrong');
      // }
    );
  }

  deleteUpcomingTour() {
    this.isLoading = true;
    this.UpcomingcreateService.deleteupcomming(this.departureId).subscribe(
      (res: any) => {
        if(res.success) {
        this.isLoading = false;
        this.toastr.success(res.success);
        this.render_data();
        } if(res.error) {
          this.isLoading = false;
          this.toastr.error(res.error);
          this.render_data();
        }
        
      },
      // (error) => {
      //   alert('some thing went wrong');
      // }
    );
  }


  openUpcomingform(id: any, name: any) {
    this.departureId = id;
    this.departureName = name;
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-create') {
          this.optionalDepartureCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-edit') {
          this.optionalDepartureEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-delete') {
          this.optionalDepartureDelete = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-view') {
          this.optionalDepartureView = true;
        }
      });
    }
  }
}
