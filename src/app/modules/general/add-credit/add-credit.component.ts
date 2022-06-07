import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Data, ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';
declare var $: any;

@Component({
  selector: 'app-add-credit',
  templateUrl: './add-credit.component.html',
  styleUrls: ['./add-credit.component.css']
})
export class AddCreditComponent implements OnInit {
  isLoading = true;
  payMent: FormGroup;
  isSubmitted = false;
  credentials = { credit: "", price: "", gst_price: "", gst_no: "", total_price: "", };
  getPrice: any;
  userData:any;
  preCredit: any;
  constructor(
    private ApiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private translate: TranslateConfigService
  ) {
    this.userData=localStorage.getItem('userDate');
    this.userData=JSON.parse(this.userData);
    this.render_data();

    this.payMent = this.formBuilder.group({
      credit: ["", Validators.required],
      price: [""],
      gst_price: [""],
      gst_no: [""],
      total_price: [""]
    })
  }

  Data: Array<any> = [
    { id: '1', value: '100' },
    { id: '2', value: '200' },
    { id: '3', value: '500' },
    { id: '4', value: '1000' },
    { id: '5', value: '5000' }
  ];

  total_credit: any;
  redirectURL: any;

  render_data() {
    this.ApiService.getRecharge().subscribe((res: any) => {
      console.log(res, 'recharge');
      this.total_credit = res.data.total_credit;
      //this.redirectURL = res.data;
    })
  }

  get form() {
    return this.payMent.controls;
  };


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);

  }

  getCredit: any

  putPrice() {
    this.getCredit = (<HTMLInputElement>document.getElementById('credit')).value;
   // $('#price').val(this.getCredit);
    if(this.getCredit < 100 ){
      this.toastr.error('Minimum recharge value is 100')
      return
    }
    this.getGST();
    this.payMent.patchValue({
      price: parseInt(this.getCredit)
    });
  }

  getGST() {
    var gstValue = parseInt(this.getCredit) * 0.18
    var gstValuePrice = parseInt(this.getCredit) + parseInt(this.getCredit) * 0.18
    $('#gst_price').val(gstValue)
    $('#total_price').val(gstValuePrice)
    this.payMent.patchValue({
      gst_price: gstValue,
      total_price: gstValuePrice,
    });
  }

  paySumbit() {
    if(this.getCredit < 100 ){
      this.toastr.error('Minimum recharge value is 100')
      return
    }
    this.isSubmitted = true;
    console.log(this.payMent.value);
    //return;
    if (this.payMent.invalid) {
      return
    } else {

      //console.log(this.userData.address_country);return;
      if(this.userData.address_country !=undefined && this.userData.address_country=='India'){
          this.ApiService.payCredit(this.payMent.value).subscribe((obj: any) => {
        console.log(obj)
        if(obj.status == true) {
        this.toastr.success(obj.message);
        window.location=obj.redirect_url;
        //this.router.navigateByUrl(this.redirectURL);
        }
        if ( obj.status == false ) {
          this.toastr.error(obj.message);
        }

      },
        (error) => {
          this.toastr.error('Somthing went wrong');
        }
      );
      }else{
       //outside India paypal call
      }

    }
  }

  oncheckChange(id: any) {
    var radioID = 're_' + id
    const value = $("input[type='radio'][id= " + radioID + "]").val();
    this.preCredit = value;
    this.getCredit = value;
    $('#price').val(this.preCredit);
    this.getGST();
    this.payMent.patchValue({
      credit: this.preCredit,
      price: this.preCredit,
    });

  }
}
