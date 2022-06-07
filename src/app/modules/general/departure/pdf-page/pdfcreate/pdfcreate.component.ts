import {Component, OnInit} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {PdfService} from '../../../../../services/pdf.service';
import {TranslateConfigService} from '../../../../../services/translate-config.service';
import {AngularEditorConfig} from "@kolkov/angular-editor";

declare var $: any;

@Component({
  selector: 'app-pdfcreate',
  templateUrl: './pdfcreate.component.html',
  styleUrls: ['./pdfcreate.component.css'],
})
export class PdfcreateComponent implements OnInit {
  package_id: any;
  pdfTabs: any;
  isSubmitted = false;
  formPdf: FormGroup;
  pdfData: any;
  pdfType = '';
  imgName: any;
  poiImg: any;
  desp: any;
  dayName: any;
  pdfURL: any;
  dayTitle: any;
  flightData: any;
  hotelData: any;
  allTabs: any;
  hotelURL: any;
  poiURL: any;
  bannerURL: any;
  company_url: any;
  exclusion: any;
  dayForm: FormGroup;
  dayBannerPath = '';
  poiDayBannerPath = '';
  dd_img: any = [];
  dayimageName = '';
  dayPois: any = [];
  pdfLoader = false;
  exclusionForm: FormGroup;
  termsCondition: FormGroup;
  bannerForm: FormGroup;
  contactForm: FormGroup;
  basicForm: FormGroup;

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
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

    this.formPdf = this.formBuilder.group({
      day_title: [''],
      day_highlights: [''],
      img: [''],
      poi: [''],
      address: [''],
      poi_image: [''],
    });

    this.dayForm = this.formBuilder.group({
      itinerary_id: '',
      name: ['', Validators.required],
      description: [''],
      banner_image: [''],
      poi_image: [''],
      poi_image_upload: [''],
      pois: [[]],
    });
    this.termsCondition = this.formBuilder.group({
      terms_id: [''],
      terms: ['', Validators.required],
    });

    this.exclusionForm = this.formBuilder.group({
      exclusion: [''],
    });

    this.bannerForm = this.formBuilder.group({
      banner_image: [''],
      company_logo: [''],
      company_name: [''],
      email: [''],
      id: [''],
      phone: [''],
      website: [''],
    });
    this.contactForm = this.formBuilder.group({
      company_name: [''],
      name: [''],
      mobile: [''],
      email: [''],
      address: [''],
      guide_name: [''],
      guide_phone: [''],
      manager_name: [''],
      contact_id: [''],
      manager_phone: [''],
      manager_email: [''],
    });
    this.basicForm = this.formBuilder.group({
      attraction_address1: [''],
      attraction_address2: [''],
      attraction_address3: [''],
      attraction_address4: [''],
      attraction_address5: [''],
      attraction_address6: [''],
      attraction_image1: [''],
      attraction_image2: [''],
      attraction_image3: [''],
      attraction_image4: [''],
      attraction_image5: [''],
      attraction_image6: [''],
      attraction_name1: [''],
      attraction_name2: [''],
      attraction_name3: [''],
      attraction_name4: [''],
      attraction_name5: [''],
      attraction_name6: [''],
      departs: [''],
      id: [''],
      package_name: [''],
      place1: [''],
      place2: [''],
      place3: [''],
      place4: [''],
      start_from: [''],
      total_nights: [''],
      total_days: [''],
    });
  }

  amenities_list: any = [];

  renderHoteldata() {
    this.PdfService.hotel_list(this.package_id).subscribe((res: any) => {
      this.amenities_list = res.amenities;
      if (this.amenities_list && this.amenities_list.length > 0) {
        let k = 0;
        for (let am of this.amenities_list) {
          var am_nm =
            am.name == 'Bar / lounge'
              ? 'bar'
              : am.name == 'Conference hall'
                ? 'confrence_hall'
                : am.name;
          // am_nm= am.name=='Conference hall'?'confrence_hall':am.name;
          var am_name = am_nm.toLowerCase().replace(' ', '_');
          this.amenities_list[k].short_name = am_name;
          k++;
        }
      }
      // if(this.hotelData && this.hotelData.length>0){
      //   let h=0;
      //   for(let ht of this.hotelData){

      //       if(this.amenities_list && this.amenities_list.length>0){
      //       let k=0;
      //       for(let am of this.amenities_list){
      //          this.amenities_list[k].checked=false;
      //         am.name= am.name=='Bar / lounge'?'bar':am.name;
      //         am.name= am.name=='Conference hall'?'confrence_hall':am.name;
      //         var am_name=am.name.toLowerCase().replace(' ','_');
      //           console.log(ht[am_name],am_name);
      //           if(ht[am_name]!=undefined && ht[am_name]==1){
      //              this.amenities_list[k].checked=true;
      //          }
      //          k++;
      //       }
      //     }
      //     this.hotelData[h].amenities_list=this.amenities_list;
      //     this.hotelData[h].image_update='';
      //       h++;
      //   }
      // }
      //  console.log(this.hotelData);
    });
  }

  set_rating(val: any, cnt: any) {
    this.hotelData[cnt].rating = val;
  }

  setAmenities(name: any, cnt: any, a_cnt) {
    //  console.log(this.hotelData[cnt]);
    //console.log(this.hotelData[cnt+1].amenities_list[a_cnt].checked);
  }

  update_day_data() {
    //  console.log(this.dayForm.value);
    //  console.log(this.dayPois); //return;

    this.dayForm.patchValue({
      pois: this.dayPois,
    });
    this.PdfService.UpdateDayPDF(this.dayForm.value).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_after_update();
      setTimeout(() => {
        document.getElementById('closeDaymodaledit')?.click();
        document.getElementById('pdf_tab_Day2')?.click();
      }, 1000);
    });
  }

  updateTerms() {
    var data = {'terms':this.termsConditionDatas, 'terms_id':this.termsConditionDatasID};
    this.PdfService.UpdateTermPDF(data).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.render_after_update();
        setTimeout(() => {
          document.getElementById('closeTermsAndConditionModalEdit')?.click();
        }, 1000);
      }
    );
  }

  updateBanner() {
    this.PdfService.UpdateBannerPDF(this.bannerForm.value).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.render_after_update();
        setTimeout(() => {
          document.getElementById('closeBannerModel')?.click();
        }, 1000);
      }
    );
  }

  updateContact() {
    this.PdfService.UpdateContactPDF(this.contactForm.value).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.render_after_update();
        setTimeout(() => {
          document.getElementById('closeContactDetails')?.click();
        }, 1000);
      }
    );

  }

  updateBasic() {
    this.PdfService.UpdateBasicPDF(this.basicForm.value).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        this.render_after_update();
        setTimeout(() => {
          document.getElementById('userBasicsDetails')?.click();
        }, 1000);
      }
    );
  }

  updateInclusion() {
    var data = {
      inclusion_id: this.inclusionsData,
      exclusion_data: this.exclusion,
    };
    this.PdfService.UpdateInclusionPDF(data).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_after_update();
      setTimeout(() => {
        document.getElementById('closeInclusion')?.click();
      }, 1000);
      //  document.getElementById('closeInclusion')?.click();
    }, (error) => {

    });
  }

  updateHotel() {
    var data = {
      hotel_data: this.hotelData,
      package_id: this.package_id,
    };
    this.PdfService.UpdateHotelPDF(data).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_after_update();
      setTimeout(() => {
        document.getElementById('closeHotelModelEdit')?.click();
      }, 1000);
    });
  }

  UpdateFlightPDF() {
    var data = {
      flight_data: this.flightData,
      package_id: this.package_id,
    };
    this.PdfService.UpdateFlightPDF(data).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_after_update();
      setTimeout(() => {
        document.getElementById('closeFlightModelEdit')?.click();
      }, 1000);

    });
  }

  render_after_update() {
    this.render_data();
    setTimeout(() => {
      //this.tabPdf(this.pdfTabItem, this.pdpTabName);
      document.getElementById('pdf_tab_' + this.pdpTabName)?.click();

    }, 3400);
    console.log(this.pdfTabItem, this.pdpTabName, "sadfasdf");
  }

  bannerfilename(files: any) {
    // user image upload
    let that = this;
    const file = files.target.files[0];
    this.dayimageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.bannerImage = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.bannerForm.patchValue({
        banner_image: e.target.result,
      });
    });
    reader.readAsDataURL(file);
  }

  logofilename(files: any) {
    // user image upload
    let that = this;
    const file = files.target.files[0];
    this.dayimageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.bannerCompanyLogo = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.bannerForm.patchValue({
        company_logo: e.target.result,
      });
    });
    reader.readAsDataURL(file);
  }

  dayfilename(files: any) {
    // user image upload
    let that = this;
    const file = files.target.files[0];
    this.dayimageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.dayBannerPath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.dd_img = e.target.result;
      that.dayForm.patchValue({
        banner_image: that.dd_img,
      });
    });
    reader.readAsDataURL(file);
  }

  poidayfilename(files: any) {
    // user image upload
    let that = this;
    const file = files.target.files[0];
    // this.dayImage.set('image', file);
    this.dayimageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.poiDayBannerPath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.dd_img = e.target.result;
      that.dayForm.patchValue({
        poi_image_upload: e.target.result,
      });
    });
    //  console.log(this.dd_img);
    reader.readAsDataURL(file);
  }

  poifilename(files: any, cnt: any) {
    // day poi image upload
    let that = this;
    const file = files.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //this.dayBannerPath = reader.result as string;
    };
    var load_image = '';
    reader.addEventListener('load', function (e: any) {
      that.dayPois[cnt].image_update = e.target.result;
      $('#poifilePath_' + cnt).attr('src', e.target.result);
    });
    reader.readAsDataURL(file);
  }

  hotelfilename(files: any, cnt: any) {
    // day poi image upload
    let that = this;
    const file = files.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //this.dayBannerPath = reader.result as string;
    };
    var load_image = '';
    reader.addEventListener('load', function (e: any) {
      that.hotelData[cnt].image_update = e.target.result;
      $('#hotel_img_' + cnt).attr('src', e.target.result);
    });
    reader.readAsDataURL(file);
  }

  attractionfilename(files: any, img_no: number) {
    let that = this;
    const file = files.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      //this.dayBannerPath = reader.result as string;
    };
    let i_no = img_no;
    reader.addEventListener('load', function (e: any) {
      // alert(i_no);
      $('#banner' + i_no).attr('src', e.target.result);
      if (i_no == 1) {
        that.basicForm.patchValue({
          attraction_image1: e.target.result,
        });
      }
      if (i_no == 2) {
        that.basicForm.patchValue({
          attraction_image2: e.target.result,
        });
      }
      if (i_no == 3) {
        that.basicForm.patchValue({
          attraction_image3: e.target.result,
        });
      }
      if (i_no == 4) {
        that.basicForm.patchValue({
          attraction_image4: e.target.result,
        });
      }
      if (i_no == 5) {
        that.basicForm.patchValue({
          attraction_image5: e.target.result,
        });
      }
      if (i_no == 6) {
        that.basicForm.patchValue({
          attraction_image6: e.target.result,
        });
      }

      //  console.log(that.basicForm.value);
    });
    reader.readAsDataURL(file);
  }

  default_tabs = 'banner';

  render_data() {
    this.pdfLoader = false;
    this.PdfService.getPDFdata().subscribe((res: any) => {
      this.pdfTabs = res.data.tabs;
      console.log(this.pdfTabs, 'data')
      if (this.pdfTabs) {
        let jj = 0;
        for (let tb in this.pdfTabs) {
          if (jj == 0 && this.default_tabs == 'banner') {
            var banner_dta = {key: tb, value: this.pdfTabs[tb]};
            setTimeout(() => {
              this.tabPdf(banner_dta, this.pdfTabs[tb].type);
            }, 400);
          }
          jj++;
        }
      }
      this.pdfURL = res.iti_url;
      this.poiURL = res.poi_url;
      this.hotelURL = res.hotel_url;
      this.bannerURL = res.banner_url;
      this.company_url = res.company_url;
      //  console.log(this.hotelURL, 'hoteldata');
    });
  }

  ngOnInit(): void {
  }

  daynumber: any;
  bannerData: any;
  bannerImage: any;
  bannerCompanyLogo: any;
  bannerCompanyName: any;
  bannerCompanyPhone: any;
  bannerCompanyEmail: any;
  bannerCompanyWebsite: any;
  pdfTabItem: any;
  pdpTabName: any;
  termsData: any;
  contactData: any;
  basicData: any;
  inclusionsData: any;
  exclusionsData: any;
  allFlightId: any = [];
  allHotelId: any = [];

  resetAllData() {
    this.daynumber = '';
    this.bannerData = [];
    this.bannerImage = [];
    this.bannerCompanyLogo = '';
    this.bannerCompanyName = '';
    this.bannerCompanyPhone = '';
    this.bannerCompanyEmail = '';
    this.bannerCompanyWebsite = '';
    this.pdfTabItem = [];
    this.pdpTabName = [];
    this.termsData = [];
    this.contactData = [];
    this.basicData = [];
    this.inclusionsData = [];
    this.exclusionsData = [];
    this.allFlightId = [];
    this.allHotelId = [];
    this.hotelData = [];
  }

  flightPageNumber: any;
  hotelPageNumber: any;

  termsConditionDatas = "";
  termsConditionDatasID = "";

  tabPdf(item: any, name: any) {
    this.resetAllData();
    this.default_tabs = name;
    console.log(item, 'tab type');
    $('.pdf_nav_tab').removeClass('active');
    $('#pdf_tab_' + name).addClass('active');
    this.pdfTabItem = item;
    this.pdpTabName = name;
    //  console.log(item, 'click data');
    if (item.value == undefined) {
      this.dayName = item.type;
    } else {
      this.dayName = item.value.type;
    }
    // alert(this.dayName)
    if (this.dayName == 'banner') {
      //  console.log(item);
      this.bannerData = item.value.banner_data;
      this.bannerImage = this.bannerURL + this.bannerData.banner_image;
      this.bannerCompanyLogo = this.company_url + this.bannerData.company_logo;
      this.bannerCompanyName = this.bannerData.company_name;
      this.bannerCompanyPhone = this.bannerData.phone;
      this.bannerCompanyEmail = this.bannerData.email;
      this.bannerCompanyWebsite = this.bannerData.website;
      this.bannerForm.patchValue({
        company_name: this.bannerData.company_name,
        email: this.bannerData.email,
        id: this.bannerData.id,
        phone: this.bannerData.phone,
        website: this.bannerData.website,
      });
    }
    if (this.dayName == 'day') {
      this.pdfData = item.value.data;
      this.imgName = this.pdfData.banner_image;
      this.daynumber = this.pdfData.day_number;
      this.desp = this.pdfData.description;
      this.poiImg = this.pdfData.poi_image;
      this.dayTitle = this.pdfData.name;
      this.dayPois = this.pdfData.pois;

      this.dayForm.patchValue({
        itinerary_id: this.pdfData.id,
        name: this.pdfData.name,
        poi_image: this.pdfData.poi_image,
        description: this.pdfData.description,
        pois: this.pdfData.pois,
      });
      this.dayBannerPath = this.pdfURL + this.imgName;
      this.poiDayBannerPath = this.poiURL + this.pdfData.poi_image;
      // alert(this.poiDayBannerPath);
    }
    if (this.dayName == 'flight') {
      this.flightPageNumber = item.value.name;
      this.flightData = item.value.data;
      this.allFlightId = [];
      if (this.flightData && this.flightData.length > 0) {
        for (let flt of this.flightData) {
          // console.log(flt, 'fliiiiiiightttt');
          this.allFlightId.push(flt.id);
        }
      }
    }
    if (this.dayName == 'hotel') {
      this.hotelPageNumber = item.value.name;
      this.hotelData = item.value.data;
      this.renderHoteldata();
      this.allHotelId = [];
      if (this.hotelData && this.hotelData.length > 0) {
        let nn = 0;
        for (let flt of this.hotelData) {
          this.allHotelId.push(flt.id);
          this.hotelData[nn].image_update = '';
        }
      }
    }
    if (this.dayName == 'Terms_Conditions') {
      this.termsData = item.value.data;
      this.termsCondition.patchValue({
        terms_id: this.termsData.id,
        terms: this.termsData.terms,
      });
      this.termsConditionDatas = this.termsData.terms;
      this.termsConditionDatasID = this.termsData.id
    }
    if (this.dayName == 'contact') {
      this.contactData = item.value.data;
      //  console.log(this.contactData, 'contact data');

      this.contactForm.patchValue({
        company_name: this.contactData.company_name,
        name: this.contactData.name,
        mobile: this.contactData.mobile,
        email: this.contactData.email,
        address: this.contactData.address,
        guide_name: this.contactData.guide_name,
        guide_phone: this.contactData.guide_contact,
        manager_name: this.contactData.manager_name,
        contact_id: this.contactData.id,
        manager_phone: this.contactData.manager_phone,
        manager_email: this.contactData.manager_email,
      });
    }
    if (this.dayName == 'basic_detail') {
      this.basicData = item.value.basic_details;
      this.attraction_image1 = this.basicData.attraction_image1;
      this.attraction_image2 = this.basicData.attraction_image2;
      this.attraction_image3 = this.basicData.attraction_image3;
      this.attraction_image4 = this.basicData.attraction_image4;
      this.attraction_image5 = this.basicData.attraction_image5;
      this.attraction_image6 = this.basicData.attraction_image6;
      this.basicForm.patchValue({
        attraction_address1: this.basicData.attraction_address1,
        attraction_address2: this.basicData.attraction_address2,
        attraction_address3: this.basicData.attraction_address3,
        attraction_address4: this.basicData.attraction_address4,
        attraction_address5: this.basicData.attraction_address5,
        attraction_address6: this.basicData.attraction_address6,

        attraction_name1: this.basicData.attraction_name1,
        attraction_name2: this.basicData.attraction_name2,
        attraction_name3: this.basicData.attraction_name3,
        attraction_name4: this.basicData.attraction_name4,
        attraction_name5: this.basicData.attraction_name5,
        attraction_name6: this.basicData.attraction_name6,
        departs: this.basicData.departs,
        id: this.basicData.id,
        package_name: this.basicData.package_name,
        place1: this.basicData.place1,
        place2: this.basicData.place2,
        place3: this.basicData.place3,
        place4: this.basicData.place4,
        start_from: this.basicData.start_from,
        total_nights: this.basicData.total_nights,
        total_days: this.basicData.total_days,
      });
      //  console.log(this.basicForm.value);
    }
    if (this.dayName == 'inclusion') {
      this.inclusionsData = item.value.inclusion_data;
      this.exclusion = item.value.exclusion_data.exclusion;
      this.exclusionForm.patchValue({
        exclusion: item.value.exclusion_data.exclusion,
      });
    }
  }

  attraction_image1 = '';
  attraction_image2 = '';
  attraction_image3 = '';
  attraction_image4 = '';
  attraction_image5 = '';
  attraction_image6 = '';

  getTabName(key: any) {
    return this.pdfTabs[key].name;
  }

  get form() {
    return this.formPdf.controls;
  }

  pdfDataSave() {
  }

  addDayPDF() {
    var data = {
      page_name: 'itinerary',
      package_id: this.package_id,
      day_number: 1,
      id: this.dayForm.value.itinerary_id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addBannerPDF() {
    var data = {
      page_name: 'banner',
      package_id: this.package_id,
      id: this.bannerForm.value.id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);

  }

  addTermPDF() {
    var data = {
      page_name: 'terms',
      package_id: this.package_id,
      id: this.termsCondition.value.terms_id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addBasicPDF() {
    var data = {
      page_name: 'basic_detail',
      package_id: this.package_id,
      id: this.basicForm.value.id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addContactPDF() {
    var data = {
      page_name: 'contact',
      package_id: this.package_id,
      id: this.contactForm.value.contact_id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addInclPDF() {
    var data = {
      page_name: 'inclusion',
      package_id: this.package_id,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addFlightPDF() {
    var data = {
      page_name: 'flight',
      page_number: this.flightPageNumber,
      package_id: this.package_id,
      id: this.allFlightId,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  addHotelPDF() {
    var data = {
      page_name: 'hotel',
      page_number: this.hotelPageNumber,
      package_id: this.package_id,
      id: this.allHotelId,
    };
    this.callUpdateService(data);
    setTimeout(() => {
      this.scrollToTop();
    }, 2000);
  }

  callUpdateService(data: any) {
    this.PdfService.addDayDF(data).subscribe((res: any) => {
      this.toastr.success(res.message);
    });
  }

  pdfResponseOnError(user_code: any, file_name: any) {
    setTimeout(() => {
      this.PdfService.response_pdf(user_code).subscribe((cdata: any) => {
        this.check_pdf_status(user_code, file_name);
      });
    }, 45000);

  }

  generatePDF() {
    this.pdfLoader = true;
    this.PdfService.generate_PDF(this.package_id).subscribe(
      (data: any) => {
        if (data) {
          var pdf_data = data;
          this.PdfService.call_pdf(
            pdf_data.user_code,
            pdf_data.file_name
          ).subscribe(
            (cdata: any) => {
              console.log(cdata.error, 'c_pdf');

              if (cdata.error && cdata.http_Code == 500) {
                this.pdfResponseOnError(pdf_data.user_code, pdf_data.file_name);
                // this.toastr.error('Something went wrong. Try again');
                // this.pdfLoader = false;
              }
              if (cdata.http_Code == 504 || cdata.http_Code == 200) {
                this.check_pdf_status(pdf_data.user_code, pdf_data.file_name);
              }
              // this.toastr.success("Pdf generated successfully!");
              // this.router.navigateByUrl("/pdf-page?package_id="+this.package_id);
            },
            (error) => {
              console.log('err data');
              //on error  check pdf status
              this.PdfService.check_pdf_status(
                pdf_data.user_code,
                pdf_data.file_name
              ).subscribe((pdata: any) => {
                this.pdf_check_count++;
                if (pdata.status == 'true') {
                  // console.log('1 true');
                } else {
                  setTimeout(() => {
                    this.check_pdf_status(
                      pdf_data.user_code,
                      pdf_data.file_name
                    );
                  }, 5000);
                }
              });
            }
          );
        }
      },
      (error) => {
        this.pdfLoader = false;
        this.toastr.error('Something went wrong! Try again');
      }
    );
  }

  pdf_check_count = 0;

  check_pdf_status(user_code, file_name) {
    this.pdf_check_count++;
    this.PdfService.check_pdf_status(user_code, file_name).subscribe(
      (pdata: any) => {
        //  console.log(pdata);
        if (pdata.status == 'true') {
          this.toastr.success('Pdf generated successfully!');
          this.pdfLoader = false;
          this.router.navigateByUrl('/pdf-page?package_id=' + this.package_id);
        } else {
          setTimeout(() => {
            this.check_pdf_status(user_code, file_name);
          }, 5000);
        }
      },
      (error) => {
        this.toastr.error('Something went wrong. Try again');
        this.pdfLoader = false;
      }
    );
  }

  scrollToTop() {
    window.scrollTo({top: 1, behavior: 'smooth'});
  }
  config: AngularEditorConfig = {
    editable: true,
    //spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'false',
    sanitize: false,
    defaultFontSize: 'false',
    enableToolbar: false,
  };
}
