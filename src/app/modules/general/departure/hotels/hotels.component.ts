import {Component, OnInit} from '@angular/core';
import {HotelService} from '../../../../services/hotel.service';
import {Data, ActivatedRoute, Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {NgSelectConfig, NgSelectModule} from '@ng-select/ng-select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {TranslateConfigService} from "../../../../services/translate-config.service";

import * as moment from 'moment';

declare var $: any;

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css'],
})
export class HotelsComponent implements OnInit {
  credentials = {
    hotel_name: '',
    lat: '',
    long: '',
    days: '',
    address: '',
    description: '',
    total_room: '',
    country: '',
    state: '',
    destination: '',
    latitude: '',
    longitude: '',
    rating: '',
    type: '',
    hotel_image_upld: '',
    check_in: '',
    check_out: '',
    peoples: '',
    amenities: '',
    socket_type: '',
  };
  rating: any;
  hotelName: any;
  HotellistId: any;
  amenities_selected: any;
  no_of_day: any;
  totalDays: any;
  destination_name: any = [];
  socket_name: any = [];
  hotelList: any = [];
  imgUrl: any;
  date_selected: any;
  imageName: any;
  incusionForm = new FormData();
  filePath = "";
  hotelForm: FormGroup;
  isSubmitted = false;
  package_id: any;
  hotel_list: any = [];
  selected_people: any;
  selected_socket: any = [];
  peoples: any;
  socketType: any;
  amenities_list: any;
  dropdownList: any = [];
  checked = true;
  editableiD = 0;
  accDays: any = [];
  latitude: any;
  longitude: any;
  hotelDataId: any;
  h_id: any;
  all_images: any = [];
  hotel_image_upld: any;
  hotel_image: any;
  img_count = [1, 2, 3, 4, 5];
  public todayDate: any = new Date();
  public arrivaltimes = '';
  hotelData: any = [];
  hotel_name: any;
  cin_date: any;
  cout_date: any;
  s3_path = "";
  urlImg: any;
  hotelId = 0;
  check_in_date: any;

  constructor(
    private HotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private ReactiveFormsModule: ReactiveFormsModule,
    private config: NgSelectConfig,
    public dialog: MatDatepickerModule,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.hotelForm = this.formBuilder.group({
      hotel_name: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
      days: ['', Validators.required],
      address: [''],
      description: [''],
      total_room: [''],
      country: ['', Validators.required],
      state: [''],
      destination: ['', Validators.required],
      rating: [''],
      type: ['', Validators.required], // hotel type
      hotel_image_upld: [""],
      hotel_image: [""],
      check_in: ['', Validators.required],
      check_out: ['', Validators.required],
      c_in: ['', Validators.required],
      c_out: ['', Validators.required],
      peoples: [''],
      amenities: [''],
      socket_type: [''],
    });
    this.package_id = this.route.snapshot.queryParams['package_id'];
    this.editableiD = this.route.snapshot.queryParams['package_id'];
    if (this.editableiD === undefined) {
      this.editableiD = 0;
    } else {
      this.render_data();
    }
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
    }
  }

  ngOnInit(): void {
  }

  render_data() {
    this.peoples = [];
    this.totalDays = [];
    this.socket_name = [];
    this.HotelService.hotel_list(this.package_id).subscribe((res: any) => {
      console.log(res, 'render data')
      this.hotelList = res.hotels;
      this.socketType = res.sockets;
      this.amenities_list = res.amenities;
      this.destination_name = res.destination;
      this.no_of_day = res.totalnoOfDays;
      this.s3_path = res.HotelSRCPath;
    });
    this.traveller_list();
  }

  traveller_list() {
    this.dropdownList = [];
    this.HotelService.Travellerslist(this.package_id).subscribe(
      (res: any) => {
        this.peoples = res.peoples.data;
      },
      (error) => {
        this.toastr.error('Traveller list not found');
      }
    );
  }

  dateCheckInCheckOut(type: any) {
    if (type == 'in') {
      console.log(this.hotelForm.value.check_in);
      var st_date = new Date(this.hotelForm.value.c_in);
      this.cin_date = st_date.toLocaleString().slice(0, 10);
      this.hotelForm.patchValue({
        check_in: this.cin_date,
      });
    } else {
      var ed_date = new Date(this.hotelForm.value.c_out);
      this.cout_date = ed_date.toLocaleString().slice(0, 10);
      this.hotelForm.patchValue({
        check_out: this.cout_date,
      });
    }
    console.log(this.hotelForm.value);
  }

  get form() {
    this.isSubmitted = true;
    return this.hotelForm.controls;
  }

  setAmenities() {
    this.amenities_selected = [];
    for (let item of this.amenities_list) {
      if (item.checked == true) {
        this.amenities_selected.push(item.id);
      }
    }
    this.hotelForm.patchValue({
      amenities: this.amenities_selected,
    });
  }

  selectDate() {
    this.date_selected = [];
    for (let item of this.no_of_day) {
      if (item.checked == true) {
        this.date_selected.push({dayname: item.day_name, id: item.id});
      }
    }
    this.hotelForm.patchValue({
      days: this.date_selected,
    });
  }

  setdays(ev: any) {
    var id = ev.target.value;
    if (ev.target.checked) {
      this.accDays.push(id);
    } else {
      var index = this.accDays.indexOf(id);
      this.accDays.splice(index, 1);
    }
  }

  select_socket() {
    console.log(this.selected_socket);
    this.hotelForm.patchValue({
      socket_type: this.selected_socket,
    });
  }

  getSocketType(country) {
    this.socket_name = [];
    this.HotelService.getSocket(country).subscribe((res: any) => {
      let socket = res.data;
      console.log(socket, "getsocket");
      if (socket.length > 0) {
        for (let i = 0; i < socket.length; i++) {
          console.log(socket[i])
          this.socket_name.push(socket[i].id);
        }
      }
      this.hotelForm.patchValue({
        socket_type: this.socket_name,
      });
    })

  }

  people() {
    this.hotelForm.patchValue({
      peoples: this.selected_people,
    });
  }

  hotelSubmit() {
    // console.log(this.hotelId, 'hotelid');
    // console.log(this.hotelForm.value, 'hotel form value')
    // this.isSubmitted = true;
    // if (this.hotelForm.invalid) {
    //   console.log(this.hotelForm.value, 'hotel form submit');
    // }
    // if (this.filePath=='') {
    //   console.log(this.hotelForm.value)
    //   this.toastr.error('Image Required');
    // }
    // if(this.filePath==''){
    //   this.toastr.error('Please add hotel Image!');
    // }
    if (this.hotelId > 0) {
      console.log(this.hotelForm.value, 'update hotel')
      this.hotelUpdate();
    }
    if (this.hotelId == 0) {
      this.isSubmitted = true;
      if (this.hotelForm.invalid) {
        console.log(this.hotelForm.value, 'hotel form submit');
        return;
      }
      if (this.filePath == '') {
        console.log(this.hotelForm.value)
        this.toastr.error('Image Required');
        return;
      }
      if (this.filePath == '') {
        this.toastr.error('Please add hotel Image!');
        return;
      } else {
        console.log(this.filePath);
        console.log(this.hotelId, this.hotelForm.value);
        this.HotelService.hotelData(this.package_id, this.hotelForm.value).subscribe((res: any) => {
            this.render_data();
            this.toastr.success(res.message);
            this.resetHotelForm();
            console.log(res, 'dataz');
          },
          (error) => {
            this.toastr.error('database connection failed');
          }
        );
      }

    }
  }

  hotelUpdate() {
    console.log(this.package_id, this.hotelForm.value, this.hotelId);
    this.HotelService.hotelUpdate(
      this.package_id,
      this.hotelForm.value, this.hotelId
    ).subscribe(
      (res: any) => {
        this.toastr.success(res.message);
        console.log(res, 'dataz');
        this.resetHotelForm();
        this.render_data();
      },
      (error) => {
        this.toastr.error('database connection failed');
      }
    );
  }

  resetHotelForm() {
    this.hotelForm.reset();
    this.all_images = [];
    this.imgUrl = "";
    this.isSubmitted = false;
    this.hotelId = 0;
    this.selected_people = [];
    this.filePath = "";
    this.rating = 0;
  }

  set_rating(val: any) {
    this.rating = val;
    this.hotelForm.patchValue({
      rating: this.rating,
    });
  }

  search_hotels() {
    if (this.hotel_name && this.hotel_name.length > 4) {
      this.HotelService.search_hotels(this.hotel_name).subscribe(
        (data: any) => {
          this.hotelData = data.results.hotels;
          console.log(this.hotelData, 'data')
        }
      );
    }
  }

  fetch_hotel_details(item: any, id: any) {
    console.log(item);
    (this.latitude = item.location.lat),
      (this.longitude = item.location.lon),
      this.getGeoAddress(this.latitude, this.longitude);
    this.hotelForm.patchValue({
      hotel_name: item.label,
      lat: item.location.lat,
      long: item.location.lon,
      address: item.locationName,
      description: '',
      country: '',
    });
    this.h_id = item.id;
    var cc = 0;
    for (let cnt of this.img_count) {
      var img_url = (this.hotel_image =
        'https://photo.hotellook.com/image_v2/limit/h' +
        item.id +
        '_' +
        cnt +
        '/800/360.auto');
      this.all_images.push(img_url);
      if (cc == 0) {
        this.hotel_image =
          'https://photo.hotellook.com/image_v2/limit/h' +
          item.id +
          '_1/800/360.auto';
      }
      cc++;
    }
    this.hotelData = [];
  }

  accom_types = [
    'Hotel',
    'Resort',
    'Homestay',
    'Farmstay',
    'Apartment',
    'Bed & Breakfast',
    'Campground',
    'Luxury Lodge',
    'Cruise',
    'Boat',
    'Motel',
    'Hostel',
    'Guesthouse',
  ];

  getGeoAddress(latitude: any, longitude: any) {
    this.HotelService.getGeoAddress(latitude, longitude).subscribe(
      (data: any) => {
        console.log(data.results);
        var results = data.results;
        if (results && results.length > 0) {
          var indice = 0;
          for (var j = 0; j < results.length; j++) {
            if (results[j].types[0] == 'route') {
              indice = j;
              break;
            }
          }
          console.log(results[j]);
          for (var i = 0; i < results[j].address_components.length; i++) {
            console.log(results[j].address_components[i]);
            this.hotelForm.patchValue({
              address: results[j].formatted_address,
            });

            if (results[j].address_components[i].types[0] == 'locality') {
              //this is the object you are looking for City
              var city = results[j].address_components[i];
              this.hotelForm.patchValue({
                state: city.long_name,
                //destination: city.long_name,
              });
            }
            if (
              results[j].address_components[i].types[0] ==
              'administrative_area_level_1'
            ) {
              //this is the ob0ect you are looking for State
              var region = results[j].address_components[i];
              var city = results[j].address_components[i];
              this.hotelForm.patchValue({
                region: region.long_name,
              });
            }
            if (results[j].address_components[i].types[0] == 'country') {
              //this is the ob0ect you are looking for
              var ctr = results[j].address_components[i];
              var country = ctr.long_name
              this.getSocketType(country);
              this.hotelForm.patchValue({
                country: ctr.long_name,
              });
            }
          }
        } else {
        }
      },
      (error) => {
        console.log('ERROR ' + JSON.stringify(error));
      }
    );
  }

  set_hotel_img(img_url: any, i: any) {
    $('.htl_img').removeClass('htl-brder');
    $('#htl_chk_' + i)
      .parent()
      .addClass('htl-brder');
    this.urlImg = img_url;
    this.filePath = this.urlImg;
    this.hotelForm.patchValue({
      hotel_image: this.filePath,
      hotel_image_upld: "",
    });
    console.log(this.hotel_image, 'data')
  }

  filename(files: any) {
    let that = this;
    const file = files.target.files[0];
    this.incusionForm.set('image', file);
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.all_images = e.target.result;
      that.hotelForm.patchValue({
        hotel_image_upld: that.all_images,
        hotel_image: "",
      });
    });
    console.log(this.all_images);
    reader.readAsDataURL(file);
  }

  hotelEdit(id: any) {
    this.amenities_selected = [];
    this.date_selected = [];
    if (this.hotelList.length > 0) {
      for (let a = 0; this.hotelList.length > a; a++) {
        if (this.hotelList[a].id == id) {
          console.log(this.hotelList[a]);
          this.hotelId = id;
          this.selected_people = this.hotelList[a].people_id;
          this.filePath = this.s3_path + this.hotelList[a].hotel_image;
          this.rating = this.hotelList[a].hotel_rating;
          //set amenities selected
          if (this.hotelList[a].amety_id && this.hotelList[a].amety_id.length > 0) {
            let j = 0;
            for (let amn of this.amenities_list) {
              this.amenities_list[j].checked = false;
              for (let am_id of this.hotelList[a].amety_id) {
                if (am_id == amn.id) {
                  console.log(am_id)
                  this.amenities_list[j].checked = true;
                  this.amenities_selected.push(am_id);
                }
              }
              j++;
            }
          }
          //set day selected
          if (this.hotelList[a].days && this.hotelList[a].days.length > 0) {
            let j = 0;
            for (let dd of this.no_of_day) {
              this.no_of_day[j].checked = false;
              for (let am_id of this.hotelList[a].days) {
                if (am_id.itineraries_day_id == dd.id) {
                  console.log(am_id)
                  this.no_of_day[j].checked = true;
                  this.date_selected.push({dayname: dd.day_name, id: dd.id});
                }
              }
              j++;
            }
          }
          var check_in = new Date(this.hotelList[a].check_in);
          check_in = new Date(check_in.getTime() + Math.abs(check_in.getTimezoneOffset() * 60000));
          var check_inn = moment(check_in).format('MM/DD/YYYY');
          var check_inn_dt = new Date(check_inn);
          var check_out = new Date(this.hotelList[a].check_out);
          var check_outt = moment(check_out).format('MM/DD/YYYY');
          var check_outt_dt = new Date(check_outt);
          this.check_in_date = check_in;
          $("#hotel_arrival").val(check_inn);
          $("#hotel_checkout").val(check_outt);
          console.log(moment(check_in).format('MM/DD/YYYY'));
          console.log(new Date(check_in.getTime() + Math.abs(check_in.getTimezoneOffset() * 60000)));
          this.hotelForm.patchValue({
            hotel_name: this.hotelList[a].name,
            lat: this.hotelList[a].latitude,
            long: this.hotelList[a].longitude,
            address: this.hotelList[a].address,
            rating: this.hotelList[a].hotel_rating,
            total_room: this.hotelList[a].total_room,
            type: this.hotelList[a].type,
            country: this.hotelList[a].country,
            state: this.hotelList[a].state,
            destination: this.hotelList[a].location,
            c_in: check_inn_dt,
            c_out: check_outt_dt,
            // check_in: check_inn_dt,
            // check_out: check_outt_dt,
            amenities: this.hotelList[a].amety_id,
            description: this.hotelList[a].description,
            socket_type: this.hotelList[a].socket_id,
            peoples: this.hotelList[a].people_id,
            days: this.date_selected,
          });
          this.dateCheckInCheckOut('in');
          this.dateCheckInCheckOut('out');
          console.log(this.hotelForm);
        }
      }
    }
  }

  deletePopHotel(id: any, name: any) {
    this.HotellistId = id;
    this.hotelName = name;
  }

  deleteHotel() {
    this.HotelService.hoteldelete(this.HotellistId).subscribe(
      (res: any) => {
        this.toastr.success(res.success);
        // this.toastr.error(res.error);
        this.render_data();
      },
      (error) => {
        this.toastr.error('database is not responding');
      }
    );
  }
}
