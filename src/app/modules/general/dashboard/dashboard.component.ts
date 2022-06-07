import { ApiService } from '../../../services/api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateConfigService } from "../../../services/translate-config.service";
import { ToastrService } from 'ngx-toastr';
declare var $: any;
import { MapsAPILoader } from '@agm/core';
import { GoogleChartComponent } from 'angular-google-charts';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // title = 'googlechart';
  // type = 'PieChart';
  // data = [
  //   ['Name1', 5.0],
  //   ['Name2', 36.8],
  //   ['Name3', 42.8],
  //   ['Name4', 18.5],
  //   ['Name5', 16.2]
  // ];
  // columnNames = ['Browser', 'Percentage'];
  // options = { colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'] };
  // width = 500;
  // height = 300;
//   chartData = {
//     type: 'BarChart',
//     data: [
//     ["PHP Books",  500],
//     [".Net Books",  800],
//     ["Java Books",  400], 
//    ],
//   chartColumns: ['Books', 'Sell'],
//   width: 1000,
//   height: 400,
// };

// type1 = "ColumnChart";
// data221 = [
//   ["other", { v: 2, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
//   ["Architect", { v: 6, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
//   ["Business", { v: 3, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
//   ["Project", { v: 8, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
//   ["developer", { v: 9, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"]
// ];
// columnNames221 = ["Year", "value", { role: "style" }, { role: "annotation" }];
// options = {
//   title: "",
//   /*'width':400,*/ height: 200,
//   tooltip: {
//     // isHtml: false,
//     // trigger: "focus",
//     textStyle: { color: "blue", fontName: "Tahoma", fontSize: "15" }
//   },
//   //                        slices: [{color: '0cac64'}, {color: 'e9ad2f'}, {color: '1f6882'},  {color: 'ff4d4d'}, {color: '9e70ff'}],
//   labels: "none",
//   pieSliceText: "none",
//   pieSliceTextStyle: { color: "red", fontSize: 9, display: "none" },
//   slices: [
//     { color: "3eafe0" },
//     { color: "bd6a67" },
//     { color: "b9b262" },
//     { color: "6abf7e" },
//     { color: "6c95b7" }
//   ],
//   // chartArea: { top: 10, left: 20, width: "70%", height: "75%" },
//   is3D: false /*sliceVisibilityThreshold: 0,*/,
//   fontSize: 9,
//   legend: "dsd"
// };
//   onSelect(event) {
//     // const { row, column } = event[0];
//     console.log(event);
//     // const year = this.Bardata[row][0];
//     // let selectedItem;
//     // if (column === 1) {
//     //   selectedItem = "current";
//     // }
//     // if (column === 2) {
//     //   selectedItem = "target";
//     // }
//     // console.log("year", year, "SelectedItem", selectedItem, this.Bardata[row][column]);
//   }

// public pieChart: GoogleChartInterface = {
//   chartType: GoogleChartType.PieChart,
//   dataTable: [
//     ['Task', 'Hours per Day'],
//     ['Work',     11],
//     ['Eat',      2],
//     ['Commute',  2],
//     ['Watch TV', 2],
//     ['Sleep',    7]
//   ],
//   //firstRowIsData: true,
//   options: {'title': 'Tasks'},
// };

  dashboardData: any;
  isLoading = true;
  latitude = parseInt(localStorage.getItem('latitude'));
  longitude = parseInt(localStorage.getItem('longitude'));
  // latitude=88.33;
  // longitude=77.99;  
  zoom = 5;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private translate: TranslateConfigService,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {

    this.renderData();
  }

  // changeDefaultLanguage(langType: string){
  //   this.translate.changeLanguage(langType);
  //   }

  tracking_latitude: any;
  tracking_longitude: any;
  tracking_data: any = [];
  tracking_found = false;
  tracking_package = "";
  tracking_package_dummy = "";
  realTimeTracking(dep_id: any, dep_name: any) {
    this.tracking_package = dep_name;
    this.apiService.realTimeTrack(dep_id).subscribe((res: any) => {
      console.log(res);
      this.tracking_latitude = parseInt(res.avg_lat);
      this.tracking_longitude = parseInt(res.avg_long);
      this.tracking_data = res.data;
      if (this.tracking_data && this.tracking_data.name != undefined) {
        this.tracking_found = true;
        this.zoom = 12;
      } else {
        this.tracking_found = false;
        this.zoom = 5;
      }
      $('#liveDeparture .dropdown-menu').removeClass('show');
      // setTimeout(() => {
      //   document.getElementById('userBasicsDetails')?.click();
      // }, 1000);
    });
  }
  realTimeTracking_dummy(dep_name: any) {
    this.tracking_found = false;
    this.tracking_package_dummy = dep_name;
    this.tracking_latitude = localStorage.getItem('latitude');
    this.tracking_longitude = localStorage.getItem('longitude');
    // this.tracking_latitude=55.755833;
    // this.tracking_longitude=37.617222;
  }
  renderData() {
    this.apiService.getDashboardData().subscribe((res: any) => {
      //console.log(res,'dashboard');
      this.dashboardData = res;
      this.tracking_latitude = parseInt(res.latlong.latitude);
      this.tracking_longitude = parseInt(res.latlong.longitude);
      this.latitude = parseInt(res.latlong.latitude);
      this.longitude = parseInt(res.latlong.longitude);

    }, error => {
      this.toastr.error('Database connection failed');
    })
  }
}
