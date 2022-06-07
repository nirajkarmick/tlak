import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../../services/location.service';
import { TranslateConfigService } from "../../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent implements OnInit {

  public paginationArray: any = [];
  totalData = 0;
  prev_page_url = "";
  next_page_url = "";
  last_page_url = "";
  total_page = 0;
  current_page = 1;
  last_pg_active = false;
  poiCreate = false;
  poiEdit = false;
  poiView = false;
  poiDelete = false;
  img_url: any;
  public poiList: any = [];
  viewPoiid: any;
  viewPoiimg: any;
  viewPoiname: any;
  viewPoiadd: any;
  viewPoidescription: any;
  viewPoitypeicon: any;
  viewPoitypename: any;
  viewPoilat: any;
  viewPoilong: any;
  PoiEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location_services: LocationService,
    private toastr: ToastrService,
    private translate: TranslateConfigService,
    private formBuilder: FormBuilder,
  ) {
    this.renderData();
    this.loadPermissionMenu();
    if (this.poiView == false) {
      this.toastr.error("You are not authorized");
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.PoiEditForm = this.formBuilder.group({
      airline: ["", Validators.required],
      airline_code: ["", Validators.required],
      flight_number: ["", Validators.required],
      schedule_departure: ["", Validators.required],
      schedule_arrival: ["", Validators.required],
      departure_date: ["", Validators.required],
      departure_people: [""],
    });
  }

  renderData() {
    this.paginationArray = [];
    this.poiList = [];
    this.location_services.getPOIlist(this.current_page).subscribe((res: any) => {
      console.log(res);
      this.img_url = res.data.PoiSRCPath;
      // this.poiList = res.data.pois.data;
      console.log(this.poiList);
      if (res.data.pois.data.length > 0) {
        for (let i = 0; i < res.data.pois.data.length; i++) {
          this.poiList.push(res.data.pois.data[i]);
        }
      }
      this.totalData = res.data.pois.total;
      this.prev_page_url = res.data.pois.prev_page_url;
      this.next_page_url = res.data.pois.next_page_url;
      this.last_page_url = res.data.pois.last_page_url;
      this.total_page = res.data.pois.last_page;
      this.current_page = res.data.pois.current_page;
      for (let k = 1; k <= this.total_page; k++) {
        this.paginationArray.push(
          { 'page_no': k }
        );
      }
      if (this.current_page == this.total_page) {
        this.last_pg_active = true;
      }
    },(error) => {
      this.toastr.error("Something went wrong")
    })
  }


  gotToPage(pg: any) {
    this.current_page = pg;
    this.renderData();
  }

  goToNext() {
    if (this.current_page != this.total_page) {
      this.current_page = this.current_page + 1;
      this.renderData();
    }
  }

  goToPrev() {
    if (this.current_page > 1) {
      this.current_page = this.current_page - 1;
      this.renderData();
    }
  }

  goToLast() {
    this.current_page = this.total_page;
    this.renderData();

  }

  goToFirst() {
    this.current_page = 1;
    this.renderData();
  }

  viewPoi(id: any) {
    if (this.poiList.length > 0) {
      for (let a = 0; this.poiList.length > a; a++) {
        if (this.poiList[a].id == id) {
          this.viewPoiid = id;
          this.viewPoiimg = this.poiList[a].banner_image;
          this.viewPoiname = this.poiList[a].name;
          this.viewPoiadd = this.poiList[a].address;
          this.viewPoidescription = this.poiList[a].description;
          this.viewPoitypeicon = this.poiList[a].icon_image;
          this.viewPoitypename = this.poiList[a].iconname;
          this.viewPoilat = this.poiList[a].latitude;
          this.viewPoilong = this.poiList[a].longitude;
        }
      }
    }
  }

  submitPoiEditForm() {
    
  }

  deletePoi(id: any) {
    if (this.poiList.length > 0) {
      for (let a = 0; this.poiList.length > a; a++) {
        if (this.poiList[a].id == id) {
          this.viewPoiid = id;
          this.viewPoiname = this.poiList[a].name;
        }
      }
    }
  }

  delPOI() {
    this.location_services.delPoi(this.viewPoiid).subscribe((res: any) => {
      console.log(res.success);
      this.toastr.success(res.success);
      this.renderData();
    }, (error) => {
      //this.toastr.error(res.message);
      this.toastr.error("some thing went wrong");
    })
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-create') {
          this.poiCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-edit') {
          this.poiEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-view') {
          this.poiView = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-delete') {
          this.poiDelete = true;
        }
      });
    }
  }
}
