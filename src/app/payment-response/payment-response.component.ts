import { Component, OnInit } from '@angular/core';
import {Data, ActivatedRoute, Router} from "@angular/router";
import {ApiService} from '../services/api.service';
import {ThemePalette} from '@angular/material/core'; 
// import { MatProgressSpinnerModule } from '@angular/material'; 
// import { MatProgressSpinnerModule } from '@angular/material'; 
@Component({
  selector: 'app-payment-response',
  templateUrl: './payment-response.component.html',
  styleUrls: ['./payment-response.component.css'],
  providers: [ApiService]
})
export class PaymentResponseComponent implements OnInit {
   formData:any=[];
   

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiServices: ApiService,) {      
       
    this.formData = this.route.snapshot.queryParams['form_data'];
    //alert(this.formData);
  }

  ngOnInit(): void {

    if(this.formData!=undefined){
      this.renderdata();
    }else{
      console.log('Payment not proceed!');
    }

  }
  pay_msg='Payment Processing....';
  pay_order_stutus='Pending';
  renderdata(){

    console.log('payment to api');

    var data={'form_data':this.formData};

    this.apiServices.paymentResponse(data).subscribe((res: any) => {
      this.pay_msg=res.message;
      this.pay_order_stutus=res.order_stutus;
      setTimeout(() => {
              this.router.navigateByUrl("/payment-details");
      }, 3400);

    })

  }
}
