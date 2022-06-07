import {Component, OnInit} from '@angular/core';
import { AdminControlService } from "../../../services/admin-control.service";
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {
  isLoading = true;
  paymentDetails:any;
  id:any;
  constructor(
    private adminService: AdminControlService,
  ) {
    this.renderData();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  renderData() {
    this.adminService.billingDetails().subscribe( ( res: any) => {
      console.log(res)
      this.paymentDetails = res.data.details;
      console.log(this.paymentDetails);
    } )
  }

  downloadSample(id:any) {
    this.adminService.downloadSample(id).subscribe((res: any) => {
      console.log(res, 'pdf data');
     this.downloadFile(res.data);

    }, error => {
      console.log(error);
    });

  } 

  downloadFile(data: any) {
   // alert('hi')
    const blob = new Blob([data], { type: 'application/pdf' });
    saveAs(blob, "invoice.pdf");
    alert(blob)
  }

}
