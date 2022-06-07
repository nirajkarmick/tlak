import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from "ngx-toastr";
import { AdminControlService } from "../../../services/admin-control.service";

declare let $: any;


@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  isLoading= true;
  paymentData:any;
  totalBill:any;
  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminControlService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
    )
     { 
      this.renderData();
     }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  renderData() {
    this.adminService.billing().subscribe((res:any) => {
      console.log(res, 'data')
      this.paymentData = res.data.payment_transactions;
      this.totalBill = res.data.total_credit;
      console.log(this.paymentData)
    })
  }

}
