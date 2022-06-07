import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { UpcomingcreateService } from "./../../../../services/upcomingcreate.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateConfigService } from "../../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';
import { LocationService } from '../../../../services/location.service';

declare var $: any;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  UpcomingTour: FormGroup;
  isSubmitted = false;
  isLoading = true;
  id: any;
  imageName: any;
  incusionForm = new FormData();
  filePath: any;
  EditableId = 0;
  public todayDate: any = new Date();
  userData: any;
  bannerimgPath:any;
  optionalDepartureCreate = false;
  destData:any;
  night:any;
  days:any;
  all_images: any;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    public dialog: MatDatepickerModule,
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private location_services: LocationService,
    private toastr: ToastrService,
    private Upcoming: UpcomingcreateService,
    private translate: TranslateConfigService
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    this.id = this.route.snapshot.queryParams['id'];
    this.loadPermissionMenu();
    if (this.id === undefined) {
    } else {
      this.EditableId = this.id
      this.render_data();
    }
    if (this.optionalDepartureCreate == false) {
      this.toastr.error("You are not authorized");
      this.router.navigateByUrl('/');
    }
    this.UpcomingTour = this.formBuilder.group({
      pname: ["", Validators.required],
      comp_name: ["", Validators.required],
      destination: ["", Validators.required],
      destination_id: [""],
      start_date: ["", Validators.required],
      contact_phone: ["", Validators.required],
      contact_email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      description: ["", Validators.required],
      promo_content: ["", Validators.required],
      background_image: ["",],
      id:[this.id],
      night: [""],
      days:[""],
      totalDays: ["", Validators.required],
    });
  // this.dateRangeChange();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
    
  }

  render_data() {
    this.isLoading = true;
    this.Upcoming.getUpcomming(this.id).subscribe(
      (res: any) => {
        this.isLoading = false;
        this.userData = res.data.upcomingtourpackage;
        this.bannerimgPath = res.data.upcommingSRCPath;
        console.log(this.userData, "jfhdsfdsfhdsgfhdsfg")
        this.UpcomingTour.patchValue({
          pname: this.userData.pname,
          promo_content: this.userData.promo_content,
          start_date: this.userData.start_date,
          contact_phone: this.userData.contact_phone,
          contact_email: this.userData.contact_email,
          description: this.userData.description,
          background_image: this.userData.background_image,
          night: this.userData.total_night,
          days: this.userData.total_days,
          destination: this.userData.destination_name,
          comp_name: this.userData.company_name,
        })
        this.filePath = this.bannerimgPath + this.userData.background_image
      }, (error) => {
        this.toastr.error("Something went wrong")
      }
    );

  }

  dateRangeChange(evnt:any) {
    this.days = parseInt(evnt.target.value);
    this.night = this.days - 1;
    this.UpcomingTour.patchValue({
      days: this.days,
      night: this.night,
      totalDays: this.days
    })
  }

  get form() {
    return this.UpcomingTour.controls;
  }
 
  filename(files: any) {
    let that = this;
    const file = files.target.files[0];
    this.incusionForm.set('image', file);
    this.imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.all_images = e.target.result;
      that.UpcomingTour.patchValue({
        background_image: that.all_images,
      });
    });
    console.log(this.all_images);
    reader.readAsDataURL(file);
  }

  upComingTour() {
    this.isLoading = true;
    console.log(this.UpcomingTour.value)
    this.isSubmitted = true;
    if (this.UpcomingTour.invalid) {
      this.isLoading = false;
      return
    } 
    if (this.EditableId == 0) {
      console.log(this.UpcomingTour.value)
      this.Upcoming.createUpcomming(this.UpcomingTour.value).subscribe((obj: any) => {
        console.log(obj);
        this.isLoading = false;
        this.UpcomingTour.reset();
        this.isSubmitted = false;
        this.toastr.success(obj.message);
        this.router.navigateByUrl('/upcoming-tours'); 
      }, (error) => {
        this.isLoading = false;
        this.toastr.error("Something went wrong")
      })
    } 
    if(this.EditableId > 0) {
      this.Upcoming.UpdateUpcomming(this.UpcomingTour.value).subscribe((obj: any) => {
        console.log(obj);
        this.isLoading = false;
        this.UpcomingTour.reset();
        this.isSubmitted = false;
        this.toastr.success(obj.message);
        this.render_data();
        this.router.navigateByUrl('/upcoming-tours');
      }, (error) => {
        this.toastr.error("Something went wrong")
      })
   }
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
    }
  }

  search_destin(evnt:any) {
    var dest_key=evnt.target.value;
    if (dest_key && dest_key.length > 2) {
      this.location_services.search_destination(dest_key).subscribe(
        (res: any) => {
          console.log(res, 'keyup')
          this.destData = res.data;
          console.log(this.destData, 'data')
        }, (error) => {
          this.toastr.error("something went wrong")
        }
      );
    }
  }

  fetch_destination_details(item: any, id: any) {
    for (let dest of this.destData) {
      if (dest.id == id) {
        this.UpcomingTour.patchValue({ destination: dest.dest_name });
        this.UpcomingTour.patchValue({ destination_id: id });
      }
    }
    this.destData = [];
    console.log(this.UpcomingTour);
  }

  validateNumber(e: any) {
    const pattern = /^[0-9]$/;
    return pattern.test(e.key);
  }
}
