import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { PdfService } from "../../../../services/pdf.service";
import { TranslateConfigService } from "../../../../services/translate-config.service";


@Component({
  selector: 'app-pdf-page',
  templateUrl: './pdf-page.component.html',
  styleUrls: ['./pdf-page.component.css']
})
export class PdfPageComponent implements OnInit {
  package_id: any;
  pdfCreate: FormGroup;
  isSubmitted = false;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private PdfService: PdfService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.pdfCreate = this.formBuilder.group({
      filename: ["", Validators.required],
      //Itinerary: this.formBuilder.array([])
      itinerary: [""],
    });

    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }
allPdf:any=[];
pdf_link="https://watcons.blob.core.windows.net/tlakproduction/";
  render_data() {
  this.allPdf=[];
    this.PdfService.getPdfcreatePage(this.package_id).subscribe((res: any) => {
      console.log(res, 'pdf data')
      this.allPdf=res.data.data;
      console.log(res.data)
    });
  }

  Data: Array<any> = [
    { id: 'banner', value: 'banner', name: 'Banner' ,'checked':true},
    { id: 'basic_detail', value: 'basic_detail', name: 'Basic Details' ,'checked':true},
    { id: 'day_wise', value: 'day_wise', name: 'Day Wise Itineraries' ,'checked':true},
    { id: 'inclusions', value: 'inclusions', name: 'Inclusions/Exclusions' ,'checked':true},
    { id: 'flights', value: 'flights', name: 'Include Flights' ,'checked':true},
    { id: 'hotels', value: 'hotels', name: 'Include Hotel' ,'checked':true},
    { id: 'terms', value: 'terms', name: 'Terms & Conditions' ,'checked':true},
    { id: 'contact', value: 'contact', name: 'Contact' ,'checked':true},
  ];

  ngOnInit(): void {

    this.selectedMenu=this.Data;
    this.pdfCreate.patchValue({
      itinerary: this.selectedMenu,
    });
  }

  get form() {
    return this.pdfCreate.controls;
  }

  selectedMenu: any = [];

  onCheckboxChange() {
    this.selectedMenu = [];
    for (let item of this.Data) {
      if (item.checked == true) {
        this.selectedMenu.push(item);
      }
    }
    this.pdfCreate.patchValue({
      itinerary: this.Data,
    });
  }

  createPdf() {
    this.isSubmitted = true;
    if (this.pdfCreate.invalid) {
      return
    } else {
      // console.log(this.pdfCreate.value);
      this.PdfService.createPDF(this.pdfCreate.value, this.package_id).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.status);
        //this.render_data();
        this.router.navigateByUrl('/pdf-page/create?package_id=' + this.package_id);
      })
    }
  }
}
