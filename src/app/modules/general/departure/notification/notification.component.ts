import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AmazingTimePickerService } from 'amazing-time-picker';
import { TranslateConfigService } from "../../../../services/translate-config.service";
import { Dimensions, ImageCroppedEvent } from "ngx-image-cropper";
import { ActivatedRoute, Router } from "@angular/router";
import { DepartureService } from "../../../../services/departure.service";
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  isLoading = true;
  package_id: any;
  scheduledNotification: FormGroup;
  instantNotification: FormGroup;
  instant_notificationList: any = [];
  scheduled_notificationList: any = [];
  imgURL: any;
  isSubmitted = false;
  isSubmitted1 = false;
  incusionForm = new FormData();
  filePath: any;
  filePath1: any;
  imageName: any;
  imageName1: any;
  fileSize: any;
  fileSize1: any;
  filesizeLimit: any;
  filesizeLimit1: any;
  showCropper: any;
  showCropper1: any;
  croppedImage: any = '';
  imgName = '';
  imgName1 = '';
  photo_name: any;
  photo_name1: any;
  dayDate: any;
  totalDays: any;
  StartDate: any;
  EndDate: any;
  dayOne: any;
  totalDaysArr: any = [];
  public selectedTime = '';
  currentTime: any;
  instantId: any;
  instantText: any;
  scheduletId: any;
  scheduleText: any;


  constructor(
    private ApiService: ApiService,
    private departure_service: DepartureService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private atp: AmazingTimePickerService,
    private translate: TranslateConfigService
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('cannot find the package');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.renderdata();
    }
    this.scheduledNotification = this.formBuilder.group({
      notification_text: ["", Validators.required],
      itineary_day: ["1", Validators.required],
      start_day: ["1"],
      time: ["", Validators.required],
      scheduled_image: [""],
    });
    this.instantNotification = this.formBuilder.group({
      ins_notification_text: ["", Validators.required],
      image: [""],
    })
  }

  ngOnInit(): void {
  }

  renderdata() {
    this.ApiService.notificationList(this.package_id).subscribe((res: any) => {
      console.log(res, 'notification')
      this.imgURL = res.data.notificationImage;
      this.instant_notificationList = res.data.instant_notification;
      this.scheduled_notificationList = res.data.scheduled_notification;
    })
    this.getday();
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
    const file1 = (files.target).files[0];
    this.imageName1 = file1.name;
    this.fileSize1 = file1.size;
    this.filesizeLimit1 = 1024 * 3072;
    var extName = this.imageName1.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);
    if (ext_found < 0) {
      this.imageName1 = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize1 > this.filesizeLimit1) {
      this.toastr.error('File too large' + this.fileSize1 + '. Maximum size 3MB and 1080px x 720px');
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
    this.scheduledNotification.patchValue({
      scheduled_image: this.filePath,
    });
  }

  imageCropped1(event: ImageCroppedEvent) {
    this.filePath1 = event.base64;
    this.instantNotification.patchValue({
      image: this.filePath1,
    });
  }

  done_cropping() {
   // alert(this.photo_name)
    this.photo_name = this.imgName;
    this.close_crop();
  }

  done_cropping1() {
    alert(this.photo_name)
    this.photo_name1 = this.imgName1;
    this.close_crop1();
  }

  get form() {
    return this.scheduledNotification.controls;
  };

  get form1() {
    return this.instantNotification.controls;
  };

  instant_Noti() {
    this.isSubmitted1 = true;
    if (this.instantNotification.invalid) {
      return
    } else {
      console.log(this.instantNotification.value);
      this.ApiService.intantNotificationstore(this.package_id, this.instantNotification.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.instantNotification.reset();
        this.isSubmitted1 = false;
        $('#filePath').attr('src', '');
        this.renderdata();
        this.instantNotification.patchValue({
          ins_notification_text: "",
          image: "",
        })
        this.filePath = "";
        document.getElementById('closenotificationModal')?.click();
      }, (error) => {
        this.toastr.error("something went wrong")
      })
    }
  }

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
  sdt: any
  getday() {
    this.departure_service.departureGet(this.package_id).subscribe((res: any) => {
      console.log(res, 'get day')
      this.sdt = moment(res.tourpackage.start_date).format('DD/MM/YYYY');
      this.totalDays = res.tourpackage.total_days;
      this.StartDate = res.tourpackage.start_date;
      this.EndDate = res.tourpackage.end_date;
      if (this.totalDays > 0) {
        for (let i = 1; i <= this.totalDays; i++) {
          this.totalDaysArr.push(i);
        }
        console.log(this.totalDaysArr, 'dadfasd');
      }
      console.log(this.totalDays, 'day');
      var parts = this.StartDate.split('-');
      var mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      this.dayDate = moment(mydate).format('DD/MM/YYYY');
      // this.dayDate = mydate.toLocaleDateString();
      //  alert(this.dayDate);
      this.scheduledNotification.patchValue({
        start_day: this.dayDate,
      });
    }, (error) => {
      this.toastr.error("something went wrong")
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
    this.dayDate = moment(formatedDate).format('DD/MM/YYYY');
    // alert(this.dayDate)
    // moment(mydate).format('MM/DD/YYYY')
    this.scheduledNotification.patchValue({
      start_day: this.dayDate,
    });
  }

  scheduled_Noti() {
    this.isSubmitted = true;
    console.log(this.scheduledNotification.value, 'before')
    if (this.scheduledNotification.invalid) {
      return
    } else {
      // console.log(this.scheduledNotification.value);
      this.ApiService.scheduledNotificationstore(this.package_id, this.scheduledNotification.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.scheduledNotification.reset();
        this.isSubmitted = false;
        $('#filePath1').attr('src', '');
        this.renderdata();
        this.instantNotification.patchValue({
          notification_text: [""],
          itineary_day: ["1"],
          start_day: ["1"],
          time: [""],
        })
        this.filePath = "";
      }, (error) => {
        this.toastr.error("something went wrong");
      })
    }
  }

  getDelid(id: any, text: any) {
    this.instantId = id;
    this.instantText = text;
  }

  deleteInstantNotification() {
    this.ApiService.intantNotificationdel(this.instantId).subscribe((res: any) => {
      this.toastr.success(res.success);
      this.renderdata();
    }, (error) => {
      this.toastr.error("something went wrong");
    })
  }

  getDelidschedule(id: any, text: any) {
    this.scheduletId = id;
    this.scheduleText = text;
  }

  deleteScheduleNotification() {
    this.ApiService.scheduleNotificationdel(this.scheduletId).subscribe((res: any) => {
      this.toastr.success(res.success);
      this.renderdata();
    }, (error) => {
      this.toastr.error("something went wrong");
    })
  }
}
