import {DatePipe, getLocaleDateFormat, FormatWidth} from '@angular/common';
import {ApiService} from '../../../../services/api.service';
import {DepartureService} from "../../../../services/departure.service";
import {Component, OnInit} from '@angular/core';
import {Router, ParamMap, ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AmazingTimePickerService} from 'amazing-time-picker';
import {TranslateConfigService} from "../../../../services/translate-config.service";
import {Dimensions, ImageCroppedEvent} from "ngx-image-cropper";
import {DateAdapter} from '@angular/material/core';

declare var $: any;

@Component({
  selector: 'app-departure-table',
  templateUrl: './departure-table.component.html',
  styleUrls: ['./departure-table.component.css']
})
export class DepartureTableComponent implements OnInit {
  departureData: any;
  isLoading = true;
  package_id: any;
  copydepartureForm: FormGroup;
  searchDate: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  country_list: any;
  country_data: any;
  showinbond = false;
  showdisclaimer = true;
  comp_id = localStorage.getItem('company_id');
  public selectedTime = '';
  today: any;
  startDate: any = [];
  disableDep: any;
  public daysBetweenDates: any;
  public numberOfNights: any;
  public departureList: any = [];
  public keyword = '';
  public filter_status = '';
  fromdate = '';
  endDate = '';
  todate = '';
  status = '';
  depid: any;
  start_date: any;
  end_date: any;
  pname: any;
  company_id: any;
  agent_name: any;
  currentTime: any;
  totalData = 0;
  prev_page_url = "";
  next_page_url = "";
  last_page_url = "";
  total_page = 0;
  current_page = 1;
  public paginationArray: any = [];
  totalDays: any;
  StartDate: any;
  EndDate: any;
  dayOne: any;
  totalDaysArr: any = [];
  f_date: any;
  to_date: any;
  frm_date: any;
  t_date: any;
  last_pg_active = false;
  dayDate: any;
  incusionForm = new FormData();
  filePath: any;
  imageName: any;
  fileSize: any;
  filesizeLimit: any;
  showCropper: any;
  croppedImage: any = '';
  imgName = '';
  photo_name: any;
  scheduledNotification: FormGroup;
  instantNotification: FormGroup;
  locationNotification: FormGroup;
  isSubmitted3 = false;
  isSubmitted4 = false;
  minDate = new Date();
  departureCreate = false;
  departureEdit = false;
  departureView = false;

  constructor(
    private dateAdapter: DateAdapter<Date>,
    private ApiService: ApiService,
    private departure_service: DepartureService,
    private Router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService,
    private translate: TranslateConfigService
  ) {

    setTimeout(() => {
      this.isLoading = false;
    }, 1400);

    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.copydepartureForm = this.formBuilder.group({
      pkgid: [""],
      pname: ["", Validators.required],
      s_date: ["", Validators.required],
      e_date: [""],
      start_date: [""],
      end_date: [""],
      passcode: ["", Validators.required],
      manager_passcode: ["", Validators.required],
      agent_name: ["", Validators.required],
      start_time: [""],
      total_days: [""],
      total_nights: [""],
      total_users: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    })

    this.scheduledNotification = this.formBuilder.group({
      notification_text: ["", Validators.required],
      itineary_day: ["1", Validators.required],
      start_day: [""],
      time: ["", Validators.required],
      scheduled_image: [""],
    });

    this.instantNotification = this.formBuilder.group({
      ins_notification_text: ["", Validators.required],
      image: [""],
    })

    this.searchDate = this.formBuilder.group({
      fromdate: [""],
      todate: [""],
      fd: [""],
      ed: [""],
    })
    this.loadPermissionMenu();
    if (this.departureView == false) {
      this.toastr.error("You are not authorized");
      this.Router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.departureTableData()
  }

  get form() {
    return this.copydepartureForm.controls;
  };

  copyDeparture() {
    console.log(this.copydepartureForm.value);
    this.isLoading = true;
    this.isSubmitted = true;
    if (this.copydepartureForm.invalid) {
      this.isLoading = false;
      return
    }
    console.log(this.copydepartureForm.value)
    this.ApiService.departureCopy(this.depid, this.copydepartureForm.value).subscribe((res: any) => {
      console.log(res, 'dataz')
      this.isLoading = false;
      this.toastr.success(res.message);
      this.departureTableData();
      document.getElementById('closeCopymodal')?.click();
    })
  };

  digitKeyOnly(e: any) {
    var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
    if ((keyCode >= 37 && keyCode <= 40) || (keyCode == 8 || keyCode == 9 || keyCode == 13) || (keyCode >= 48 && keyCode <= 57)) {
      return true;
    }
    return false;
  }


  dateRangeChangeCopy(dateRangeStartCpy: HTMLInputElement, dateRangeEndCpy: HTMLInputElement) {
    var st_date = new Date(this.copydepartureForm.value.s_date);
    var ed_date = new Date(this.copydepartureForm.value.e_date);
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = st_date.getTime();
    const end: number = ed_date.getTime();
    /*this.f_date = st_date.toLocaleString().slice(0, 10);
    this.to_date = ed_date.toLocaleString().slice(0, 10);*/
    var dateString = new Date(st_date.getTime() - (st_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    var todateString = new Date(ed_date.getTime() - (ed_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    this.copydepartureForm.patchValue({
      start_date: dateString,
      end_date: todateString,
    });
    this.daysBetweenDates = Math.ceil((end - start) / MS_PER_DAY) + 1;
    this.numberOfNights = this.daysBetweenDates - 1;
    console.log(this.copydepartureForm.value, 'dates')
  }

  dateRangeChange(dateRangeStart: any, dateRangeEnd: any) {
    var st_date1 = new Date(this.searchDate.value.fd);
    var ed_date1 = new Date(this.searchDate.value.ed);
    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = st_date1.getTime();
    const end: number = ed_date1.getTime();
    /*this.frm_date = st_date1.toLocaleString().slice(0, 10);
    this.t_date = ed_date1.toLocaleString().slice(0, 10);*/
    var dateString = new Date(st_date1.getTime() - (st_date1.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    var todateString = new Date(ed_date1.getTime() - (ed_date1.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    this.searchDate.patchValue({
      fromdate: dateString,
      todate: todateString,
    });
    console.log(this.searchDate.value, st_date1, ed_date1, 'date')
  }

  keyFunc() {
    const apppass = (<HTMLInputElement>document.getElementById('passcode')).value
    const appmanagerpass = (<HTMLInputElement>document.getElementById('manager_passcode')).value
    if (apppass === appmanagerpass) {
      this.toastr.error('manager passcode can not be same')
    }
  };

  open() {
    this.selectedTime = this.currentTime;
    const amazingTimePicker = this.atp.open({
      time: this.selectedTime,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      changeToMinutes: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.selectedTime = time;
    });
  };

  country() {
    this.departure_service.country_list().subscribe((res: any) => {
      this.country_data = res;
      this.country_list = this.country_data.Countrylist;
      console.log(this.country_data);
    }, error => {
      this.toastr.error('Country Name not available');
    })
  };

  // show and hide country list
  showCountry_list(type: any, d: any) {
    if (type == 'show') {
      this.showinbond = true;
    } else {
      this.showinbond = false;
    }
    if (d == 'd') {
      this.showdisclaimer = true;
    } else {
      this.showdisclaimer = false;
    }
  };

  copyPass() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#tpasscode').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
  }

  mcopyPass() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#mpasscode').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
  }

  gotToPage(pg: any) {
    this.current_page = pg;
    this.departureTableData();

  }

  goToNext() {
    if (this.current_page != this.total_page) {
      this.current_page = this.current_page + 1;
      this.departureTableData();
    }
  }

  goToPrev() {
    if (this.current_page > 1) {
      this.current_page = this.current_page - 1;
      this.departureTableData();
    }
  }

  goToLast() {
    this.current_page = this.total_page;
    this.departureTableData();

  }

  goToFirst() {
    this.current_page = 1;
    this.departureTableData();
  }

  departureTableData() {
    this.departureList = [];
    this.paginationArray = [];
    this.ApiService.getdepartureData(this.current_page, this.keyword, this.fromdate, this.todate, this.filter_status).subscribe((resp: any) => {
        console.log(resp)
        if (resp.tourpackages.data.length > 0) {
          for (let i = 0; i < resp.tourpackages.data.length; i++) {
            this.departureList.push(resp.tourpackages.data[i]);
            if (resp.tourpackages.data.length.status == 1) {
            }
          }
          this.totalData = resp.tourpackages.total;
          this.prev_page_url = resp.tourpackages.prev_page_url;
          this.next_page_url = resp.tourpackages.next_page_url;
          this.last_page_url = resp.tourpackages.last_page_url;
          this.total_page = resp.tourpackages.last_page;
          this.current_page = resp.tourpackages.current_page;
          for (let k = 1; k <= this.total_page; k++) {
            this.paginationArray.push(
              {'page_no': k}
            );
          }
          if (this.current_page == this.total_page) {
            this.last_pg_active = true;
          }
          //  console.log(this.departureList, 'array')
        }
      },
      error => {
        this.toastr.error('Database connection failed');
      }
    )
  }

  depSearch() {
    console.log(this.fromdate, this.endDate, 'search')
    this.departureList = [];
    this.totalData = 0;
    this.paginationArray = [];
    this.ApiService.Search(this.keyword, this.searchDate.value.fromdate, this.searchDate.value.todate, this.filter_status).subscribe((resp: any) => {
      console.log(resp);
      if (resp.tourpackages.data.length > 0) {
        for (let i = 0; i < resp.tourpackages.data.length; i++) {
          this.departureList.push(resp.tourpackages.data[i]);
          if (resp.tourpackages.data.length.status == 1) {
          }
        }
        this.totalData = resp.tourpackages.total;
        this.prev_page_url = resp.tourpackages.prev_page_url;
        this.next_page_url = resp.tourpackages.next_page_url;
        this.last_page_url = resp.tourpackages.last_page_url;
        this.total_page = resp.tourpackages.last_page;
        this.current_page = resp.tourpackages.current_page;
        for (let k = 1; k <= this.total_page; k++) {
          this.paginationArray.push(
            {'page_no': k}
          );
        }
        if (this.current_page == this.total_page) {
          this.last_pg_active = true;
        }
      }
    })
  }

  checkdate(dates: any) {
    var res = new Date();
    var dep_dt = new Date(dates);
    if (res > dep_dt) {
      return true;
    }
    return false;
  }

  depActivate(id: any) {
    this.package_id = id;
    this.Router.navigateByUrl('/departure-billing?package_id=' + this.package_id);
  }

  disabled(id: any) {
    this.package_id = id;
    this.ApiService.Depdisbale(this.package_id).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.success);
      this.departureTableData();
    })
  }

  copyDep(id: any, start_date: any, end_date: any, pname: any, company_id: any, agent_name: any) {
    this.depid = id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.pname = pname;
    this.company_id = company_id;
    this.agent_name = agent_name;
    this.copydepartureForm.patchValue({
      pkgid: this.depid,
      pname: this.pname,
      agent_name: this.agent_name
    });
  }

  notificationSent(id: any) {
    this.totalDaysArr = [];
    this.scheduledNotification.patchValue({
      notification_text: "",
      itineary_day: "1",
      start_day: "",
      time: "",
      scheduled_image: "",
    });
    this.instantNotification.patchValue({
      ins_notification_text: "",
      image: "",
    });
    this.package_id = id;
    this.departure_service.departureGet(id).subscribe((res: any) => {
      console.log(res, id, 'sdfasd')
      this.totalDays = res.tourpackage.total_days;
      this.StartDate = res.tourpackage.start_date;
      this.EndDate = res.tourpackage.end_date;
      if (this.totalDays > 0) {
        for (let i = 1; i <= this.totalDays; i++) {
          this.totalDaysArr.push(i);
        }
        // console.log(this.totalDaysArr, 'dadfasd');
      }
      console.log(this.totalDays, 'day');
      var parts = this.StartDate.split('-');
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      this.dayDate = mydate.toLocaleDateString();
      console.log(mydate.toLocaleDateString());
      this.scheduledNotification.patchValue({
        start_day: this.dayDate,
      });
    })
  }

  selectDay(evt: any) {
    let dayNo = evt.target.value;
    let tourDate = new Date(this.StartDate);
    let tourendDate = new Date(this.EndDate);
    var formatedDate = new Date();
    if (dayNo.indexOf('+') > -1) {
      dayNo = dayNo.replace('+', '');
      dayNo = parseInt(dayNo);
      tourendDate.setDate(tourendDate.getDate() + dayNo);
      formatedDate = tourendDate;
    } else if (dayNo.indexOf('-') > -1) {
      dayNo = dayNo.replace('-', '');
      dayNo = parseInt(dayNo);
      tourDate.setDate(tourDate.getDate() - dayNo);
      formatedDate = tourDate;
    } else {
      dayNo = parseInt(dayNo);
      tourDate.setDate(tourDate.getDate() + dayNo - 1);
      formatedDate = tourDate;
    }
    //alert(formatedDate)
    this.dayDate = formatedDate.toLocaleDateString();
    this.scheduledNotification.patchValue({
      start_day: this.dayDate,
    });
  }

  filename(files: any) {
    let that = this;
    const file = (files.target).files[0];
    this.imageName = file.name;
    this.fileSize = file.size;
    this.filesizeLimit = 1024 * 3072;
    var extName = this.imageName.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);

    if (ext_found < 0) {
      this.imageName = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize > this.filesizeLimit) {
      this.toastr.error('File too large' + this.fileSize + '. Maximum size 3MB and 1080px x 720px');
      return;
    } else {
      this.open_crop_modal();
      this.imageName = files;
    }
  }

  filename1(files: any) {
    let that = this;
    const file = (files.target).files[0];
    this.imageName = file.name;
    this.fileSize = file.size;
    this.filesizeLimit = 1024 * 3072;
    var extName = this.imageName.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);

    if (ext_found < 0) {
      this.imageName = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize > this.filesizeLimit) {
      this.toastr.error('File too large' + this.fileSize + '. Maximum size 3MB and 1080px x 720px');
      return;
    } else {
      this.open_crop_modal();
      this.imageName = files;
    }
  }

  get form1() {
    return this.scheduledNotification.controls;
  };

  get form2() {
    return this.instantNotification.controls;
  };

  scheduled_Noti() {
    this.isSubmitted3 = true;
    console.log(this.scheduledNotification.value, 'before')
    if (this.scheduledNotification.invalid) {
      return
    } else {
      console.log(this.scheduledNotification.value);
      this.ApiService.scheduledNotificationstore(this.package_id, this.scheduledNotification.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.success);
        this.isSubmitted3 = false;
        document.getElementById('closenotificationModal')?.click();
      })
    }
  }

  instant_Noti() {
    this.isSubmitted4 = true;
    if (this.instantNotification.invalid) {
      return
    } else {
      console.log(this.instantNotification.value);
      this.ApiService.intantNotificationstore(this.package_id, this.instantNotification.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.success);
        this.isSubmitted4 = false;
        document.getElementById('closenotificationModal')?.click();
      })
    }
  }

  location_Noti() {

  }

  open_crop_modal() {
    $('#crop_model .overlay').css('background', 'none');
    $('#crop_model').css('display', 'block');
    $('#crop_model').addClass('show');
    $('#crop_model').css('z-index', '99999');
  }

  close_crop() {
    $('#crop_model').removeClass('show');
    $('#crop_model').css('display', 'none');
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  imageCropped(event: ImageCroppedEvent) {
    /*const reader = new FileReader();
    /!*reader.onload = () => {
      this.filePath = reader.result as string;
    };*!/
    let that = this;
    reader.addEventListener('load', function (e: any) {
      that.createImages = e.target.result;
      that.departureForm.patchValue({
        banner_image: that.createImages,
      });
    });
    console.log(this.createImages);*/
    ///reader.readAsDataURL(file);
    this.filePath = event.base64;
    console.log(this.filePath)
    this.scheduledNotification.patchValue({
      scheduled_image: this.filePath,
    });
    this.instantNotification.patchValue({
      image: this.filePath,
    });
  }

  done_cropping() {
    this.photo_name = this.imgName;
    this.close_crop();

  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-create') {
          this.departureCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-edit') {
          this.departureEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-view') {
          this.departureView = true;
        }
      });
    }
  }
}
