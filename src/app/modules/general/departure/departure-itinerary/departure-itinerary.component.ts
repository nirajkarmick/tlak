import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute, Router } from "@angular/router";
import { ItineraryService } from '../../../../services/itinerary.service';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormControl } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import { TranslateConfigService } from "../../../../services/translate-config.service";
//import { threadId } from 'worker_threads';

declare var $: any;

@Component({
  selector: 'app-departure-itinerary',
  templateUrl: './departure-itinerary.component.html',
  styleUrls: ['./departure-itinerary.component.css']
})
export class DepartureItineraryComponent implements OnInit {
  // credentials = { day_title: "", day_highlights: "", add_info: "", day_notes: "", };
  package_id: any;
  dayWise: any;
  day_title: any;
  day_highlights: any;
  day_notes: any;
  locationForm: FormGroup;
  no_of_days: any;
  all_locations: any;
  day_array: any;
  select_location: any;
  itaneary_forms: any;
  destination_selected: any;
  isSubmitted = false;
  isLoading = true;
  locations: any = [];
  set_location: any;
  poiurl = 'https://tlakdevnew.s3-us-west-2.amazonaws.com/poi/';
  locationImg: any = [];
  day_no: any;
  imageName: any;
  dayImage = new FormData();
  filePath = "";
  urlImg: any;
  loadDestImage = [];
  destinationToPullit = [];
  dd_img: any = [];
  city: any
  cityId: any
  day_url: any;
  day_img: any;
  cityData: any = [];
  selectedPoi: any = [];
  poiList: any = [];
  poiList1: any = [];
  first_day_id = 0;
  all_selected_poi_in_days: any = [];
  optional_poi = [];
  formData: any
  formLocation: any = [];
  formPois: any = [];
  next_day_id = 0;
  otherLoction: any = [];

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private itinerary_service: ItineraryService,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('cannot find the package');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.renderdata();
      this.pullDestinationImages();
    }
    this.locationForm = this.formBuilder.group({
      day_title: ["", Validators.required],
      day_highlights: [""],
      add_info: [""],
      day_notes: [""],
      day_url: [""],
      day_img: [""],
    })

    setTimeout(() => {
      $("#loading").css('display', 'none');
    }, 1400);
  }

  ngOnInit(): void {
  }

  loadLoader() {
    setTimeout(() => {
      $("#loading").css('display', 'none');
    }, 1400);
  }

  noImagePoi = "https://tlakdevnew.s3.us-west-2.amazonaws.com/poi/no-image.png";
  onPoiImgError(event) {
    event.target.src = this.noImagePoi;
  }

  renderdata() {
    this.day_array = [];
    this.select_location = [];
    this.itinerary_service.daywise(this.package_id).subscribe((res: any) => {
      this.no_of_days = res.total_iti_days;
      this.itaneary_forms = res.day_wise_itaneary;
      var first_day_id = this.itaneary_forms[0].id;
      this.first_day_id = this.itaneary_forms[0].id;
      this.set_day_check_disabled(res.day_wise_itaneary);
      if (this.no_of_days > 0) {
        for (let i = 1; i <= this.no_of_days; i++) {
          this.day_array.push(i);
        }
      } else {
        this.day_array = [];
      }
      this.all_locations = res.location;
      var that = this;
      if (this.all_locations && this.all_locations.length > 0) {
        this.destination_selected = this.all_locations[0].location_id;
        setTimeout(function () {
          that.pullDestinationImages();
        }, 100);
        this.set_location = this.all_locations;
      }

      setTimeout(() => {
        $(".dd_tab_link").removeClass('active');
        this.dayWiseForm(first_day_id);
        $("#dd_tab_" + first_day_id).addClass('active');
      }, 400);

    }, (error) => {
      this.toastr.error('server is not responding');
    })
  }

  renderPakage() {
    this.itinerary_service.daywise(this.package_id).subscribe((res: any) => {
      this.set_day_check_disabled(res.day_wise_itaneary);
    }, (error) => {
      this.toastr.error('server is not responding');
    })
  }

  set_day_check_disabled(day_data: any) {
    this.all_selected_poi_in_days = [];
    for (let dd of day_data) {
      if (dd.pois && dd.pois.length > 0) {
        for (let poi of dd.pois) {
          this.all_selected_poi_in_days.push({ 'id': poi.pois_id, 'day': dd.id });
        }
      }
    }
  }

  setDisabledPoi() {
    setTimeout(() => {
      if (this.otherLoction && this.otherLoction.length > 0) {
        for (let poi of this.otherLoction) {
          $("input[type=checkbox][value=" + poi.pois_id + "]").prop("disabled", true);
        }
      }
    }, 200);
  }

  dayWiseForm(id: any) {
    this.next_day_id = 0;
    this.select_location = [];
    this.dd_img = [];
    $(".loc_chck").prop('checked', false);
    this.day_no = id;
    let d_count = 0;
    for (let dys of this.itaneary_forms) {
      if (dys.id == id && this.itaneary_forms[d_count + 1] != undefined) {
        this.next_day_id = this.itaneary_forms[d_count + 1].id;
      }
      d_count++;
    }
    $('#Dayitinerary').trigger("reset");
    this.itinerary_service.dayDetails(this.day_no, this.package_id).subscribe((res: any) => {
      this.formData = res.iti_details.day_data;
      this.formLocation = res.iti_details.location;
      this.otherLoction = res.iti_details.other_pois;
      this.formPois = res.iti_details.pois;
      this.setCheckedLocaton(this.formLocation);
      setTimeout(() => {
        this.setCheckedPois(this.formPois, this.day_no);
      }, 1200);
      this.locationForm.patchValue({
        day_title: this.formData.name,
        day_highlights: this.formData.description,
        add_info: this.formData.inclusions,
        day_notes: this.formData.exclusions,
        day_img: "",
        day_url: this.formData.banner_image,
      });
      this.filePath = this.formData.banner_image;
    })
  }

  setCheckedLocaton(loc: any) {
    let index = 0;
    if (loc && loc.length > 0) {
      for (let lc of loc) {
        var loc_id = lc.location_id;
        this.set_location_poi_edit(lc.location_id, lc.geoname)
        $("input[type=checkbox][value=" + loc_id + "]").prop("checked", true);
        index++;
      }
    } 
  }

  setCheckedPois(loc: any, day_no: any) {
    this.poiList = [];
    let index = 0;
    if (loc && loc.length > 0) {
      for (let lc of loc) {
        for (let poi of lc) {
          $("input[type=checkbox][value=" + poi.pois_id + "]").prop("checked", true);
          this.poiDataOnEdit(poi.pois_id);
        }
        index++;
      }
    }
    this.setDisabledPoi();
  }

  poiDataOnEdit(itin_poi_id: any) {
    if (this.select_location && this.select_location.length > 0) {
      for (let i = 0; i < this.select_location.length; i++) {
        for (let m = 0; m < this.select_location[i].pois.length; m++) {
          if (this.select_location[i].pois[m].poi_id == itin_poi_id) {
            this.poiList.push(this.select_location[i].pois[m])
          }
        }
      }
    }
  }

  setDayImg(images_url: any, i: any) {  // Image select
    $('.htl_img').removeClass('htl-brder');
    $('#htl_chk_' + i)
      .parent()
      .addClass('htl-brder');
    this.urlImg = images_url;
    this.filePath = this.urlImg;
    this.locationForm.patchValue({
      day_url: this.filePath,
      day_img: "",
    });
    console.log(this.dd_img, 'data')
  }

  filename(files: any) {   // user image upload
    let that = this;
    const file = files.target.files[0];
    this.dayImage.set('image', file);
    this.imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.dd_img = e.target.result;
      that.locationForm.patchValue({
        day_img: that.dd_img,
        day_url: "",
      });
    });
    console.log(this.dd_img);
    reader.readAsDataURL(file);
  }

  set_location_poi(index: any, id: any, geoname: any, name: any) {
    this.locationImg = [];
   // this.cityData = [];
    var set_location = this.all_locations;
    this.locationImg.push(geoname);
    this.city = name;
    this.cityId = id;
    var isAvailable = false;
    var available_index = 0;
    this.pullDestinationImages();
    if (this.select_location && this.select_location.length > 0) {
      for (let i = 0; i < this.select_location.length; i++) {
        if (this.select_location[i].location_id == id) {
          isAvailable = true;
          available_index = i;
        } 
      }
      if (isAvailable) {
        if (this.select_location.length == 1) {
          // this.select_location = [];
          console.log( this.select_location, '1')
        } else {
          this.select_location.splice(available_index, 1);
          console.log( this.select_location, '2')
        }
      } else {
        this.select_location.push(set_location[index]);
        console.log( this.select_location, '3')
      }
    } else {
      this.select_location.push(set_location[index]);
      console.log( this.select_location, '4')
    }
    var index_arr=[];
   // alert($('#location_check_' + index).prop('checked'))
    if ($('#location_check_' + index).prop('checked')== true ) { 
      var ll_index=-1;
      for (let i = 0; i < this.poiList.length; i++) {
        if (this.poiList[i].location_id == id) { 
          // alert(i)
          ll_index = i;
          index_arr.push(i);
          $('#poi_poidata' + this.poiList[i].poi_id).prop('checked' , false)
          //this.poiList.splice(ll_index, 1);
        }
      }
      console.log(this.poiList, "location");
      if(index_arr.length>0){ 
        for (var l = index_arr.length -1; l >= 0; l--)
             this.poiList.splice(index_arr[l],1);

        console.log(index_arr , 'index')
        
         console.log(this.poiList, "remove location");

        }
    
      console.log(this.poiList);
      this.select_location.splice(index, 1);
      
    } else{

     // this.select_location.splice(index, 1);
    }
    this.setDisabledPoi();
  }

  uncheckedAll() {
  }
day_location=[];
  set_location_poi_edit(id: any, geoname: any) {
    this.locationImg = [];
    var set_location = this.all_locations;
    this.locationImg.push(geoname);
    var isAvailable = false;
    var available_index = 0;
    this.pullDestinationImages();
    if (set_location && set_location.length > 0) {
      for (let i = 0; i < set_location.length; i++) {
        if (set_location[i].location_id == id) {
          this.select_location.push(set_location[i]);
        }
      }
    }
    this.setDisabledPoi();
  }

  pullDestinationImages() {
    this.loadDestImage = [];
    this.itinerary_service.imagesFromPullit(this.locationImg).subscribe((data: any) => {
      var pullImages = data.destination_data;
      for (let dest_id in pullImages) {
        this.dd_img = pullImages[dest_id];
      }
    }, (error) => {
      this.toastr.error('not responding')
    });
  }
// optionalPois:any=[];
//   poiOptional(poi_id: any,loc_index:any,poi_index:any) {
//     console.log(this.poiList, 'before'); 
//     if ($('#opt_checked_' + poi_id).prop('checked') == true) {
//        this.select_location[loc_index].pois[poi_index].checked=false;
//        this.optionalPois.push(this.select_location[loc_index].pois[poi_index])
//         setTimeout(() => {
//         this.poiSelect(poi_id);
//       }, 700);
//     }else{
//       let indd = 0;
//       let del_indx = -1;
//       for (let pp of this.optionalPois) {
//         if (pp.poi_id == poi_id) {
//           del_indx = indd;
//         }
//         indd++;
//       }
//       if (del_indx > -1) {
//         this.optionalPois.splice(del_indx, 1);
//       }
//       console.log(this.poiList, 'remove optional')
//        //this.select_location[loc_index].pois[poi_index].checked=true;
//     }
   
    
//     console.log(this.optionalPois, 'optional list')

//    // console.log(this.poiList, 'after')


//     return;
//     if ($('#opt_checked_' + poi_id).prop('checked') == true) {
//       this.optional_poi.push(poi_id);
//     } else {
//       let indd = 0;
//       let del_indx = -1;
//       for (let pp of this.poiList) {
//         if (pp.poi_id == poi_id) {
//           del_indx = indd;
//         }
//         indd++;
//       }
//       if (del_indx > -1) {
//         this.optional_poi.splice(del_indx, 1);
//       }
//     }
//     //  console.log(this.optional_poi);
//   }
  poiSelect(itin_poi_id: any) {
    if (this.select_location && this.select_location.length > 0) {
      for (let i = 0; i < this.select_location.length; i++) {
        for (let m = 0; m < this.select_location[i].pois.length; m++) {
          if ($('#poi_poidata' + itin_poi_id).prop('checked') == true && this.select_location[i].pois[m].poi_id == itin_poi_id) {
            this.poiList.push(this.select_location[i].pois[m])
          }
          if ($('#poi_poidata' + itin_poi_id).prop('checked') == false && this.select_location[i].pois[m].poi_id == itin_poi_id) {
            let indd = 0;
            let del_indx = -1;
            for (let pp of this.poiList) {
              if (pp.poi_id == itin_poi_id) {
                del_indx = indd;
              }
              indd++;
            }
            if (del_indx > -1) {
              this.poiList.splice(del_indx, 1);
            }
          }
        }
      }
    }
      console.log(this.poiList, 'poiList123')
  }

  get form() {
    return this.locationForm.controls;
  }

  itinerary_data() {
    const formValue = this.locationForm.value;

    console.log(this.locationForm.value,this.poiList);
    this.isSubmitted = true;
    if (this.locationForm.invalid) {
      return
    }
    if (this.locationForm.value.day_url === null || this.locationForm.value.day_img === null) {
      this.toastr.error('Image Required');
      return
    } else {
      var data = {
        day: this.day_no,
        location: this.poiList,
        day_locations:this.select_location,
      }
      console.log(data, 'post data');
    //return;
      this.itinerary_service.dayItinerary(this.package_id, data, this.locationForm.value).subscribe((res: any) => {
        //  console.log(res);
        this.renderPakage();
        if (res.status) {
          this.toastr.success(res.status);
        }
        if (res.error) {
          this.toastr.error(res.error);
        }
        setTimeout(() => {
          $(".dd_tab_link").removeClass('active');
          if (this.next_day_id > 0) {
            $("#dd_tab_" + this.next_day_id).addClass('active');
            this.dayWiseForm(this.next_day_id);
          } else {
            this.dayWiseForm(this.first_day_id);
            $("#dd_tab_" + this.first_day_id).addClass('active');
          }
        }, 100);
      })
    }
  }
}
