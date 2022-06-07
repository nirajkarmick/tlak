import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Data, ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocationService } from '../../../../services/location.service';
import { MapsAPILoader } from '@agm/core';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';

declare var $: any;
declare var google: any;

@Component({
  selector: 'app-add-poi',
  templateUrl: './add-poi.component.html',
  styleUrls: ['./add-poi.component.css']
})
export class AddPoiComponent implements OnInit {
  editableiD = 0;
  package_id: any;
  map: any;
  latitude: any;
  longitude: any;
  zoom: any;
  address: any;
  private geoCoder: any;
  poiForm: FormGroup;
  destination: any;
  public fulladdr: any;
  public country_code: any;
  public state_name: any;
  public city = '';
  public zip_code: any;
  public country_name: any;
  public place_id: any;
  public utc_offset: any;
  public poiName: any;
  destData: any = [];
  isSubmitted = false;
  imageName: any = [];
  poiImages: any = [];
  filePath: any;
  fileExtName: any = [];
  fileSize: any;
  filesizeLimit: any;
  poiBannerImg: any = [];
  poisType: any;
  googleDestination:any;
  @ViewChild('search')
  public searchElementRef!: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ReactiveFormsModule: ReactiveFormsModule,
    private location_services: LocationService,
    private toastr: ToastrService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private config: NgSelectConfig,
  ) 
  {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    this.editableiD = this.route.snapshot.queryParams['package_id'];
    if (this.editableiD === undefined || this.editableiD === null || this.editableiD === NaN) {
      this.editableiD = 0;
    } 
    if (this.package_id === undefined) {
      this.router.navigateByUrl('/add-poi');
    } else {
    }
    this.poiForm = this.formBuilder.group({
      destination: ['', Validators.required],
      destination_id: ['', Validators.required],
      poiName: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      countryIso: ['', Validators.required],
      location: [''],
      placeId: [''],
      utcTime: [''],
      poiType: ['', Validators.required],
      banner_image: ['', Validators.required],
      poiImages: ['']
    });
    this.getPOItypes();
  }

  fetch_destination_details(item: any, id: any) {
    for (let dest of this.destData) {
      if (dest.id == id) {
        this.poiForm.patchValue({ destination: dest.dest_name });
        this.poiForm.patchValue({ destination_id: id });
      }
    }
    this.destData = [];
    console.log(this.poiForm);
  }

   search_destin(evnt:any) {
    var dest_key=evnt.target.value;
    if (dest_key && dest_key.length > 2) {
      this.location_services.search_destination(dest_key).subscribe(
        (res: any) => {
          console.log(res, 'keyup')
          this.destData = res.data;
          console.log(this.destData, 'data')
        }, (error) => {
          this.toastr.error("something went wrong")
        }
      );
    }
  };


  destination_fetch(city:any) {
    var dest_key=city;
    // if (dest_key && dest_key.length > 2) {
      this.location_services.search_destination(dest_key).subscribe(
        (res: any) => {
          this.googleDestination = res.data;
         console.log(this.googleDestination, 'google')
          for (var i = 0; i < this.googleDestination.length; i++) {
            if (dest_key === this.googleDestination[i].dest_name) {
              var destNameGoogle = this.googleDestination[i].dest_name;
              var destNameGoogleId = this.googleDestination[i].id
                console.log(destNameGoogle, 'actualname')
                this.poiForm.patchValue({
                  destination: destNameGoogle,
                  destination_id: destNameGoogleId
                });
            }
          }
        }, (error) => {
          this.toastr.error("something went wrong")
        }
      );
    // }
  };
  
  get form() {
    this.isSubmitted = true;
    return this.poiForm.controls;
  }

  poiTypes(id:any, image:any){
    this.poiForm.patchValue({
      poiId: id,
      poiImage: image,
    });
  }

  ngOnInit(): void {
    this.poiBannerImg = [];
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let that = this;
          //let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          let place = autocomplete.getPlace();
          if (place.geometry === undefined || place.geometry === null) {
            return;
          } else {
            console.log(place)
            that.latitude = place.geometry.location.lat();
            that.longitude = place.geometry.location.lng();
            that.place_id = place.place_id;
            that.zoom = 12;
            that.fulladdr = place.formatted_address;
            that.utc_offset = place.utc_offset_minutes;
            that.poiName = place.name;
            var street_address = "";
            var street_number = "";
            var street_route = "";
            for (var i = 0; i < (place.address_components).length; i++) {
              console.log(place.address_components[i]);
              if (place.address_components[i].types[0] == 'street_number') {
                street_number = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[0] == 'route') {
                street_route = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[0] == 'country') {
                that.country_name = place.address_components[i].long_name;
                that.country_code = place.address_components[i].short_name;
              }
              if (place.address_components[i].types[0] == "administrative_area_level_1") {
                that.state_name = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[0] == "locality") {
                that.city = place.address_components[i].long_name;
              }
              if (place.address_components[i].types[0] == "postal_code") {
                that.zip_code = place.address_components[i].long_name;
              }
            }
          };
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.destination_fetch(this.city)
          this.poiForm.patchValue({
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            state: this.state_name,
            country: this.country_name,
            location: this.city,
            address: this.fulladdr,
            placeId: this.place_id,
            countryIso: this.country_code,
            utcTime: this.utc_offset,
            poiName: this.poiName
          });
        });
      });
    });
  };


  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  };

  getAddress(latitude: any, longitude: any) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results: any, status: any) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  };
  

  uploadMultipleImage(files: any) {
    this.poiImages = [];
    this.imageName = [];
    for (let i = 0; i < files.target.files.length; i++) {
      const file = (files.target).files[i];
      //console.log(file)
      this.fileSize = file.size;
      this.filesizeLimit = 5009122; //5 MB validation
      var extName = file.name.toString().split('.').pop();
      var _validFileExtensions = ["jpg", "jpeg", "png"];
      var ext_found = _validFileExtensions.indexOf(extName);
      if (ext_found < 0) {
        this.poiImages = [];
        this.imageName = [];
        this.toastr.error('jpg, jpeg, png, csv,xls,doc,docx,pdf format supported');
        return;
      }

      if (this.fileSize > this.filesizeLimit) {
        this.toastr.error('File is too large. Maximum size allowed is 5 MB');
        return;
      }
      this.imageName.push(file.name);
      this.fileExtName.push(this.imageName.toString().split('.').pop());
      getBase64(files.target.files[i], extName);
    }
    let that = this;
    function getBase64(file: any, ext: any) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e: any) {
        that.poiImages.push({ 'base': reader.result, 'ext': ext });
        console.log(that.poiImages);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };
  
  uploadBannerImage(b_file: any) {
    console.log(b_file)
    this.poiBannerImg = [];
    for (let i = 0; i < b_file.target.files.length; i++) {
      const file = (b_file.target).files[i];
      console.log(file)
      this.fileSize = file.size;
      this.filesizeLimit = 5009122; //5 MB validation
      var extName = file.name.toString().split('.').pop();
      var _validFileExtensions = ["jpg", "jpeg", "png"];
      var ext_found = _validFileExtensions.indexOf(extName);
      if (ext_found < 0) {
        this.poiBannerImg = [];
        this.toastr.error('jpg, jpeg, png, csv,xls,doc,docx,pdf format supported');
        return;
      }
      if (this.fileSize > this.filesizeLimit) {
        this.toastr.error('File is too large. Maximum size allowed is 5 MB');
        return;
      }
      this.fileExtName.push(this.imageName.toString().split('.').pop());
      getBannerBase64(file, extName);
    }

    let that = this;
    function getBannerBase64(file: any, ext: any) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e: any) {
        that.poiBannerImg.push({ 'base': reader.result, 'ext': ext });
        console.log(that.poiBannerImg);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  };

  addPOI() {
    this.poiForm.patchValue({ poiImages: this.poiImages });
    this.poiForm.patchValue({ banner_image: this.poiBannerImg });
    console.log(this.poiForm.value);
    this.isSubmitted = true;
    if (this.poiBannerImg.length == 0) {
      this.toastr.error('Please upload Banner Image');
      return;
    }
    if (this.poiForm.invalid) {
      return
    } if(this.editableiD == 0) {
      console.log(this.poiForm.value);
      this.location_services.addPOI(this.poiForm.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.poiForm.reset();
        this.isSubmitted = false;
        this.ngOnInit();
      },(error)=> {
        this.toastr.error("Something went wrong");
      })
    } 
    if(this.editableiD > 0) {
    this.poiForm.patchValue({ poiImages: this.poiImages });
    this.poiForm.patchValue({ banner_image: this.poiBannerImg });
    console.log(this.poiForm.value);
    this.isSubmitted = true;
    if (this.poiBannerImg.length == 0) {
      this.toastr.error('Please upload Banner Image');
      return;
    }
    if (this.poiForm.invalid) {
      return
    } if(this.editableiD == 0) {
      console.log(this.poiForm.value);
      this.location_services.addPOI(this.poiForm.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.poiForm.reset();
        this.router.navigateByUrl('/departure-location?package_id=' + this.package_id);
        this.isSubmitted = false;
        this.ngOnInit();
      },(error)=> {
        this.toastr.error("Something went wrong");
      })
    }
    }
  };

  destinationPoiPackage() {
    console.log(this.poiForm.value)
    // this.poiForm.patchValue({ poiImages: this.poiImages });
    // this.poiForm.patchValue({ banner_image: this.poiBannerImg });
    // console.log(this.poiForm.value);
    // this.isSubmitted = true;
    // if (this.poiBannerImg.length == 0) {
    //   this.toastr.error('Please upload Banner Image');
    //   return;
    // }
    // if (this.poiForm.invalid) {
    //   return
    // } else {
    //   console.log(this.poiForm.value);
    //   this.location_services.addPOI(this.poiForm.value).subscribe((res: any) => {
    //     console.log(res);
    //     this.toastr.success(res.message);
    //     this.poiForm.reset();
    //     this.isSubmitted = false;
    //     this.ngOnInit();
    //   },(error)=> {
    //     this.toastr.error("Something went wrong");
    //   })
    // }
  }

  getPOItypes() {
    this.location_services.poi_types().subscribe((res: any) => {
      console.log(res, 'pois types');
      this.poisType = res.data;
    }, (error) => {
      this.toastr.error("Something went wrong");
    })
  };

}
