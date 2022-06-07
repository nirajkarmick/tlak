import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Data, ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CommunicationService } from "../../../../services/communication.service";
import { TranslateConfigService } from "../../../../services/translate-config.service";
declare var $: any;
@Component({
  selector: 'app-departure-settings',
  templateUrl: './departure-settings.component.html',
  styleUrls: ['./departure-settings.component.css']
})
export class DepartureSettingsComponent implements OnInit {
  package_id: any;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CommunicationService: CommunicationService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  public countryList: any = [];
  masterSelected: any;
  Checkedinclusions: any = [];
  countryGuidList:any=[];
  render_data() {
    this.countryList = [];
    this.CommunicationService.DepSettings(this.package_id).subscribe((res: any) => {
      console.log(res)
      this.countryGuidList=res.data.country_guide;
      if (res.data.countryISO.length > 0) {
        for (let i = 0; i < res.data.countryISO.length; i++) {
          this.countryList.push(res.data.countryISO[i]);
          this.countryList[i].isSelected = false;
          for (let k = 0; k < this.countryGuidList.length; k++) {
             if(this.countryGuidList[k].iso_2==this.countryList[i].iso2){

                 this.countryList[i].isSelected = true;
             }
          }
        }
      }
      console.log(this.countryList)
    })
  }

  ngOnInit(): void {
  }
saveSettings(){
  console.log(this.countryList);
  this.CommunicationService.SaveDepSettings(this.package_id,this.countryList).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.message) 
    });
}
  checkUncheckAll() {
    for (var i = 0; i < this.countryList.length; i++) {
      this.countryList[i].isSelected = this.masterSelected;
    } 
  }
  selected_country: any = [];
  countryChecked(item:any){
    var oneUnChecked=false;
    var check_count=0;
    for (var i = 0; i < this.countryList.length; i++) {
      if(this.countryList[i].isSelected==false){
          oneUnChecked=true;
      }
      if(this.countryList[i].isSelected==true){
          check_count++;
      }
    } 
    if(i==check_count){ 
      $("#customCheck1").prop('checked',true);
    }
    if(oneUnChecked==true){ 
      $("#customCheck1").prop('checked',false);
    }
  }
  isAllSelected(iso: any) {
    let that = this;
    let j = 0;
    this.masterSelected = this.countryList.every(function (item: any) {
      if (item.isSelected == true) {
        that.selected_country.push(item);
      } else {
        that.selected_country.splice(j, 1);
      }
      j++;
      return item.isSelected == true;
    })

    console.log(that.selected_country)
    // this.getCheckedItemList();
  }
 
}
