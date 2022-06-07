import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Data, ActivatedRoute, Router } from "@angular/router";
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { UpcomingcreateService } from './../../../../services/upcomingcreate.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../../services/translate-config.service";

@Component({
  selector: 'app-upcoming-tours',
  templateUrl: './upcoming-tours.component.html',
  styleUrls: ['./upcoming-tours.component.css']
})
export class UpcomingToursComponent implements OnInit {
  package_id: any;
  departureUpcoming: any;
  departureUpcomingList:any;
  upcomingStatus:any;
  upcomingStatusId:any;
  urls:any;
  upcomging:FormGroup;
  Upcoming_list:any = [];
  upmg_tour:any =[];
  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private upComing: UpcomingcreateService,
    private config: NgSelectConfig,
    private translate: TranslateConfigService
  ) 
  {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

    this.upcomging = this.formBuilder.group({
      upcoming_list: ["", Validators.required],
    });
  }

  ngOnInit(): void {

  }

  render_data() {
    this.upComing.upcommingToursDeparture(this.package_id).subscribe((res:any) => {
      console.log(res, 'datazzzzz')
      this.departureUpcoming = res.data.depupcoming;

      this.departureUpcomingList =res.data.upcomingdepartureProcess.data;
      this.urls =res.data.upcommingSRCPath;
      console.log(this.departureUpcoming, 'abcdefghijklmno')
      console.log(this.departureUpcomingList, 'qwerty');
      if(this.departureUpcomingList.length>0){
      for(let i=0;i<this.departureUpcomingList.length;i++){
        console.log(this.departureUpcomingList[i])
        this.upmg_tour.push(this.departureUpcomingList[i].selectetpkgId);
      }
      
        this.upcomging.patchValue({ 
          upcoming_list: this.upmg_tour,
        });

      }
    })

  }


  getStatus(depUpId:any) {
    this.upcomingStatusId = depUpId;
    // alert('are you really want to change the status')
    this.upComing.upcomgUpdateStatus(this.upcomingStatusId).subscribe((res:any) => {
      console.log(res, 'hbcshcbshbcshc')
      this.toastr.success(res.success);
    })
  }

  get form() {
    return this.upcomging.controls;
  }

  updateUpmg() {
    console.log(this.upcomging.value, 'data');
    console.log(this.upmg_tour,'ddd')

    this.upComing.upcomgUpdate(this.upcomging.value).subscribe((res:any) => {
      console.log(res, 'scagsvastycvstycq');
      this.render_data();
      if(res.status==true){        
      this.toastr.success(res.message);
      }else{
        this.toastr.error('Tour could not be saved!');
      }
    })

  }
  
  selectUpcoming(evnt:any) {
    console.log(evnt);
    console.log(this.departureUpcoming)
    console.log(this.upmg_tour);
    this.upcomging.patchValue({ 
      upcoming_list: this.upmg_tour,
    });
    console.log(this.upcomging.value);
  }
  
}
