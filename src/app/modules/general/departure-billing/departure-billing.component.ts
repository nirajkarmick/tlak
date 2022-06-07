import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../services/api.service';
import {Data, ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";

declare var $: any;

@Component({
  selector: 'app-departure-billing',
  templateUrl: './departure-billing.component.html',
  styleUrls: ['./departure-billing.component.css']
})
export class DepartureBillingComponent implements OnInit {
  package_id: any;
  isLoading = true;
  tenant_id = localStorage.getItem('tenant_id');
  credentials = {activation_text: "",};
  isSubmitted = false;
  activateDep: FormGroup;

  constructor(
    private ApiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {

    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      alert('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

    this.activateDep = this.formBuilder.group({
      activation_text: [""],
      tenant_id: localStorage.getItem('tenant_id'),
      total_credit: [""],
      id: this.package_id
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  dep_details: any;
  totalCredit: any;
  balanceCredit: any;
  total_traveler: any;

  render_data() {
    this.ApiService.depBilling(this.package_id).subscribe((res: any) => {
      console.log(res,'recharge');
      console.log(res.data.dep_details);
      this.dep_details = res.data.dep_details;
      this.total_traveler = res.data.total_traveler;
      this.totalCredit = res.data.consumption_credit;
      this.balanceCredit = res.data.balance_credit;
      this.activateDep.patchValue({
        total_credit: this.totalCredit,
      })
    })
  }

  textCopy() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('.textCopy').text()).select();
    document.execCommand("copy");
    this.toastr.success("Text copied");
    $temp.remove();
  }

  get form() {
    return this.activateDep.controls;
  };
  // active(){
  //   if (this.activateDep.value.activation_text === "Activate") {
  //     this.toastr.error("Please write Activate");
  //   }
  // }

  submitAct() {
    this.isSubmitted = true;
    // if(this.balanceCredit < this.totalCredit){
    //   this.toastr.error('Please recharge');
    // }
    if (this.activateDep.value.activation_text == "" || this.activateDep.value.activation_text !== "Activate") {
      this.isSubmitted = false;
      this.toastr.error('Please write "Activate"');
    }
    if (this.activateDep.value.activation_text === "Activate") {
      console.log(this.activateDep.value)
      this.ApiService.DepActivate(this.activateDep.value).subscribe((obj: any) => {
          this.isSubmitted = false;
          this.toastr.success(obj.message);
          this.router.navigateByUrl('/departure-table');
        },
        (error) => {
          this.toastr.error('Somthing went wrong');
        }
      );
     } 
  }
}
