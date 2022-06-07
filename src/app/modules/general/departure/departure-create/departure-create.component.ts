import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { DepartureService } from "../../../../services/departure.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../../services/translate-config.service";
import { Dimensions, ImageCroppedEvent, ImageTransform } from "ngx-image-cropper";
//import {NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { formatDate } from '@angular/common';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-departure-create',
  templateUrl: './departure-create.component.html',
  styleUrls: ['./departure-create.component.css']
})

export class DepartureCreateComponent implements OnInit {
  credentials =
    {
      pname: "",
      start_date: "",
      end_date: "",
      passcode: "",
      manager_passcode: "",
      agent_name: "",
      start_time: "",
      total_days: "",
      total_nights: "",
      total_users: "",
      departure_type: "",
      disclaimer: "",
      inbound_countries: "",
      banner_image: ""
    };
  departureForm: FormGroup;
  resetForm = false;
  verifyForm = false;
  isLoading = true;
  isSubmitted = false;
  pname: any;
  start_date: any;
  end_date: any;
  passcode: any;
  manager_passcode: any;
  agent_name: any;
  start_time: any;
  inbound_countries: any;
  total_days: any;
  total_nights: any;
  today = new Date();
  comp_id = localStorage.getItem('company_id');
  minDate = new Date();
  country_data: any;
  country_list: any;
  pkg_id: any;
  showinbond = false;
  showdisclaimer = true;
  dep_type = 'domestic';
  departureEditForm: any;
  editableiD = 0;
  package_id: any;
  incusionForm = new FormData();
  filePath: any;
  filePath1:any;
  imageName: any;
  imageName1: any;
  fileSize: any;
  fileSize1: any;
  filesizeLimit: any;
  filesizeLimit1: any;
  depBreak = 0;
  showCropper: any;
  showCropper1: any;
  croppedImage: any = '';
  croppedImage1: any = '';
  imgName = '';
  imgName1 = '';
  photo_name: any;
  photo_name1: any;
  depStatus: any;
  fromdate: any;
  todate: any;
  fDate: any;
  tDate: any;
  breakTour:any;
  public selectedTime = '';
  public daysBetweenDates: any;
  public numberOfNights: any;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private router: Router,
    private departure_service: DepartureService,
    private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService,
    private config: NgSelectConfig,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private translate: TranslateConfigService
  ) {

    this.package_id = this.route.snapshot.queryParams['package_id'];
    this.editableiD = this.route.snapshot.queryParams['package_id'];
    if (this.editableiD === undefined) {
      this.editableiD = 0;
    } else {
      this.render_data();
    }
    if (this.package_id === undefined) {
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }


    // Form Control
    this.departureForm = this.formBuilder.group({
      pname: ["", Validators.required],
      start_date: [""],
      s_date: [""],
      end_date: ["", Validators.required],
      e_date: [""],
      passcode: [""],
      manager_passcode: ["", Validators.required],
      agent_name: ["",],
      start_time: ["", Validators.required],
      total_days: [""],
      total_nights: [""],
      total_users: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      departure_type: ["domestic"],
      break: [''],
      agent_logo: [""],
      banner_image: [""],
      banner_image_update: [""],
      agent_logo_update: [""],
      disclaimer: ["",],
      inbound_countries: [""],
    })

    setTimeout(() => {
      this.isLoading = false;
    }, 1400);

  };

  render_data() {
    this.isLoading = true;
    this.departure_service.departureGet(this.package_id).subscribe((res: any) => {
      this.isLoading = false;
      console.log(res, 'dataadfadfafaf');
      this.depStatus = res.tourpackage.status
      this.departureEditForm = res.tourpackage;
      this.breakTour = res.tourpackage.departure_break;
      this.departureForm.patchValue({
        pname: this.departureEditForm.pname,
        // start_date: this.departureEditForm.start_date,
        s_date: new Date(this.departureEditForm.start_date),
        //  end_date: this.departureEditForm.end_date,
        e_date: new Date(this.departureEditForm.end_date),
        passcode: this.departureEditForm.passcode,
        manager_passcode: this.departureEditForm.manager_passcode,
        agent_name: this.departureEditForm.agent_name,
        start_time: this.departureEditForm.start_time,
        total_days: this.departureEditForm.total_days,
        total_nights: this.departureEditForm.total_nights,
        total_users: this.departureEditForm.total_users,
        departure_type: this.departureEditForm.departure_type,
        break: this.departureEditForm.departure_break == '1' ? 1 : 0,
        disclaimer: this.departureEditForm.disclaimer,
        inbound_countries: this.departureEditForm.inbound_countries,
        banner_image: this.departureEditForm.banner_image,
        agent_logo: this.departureEditForm.banner_image,
      });
      this.dateRangeChangeEdit(this.departureEditForm.start_date, this.departureEditForm.end_date);
      this.hidePasscode();
      this.filePath = res.imageUrl + this.departureEditForm.banner_image,
      this.filePath1 = res.agent_logo
      if (res.tourpackage.status == 2) {
        $('#travellerPass .readOnlyspan').show();
        $('#managerPass .readOnlyspan').show();
      }
    }, error => {
      this.toastr.error('Database connection failed');
      this.router.navigateByUrl('/departure-table');
    })
  }

  dateRangeChangeEdit(s_date: any, e_date: any) {
    this.fromdate = "";
    this.todate = "";
    var st_date = new Date(s_date);
    var ed_date = new Date(e_date);
    var dateString = new Date(st_date.getTime() - (st_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    var todateString = new Date(ed_date.getTime() - (ed_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    this.departureForm.patchValue({
      start_date: dateString,
      end_date: todateString,
      s_date: new Date(dateString),
      e_date: new Date(todateString),
    });
    console.log(this.fromdate, this.todate, this.departureForm.value, 'dates')
  }

  ngOnInit(): void {
    /*$(".depBreakDEp").click(function () {
      /!*alert('asdfas')*!/
      $(".iq-menu #DepBreakMenu").toggle();
    })
    $('[data-toggle="popover"]').popover();*/
  };

  breakDep() {

  }

  // travel & manager passcode validation
  keyFunc() {
    const apppass = (<HTMLInputElement>document.getElementById('passcode')).value
    const appmanagerpass = (<HTMLInputElement>document.getElementById('manager_passcode')).value
    if (apppass === appmanagerpass) {
      this.toastr.error('manager passcode can not be same')
    }
  };

  // country dropdown
  country() {
    this.departure_service.country_list().subscribe((res: any) => {
      this.country_data = res;
      this.country_list = this.country_data.Countrylist;
      console.log(this.country_data);
    }, error => {
      this.toastr.error('cannot fetch country name rightnow');
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

  // date range picker
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.fromdate = "";
    this.todate = "";
    var st_date = new Date(this.departureForm.value.s_date);
    var ed_date = new Date(this.departureForm.value.e_date);

    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
    const start: number = st_date.getTime();
    const end: number = ed_date.getTime();
    this.daysBetweenDates = Math.ceil((end - start) / MS_PER_DAY) + 1;
    this.numberOfNights = this.daysBetweenDates - 1;

    /*this.fromdate = st_date.toLocaleDateString().slice(0, 10);
    this.todate = ed_date.toLocaleDateString().slice(0, 10);*/
    var dateString = new Date(st_date.getTime() - (st_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    var todateString = new Date(ed_date.getTime() - (ed_date.getTimezoneOffset() * 60000))
      .toISOString()
      .split("T")[0];
    console.log(dateString, todateString)
    this.departureForm.patchValue({
      start_date: dateString,
      end_date: todateString,
    });
    console.log(this.fromdate, this.todate, this.departureForm.value, 'dates')
    console.log(st_date, ed_date, 'sadfasdasd new date')
  }


  open() {
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

  open1() {
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

  // form validation and submit button
  get form() {
    return this.departureForm.controls;
  };

  hidePasscode() {
    //const depBreak = (<HTMLInputElement>document.getElementById('passcode'));
    if ($('#depBreak').is(':checked')) {
      // this.depBreak = 1;
      $('#passcodeField').addClass('col-md-12').removeClass('col-md-7');
      $('#managerPass').addClass('col-md-6').removeClass('col-md-4');
      $('#tenetID').addClass('col-md-6').removeClass('col-md-4');
      $('#agentName').hide();
      $('#travellerPass').hide();
    } else {
      $('#passcodeField').addClass('col-md-7').removeClass('col-md-12');
      $('#managerPass').addClass('col-md-4').removeClass('col-md-6');
      $('#tenetID').addClass('col-md-4').removeClass('col-md-6');
      $('#agentName').fadeIn('slow');
      $('#travellerPass').fadeIn('slow');
      // this.depBreak = 0;
    }
  }

  filename(files: any) {
    let that = this;
    const file = (files.target).files[0];
    //this.incusionForm.set('image', file);
    this.imageName = file.name;
    this.fileSize = file.size;
    this.filesizeLimit = 1024 * 5120;
    var extName = this.imageName.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);
    if (ext_found < 0) {
      this.imageName = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize > this.filesizeLimit) {
      this.toastr.error('File too large' + this.fileSize + '. Maximum size 5MB and 1080px x 720px');
      return;
    } else {
      this.open_crop_modal();
      this.imageName = files;
    }
  }

  filename1(files: any) {
    let that = this;
    const file1 = (files.target).files[0];
    //this.incusionForm.set('image', file);
    this.imageName1 = file1.name;
    this.fileSize1 = file1.size;
    this.filesizeLimit1 = 1024 * 1024;
    var extName = this.imageName1.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);
    if (ext_found < 0) {
      this.imageName1 = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize1 > this.filesizeLimit1) {
      this.toastr.error('File too large' + this.fileSize1 + '. Maximum size 1MB and 1080px x 720px');
      return;
    } else {
      this.open_crop_modal1();
      this.imageName1 = files;
    }
  }

  open_crop_modal() {
    $('#crop_model .overlay').css('background', 'none');
    $('#crop_model').css('display', 'block');
    $('#crop_model').addClass('show');
    $('#crop_model').css('z-index', '99999');
  }

  open_crop_modal1() {
    $('#crop_model1 .overlay').css('background', 'none');
    $('#crop_model1').css('display', 'block');
    $('#crop_model1').addClass('show');
    $('#crop_model1').css('z-index', '99999');
  }

  close_crop() {
    $('#crop_model').removeClass('show');
    $('#crop_model').css('display', 'none');
  }

  close_crop1() {
    $('#crop_model1').removeClass('show');
    $('#crop_model1').css('display', 'none');
  }

  scale = 1;
  transform: ImageTransform = {};
  containWithinAspectRatio = false;

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }
zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  loadImageFailed1() {
    console.log('Load failed');
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  cropperReady1(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  imageLoaded1() {
    this.showCropper1 = true;
    console.log('Image loaded');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.filePath = event.base64;
    console.log(this.filePath)
    this.departureForm.patchValue({
      banner_image: this.filePath,
      banner_image_update: this.filePath
    });
  }

  imageCropped1(event: ImageCroppedEvent) {
    this.filePath1 = event.base64;
    console.log(this.filePath1)
    this.departureForm.patchValue({
      agent_logo: this.filePath1,
      agent_logo_update: this.filePath1
    });
  }

  done_cropping() {
    this.photo_name = this.imgName;
    this.close_crop();
  }

  done_cropping1() {
    this.photo_name1 = this.imgName1;
    this.close_crop1();
  }

  // form submit
  departure_register() {
    console.log(this.departureForm);
    this.isSubmitted = true;
    if (this.departureForm.value.departure_type == 'domestic' && this.departureForm.value.disclaimer == '') {
      this.toastr.error('click on desclaimer');
      return;
    }
    if (this.departureForm.invalid) {
      return
    } else {
      if (this.showinbond && this.departureForm.value.inbound_countries == '') {
        this.toastr.error('Please fill inbond country');
        return;
      }
      if (this.editableiD == 0) {
       // console.log(this.departureForm.value, "hvjvhjvhvhvhvhvhvhv")
        this.departure_service.departure_create(this.departureForm.value,).subscribe( // api post
          (obj: any) => {
            this.isLoading = false;
            this.toastr.success(obj.message);
            this.pkg_id = obj.pckg_id;
            if (this.pkg_id === undefined || this.pkg_id === null || this.pkg_id === NaN) {
              this.router.navigateByUrl('/departure-create');
            } else {
              this.router.navigateByUrl('/departure-location?package_id=' + this.pkg_id); // Navigation Route
              this.isLoading = false;
              if (obj.error) {
                this.toastr.error(obj.message);
                this.router.navigateByUrl('/departure-create');
              }
            }
          },
          (error) => {
            this.toastr.error("database connection failed");
            this.isLoading = false;
          }
        );
      } if(this.editableiD > 0) {
        console.log(this.departureForm.value, 'value');
        this.departure_service.departure_update(this.departureForm.value, this.package_id).subscribe( // api post
          (obj: any) => {
            console.log(obj)
            //  this.isLoading = false;
            this.toastr.success(obj.message);
            this.pkg_id = obj.last_id;
            this.router.navigateByUrl('/departure-location?package_id=' + this.pkg_id);
            this.render_data();
          },
          (error) => {
            console.log("some thing went wrong");
            this.isLoading = false;
          }
        );
      }
    }
  };

  copyPass() {
    var $temp = $("<input>");
    let changeIcon = $('#travellerPass p i.fas');
    $("body").append($temp);
    $temp.val($('#tpasscode').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
    changeIcon.css('color', '#3727f7')
  }

  mcopyPass() {
    var $temp = $("<input>");
    let changeIcon = $('#managerPass p i.fas');
    $("body").append($temp);
    $temp.val($('#mpasscode').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
    changeIcon.css('color', '#3727f7')
  }

  validateNumber(e: any) {
    const pattern = /^[0-9]$/;
    return pattern.test(e.key)
  }

  PublishIf() {
    this.isLoading = true;
    this.departure_service.publishItineraryFinder(this.package_id).subscribe((res:any) => {
      if(res.status == true){
        this.toastr.success(res.message);
      }
      if (res.status == false) {
        this.toastr.error(res.message);
      }
      this.isLoading = false;
    }, (error) => {
      this.toastr.error("Something went wrong");
      this.isLoading = false;
    })
  }
}
