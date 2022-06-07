import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Data, ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { FlightService } from "../../../../services/flight.service";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AmazingTimePickerService } from 'amazing-time-picker';
import { NgSelectConfig, NgSelectModule } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common'
import { TranslateConfigService } from "../../../../services/translate-config.service";
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class FlightsComponent implements OnInit {
  dropdownList: any = [];
  selectedItems = [];
  dropdownSettings = {}
  package_id: any;
  flightForm_submit: FormGroup;
  flightForm_edit: FormGroup;
  flightSearch: FormGroup;
  ret_flightSearch: FormGroup;
  isSubmitted = false;
  isSubmittedManual = false;
  isSubmittedEdit = false
  isLoading = false;
  originatFormNo = [0];
  public selectedTime = '';
  public schedule_departure = '';
  public arrivaltimes = '';
  airportName: any;
  form_flight: any = [];
  flight_date: any;
  ret_isSubmitted = false;
  manual_flight: any = [];
  public todayDate: any = new Date();
  selected_people: any;
  selected_people_edit: any = [];
  keywords: any;
  originateFlightData: any = [];
  flight_type = 'org';
  flightform_name = 'Originating';
  option1 = true;
  option2 = false;
  isShow = true;
  searchFlightForm = false;
  addmannually = 'Add flight manually'; flightListID: any;
  flightListd: any;
  flightListd_code: any;
  flightListd_name: any;
  flightListd_date: any;
  flightListd_no: any;
  flightListd_people: any;
  public flightListd_pep: any = [];
  public flightlistd: any = [];
  flightUpdateId: any
  showPeople = false;
  people_name: any;
  flightListName = "";

  constructor(
    private route: ActivatedRoute,
    private FlightService: FlightService,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: MatDatepickerModule,
    private config: NgSelectConfig,
    private atp: AmazingTimePickerService,
    private toastr: ToastrService,
    private SpinnerService: NgxSpinnerService,
    private http: HttpClient,
    private translate: TranslateConfigService,
    public datepipe: DatePipe) {

    if (this.isLoading = true) {
      this.SpinnerService.show();
    } else {
      this.SpinnerService.hide();
    }

    // this.flightSearch = this.formBuilder.group({
    //   airline: ["", Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')],
    //   flight_no: ["", Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+$')],
    //   date_format: ["", Validators.required]
    // })
    this.flightSearch = this.formBuilder.group({
      airline: ["", Validators.required],
      flight_no: ["", Validators.required],
      date_format: ["", Validators.required]
    })
    this.ret_flightSearch = this.formBuilder.group({
      airline: ["", Validators.required, Validators.minLength(2), Validators.pattern('^[_A-z0-9]*((-|\s)*[_A-z0-9])*$')],
      flight_no: ["", Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+$')],
      date_format: ["", Validators.required]
    })

    this.flightForm_submit = this.formBuilder.group({
      departure_airport: ["", Validators.required],
      arrival_airport: ["", Validators.required],
      airline: ["", Validators.required],
      airline_code: ["", Validators.required],
      flight_number: ["", Validators.required, Validators.maxLength(2), Validators.pattern('^[0-9]+$')],
      departure_date: ["", Validators.required],
      arrival_date: ["", Validators.required],
      schedule_departure: ["", Validators.required],
      arrivaltimes: ["", Validators.required],
      type: [this.flight_type],
      departure_city_country: [""],
      departure_latitude: [""],
      departure_longitude: [""],
      arrival_airport_city_country: [""],
      arrival_latitude: [""],
      arrival_longitude: [""],
      arrival_iata: [""],
      departure_iata: [""],
      departureG: [""],
      terminal: [""],
      timetotals: [""],
      delayTime: [""],
    });

    this.flightForm_edit = this.formBuilder.group({
      airline: ["", Validators.required],
      airline_code: ["", Validators.required],
      flight_number: ["", Validators.required],
      schedule_departure: ["", Validators.required],
      schedule_arrival: ["", Validators.required],
      departure_date: ["", Validators.required],
      departure_people: [""],
    });

    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found! please create new Tour');
      this.router.navigateByUrl('/departure-create');
    } else {
    }
    this.response_flight_data();
  }

  // myFunction(){
  //   this.date=new Date();
  //   let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
  //  }

  validateNo(e): boolean {
    const charCode = e.which ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false
    }
    return true
  }

  setPeopleValue() {
    //console.log(this.selected_people)
  }

  ngOnInit(): void {
    this.dropdownList = [];
    this.selectedItems = [];
    this.traveller_list();

    this.dropdownSettings = {
      text: "Add Travellers",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      classes: "myclass custom-class"
    };

  }

  toggleDisplay() {
    this.searchFlightForm = !this.searchFlightForm;
    if (this.isShow = !this.isShow) {
      this.isSubmittedManual = false;
      this.isSubmitted = false;
      this.addmannually = 'Add flight manually';
      this.flightSearch.reset();
      this.ret_flightSearch.reset();
      this.form_flight = [];
      this.selected_people = [];
      this.flightForm_submit.reset();
    } else {
      this.isSubmitted = false;
      this.isSubmittedManual = false;
      this.addmannually = 'Search Flight';
      this.form_flight = [];
      this.flightSearch.reset();
      this.ret_flightSearch.reset();
      this.flightForm_submit.reset();
      this.selected_people = [];
    }
  }

  response_flight_data() {
    this.SpinnerService.show();
    this.flightListd = [];
    this.FlightService.Flightlist(this.package_id).subscribe((res: any) => {
      console.log(res.flights, 'data')
      const f_typeR = res.flights;
      this.SpinnerService.hide();
      if (f_typeR.length > 0) {
        for (let i = 0; i < f_typeR.length; i++) {
          this.flightListd.push(f_typeR[i]);
          console.log(this.flightListd);
        }
      }
    }, (error) => {
      this.toastr.error('Connection failed')
    })
  }

  showSpinner() {
    this.isLoading = true;
    this.SpinnerService.show();
    setTimeout(() => {
      this.SpinnerService.hide();
      this.isLoading = false;
    }, 1000);
  }


  traveller_list() {
    this.isLoading = true
    this.dropdownList = [];
    this.FlightService.Flightlist(this.package_id).subscribe((res: any) => {
      console.log(res);
      this.people_name = res.people_name;
      this.isLoading = false
      if (this.people_name && this.people_name.length > 0) {
        for (let x = 0; x < this.people_name.length; x++) {
          this.people_name[x].selected = false;
        }
      }
      //console.log(this.people_name);
    }, (error) => {
      this.toastr.error("Traveller not found");
    })
  }

  // clearFilter(){

  //   this.people_name = this.selectDropdown.handleClearClick();
  // }


  get flight() {
    return this.flightSearch.controls;
  }

  get ret_flight() {
    return this.ret_flightSearch.controls;
  }

  get flight_submit() {
    return this.flightForm_submit.controls;
  }

  submit_flight_manual_form() {
    this.isLoading = true
    this.manual_flight = [];
    this.isSubmittedManual = true;
    if (this.flightForm_submit.invalid) {
      return
    }
    this.flightForm_submit.value.type = this.flight_type;
    this.manual_flight.push(this.flightForm_submit.value);
    this.FlightService.flightApiPostManual(this.package_id, this.manual_flight, this.selected_people)
      .subscribe((obj: any) => {
        this.package_id, this.originateFlightData, this.selected_people
        console.log(obj);
        this.flightForm_submit.reset();
        this.isSubmittedManual = false;
        this.toastr.success(obj.already);
        this.isLoading = false;
        this.response_flight_data();
      })
  }



  changediv(divid: any) {
    this.form_flight = [];
    if (divid === "originatingForm") {
      this.flight_type = 'org';
      this.flightform_name = 'Originating';
      this.option1 = true;
      this.option2 = false;
      this.isSubmitted = false;
      this.flightSearch.reset();
    } else if (divid === "returningForm") {
      this.flight_type = 'ret'
      this.flightform_name = 'Returning';
      this.option1 = false;
      this.option2 = true;
      this.ret_isSubmitted = false;
      this.ret_flightSearch.reset();
    }
  }


  getsearchFlight(f_type: any) {
    this.isLoading = true;
    if (f_type == 'org') {
      this.isSubmitted = true;
    } else {
      this.ret_isSubmitted = true;
    }
    if (f_type == 'org' && this.flightSearch.invalid) {
      return
    } else if (f_type == 'ret' && this.ret_flightSearch.invalid) {
      return
    } else {
      if (f_type == 'org') {
        var searchdate = this.flightSearch.value;
        var f_date = moment($("#date_format").val()).format('YYYY/DD/MM');
      } else {
        var searchdate = this.ret_flightSearch.value;
        var f_date = moment($("#ret_date_format").val()).format('YYYY/DD/MM');
      }
      console.log(searchdate,f_date); //return;
      this.FlightService.flightinfo(searchdate, f_date).subscribe((res: any) => {
        console.log(res, 'FLIGHT RESPONSE');
        this.flight_date = res.data;
        this.isLoading = false
        this.flightSearch.reset();
        this.ret_flightSearch.reset();
        this.isSubmitted = false;
        this.ret_isSubmitted = false;

        if (res.flag == 1) {
          if (this.flight_date.scheduledFlights && this.flight_date.scheduledFlights.length > 0) {
            var ff_airline = res.data.appendix.airlines != undefined ? res.data.appendix.airlines : [];
            var ff_airports = res.data.appendix.airports ? res.data.appendix.airports : [];
            var flightStatuses = res.data.scheduledFlights ? res.data.scheduledFlights : [];

            this.form_flight = [];
            this.originateFlightData = [];
            for (let z = 0; z < this.flight_date.scheduledFlights.length; z++) {
              this.form_flight.push(z);
              this.setOrgFlightData();
              let that = this;
              setTimeout(function () {
                var depdate = flightStatuses[z].departureTime;
                var arrdate = flightStatuses[z].arrivalTime;
                $("#airline_code_" + z).val(that.flight_date.scheduledFlights[z].carrierFsCode);
                $("#flightnumber_" + z).val(that.flight_date.scheduledFlights[z].flightNumber);
                //console.log(ff_airports);
                if (ff_airports && ff_airports.length > 0) {
                  for (let o = 0; o < ff_airports.length; o++) {
                    if (ff_airports[o].iata == that.flight_date.scheduledFlights[z].departureAirportFsCode) {
                      $('#airportname_' + z).val(ff_airports[o].name);
                      $('#depp_iata_' + z).val(ff_airports[o].iata);
                      that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'dep'); // flight arrival data
                    }
                    if (ff_airports[o].iata == that.flight_date.scheduledFlights[z].departureAirportFsCode) {
                      $('#airportname_' + z).val(ff_airports[o].name);
                      that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'dep'); // flight arrival data
                    }
                    if (ff_airports[o].iata == that.flight_date.scheduledFlights[z].arrivalAirportFsCode) {
                      $('#airportname_arrival_' + z).val(ff_airports[o].name);
                      $('#arvv_iata_' + z).val(ff_airports[o].iata);
                      that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'arr');
                    }
                    if (ff_airports[o].iata == that.flight_date.scheduledFlights[z].arrivalAirportFsCode) {
                      $('#time_travel_' + z).val(ff_airports[o].utcOffsetHours);
                      that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'arr');
                    }
                    if (ff_airports[o].iata == that.flight_date.scheduledFlights[z].arrivalAirportFsCode) {
                      $('#time_travel_' + z).val(ff_airports[o].utcOffsetHours);
                      that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'dep');
                    }

                  }
                }
                if (ff_airline && ff_airline.length > 0) {
                  for (let o = 0; o < ff_airline.length; o++) {
                    if (ff_airline[o].fs == that.flight_date.scheduledFlights[z].carrierFsCode) {
                      $('#airline_name_' + z).val(ff_airline[o].name);
                    }
                  }
                }
                var formatedDate = that.convertTZ(that.flight_date.scheduledFlights[z].departureTime, 'Asia/Kolkata');
                $("#flightdeparturedate_" + z).val(that.dateForm(formatedDate));
                var isoDateString = new Date(that.flight_date.scheduledFlights[z].departureTime).toISOString();
                //console.log(isoDateString);
                $("#flightdeparturetime_" + z).val(
                  that.dateTimeForm(depdate)
                );
                var isoDatearrivalString = new Date(that.flight_date.scheduledFlights[z].arrivalTime).toISOString();
                //console.log(isoDateString);
                $("#flightarrivaltime_" + z).val(
                  that.dateTimeForm(arrdate)
                );
              }, 400);
            }
          } else {
            console.log('not found');
            this.form_flight = [];
            this.toastr.error('Flight Not Found!');
          }
        }
        if(res.flag == 2) {  //change this
            if (this.flight_date.flightStatuses && this.flight_date.flightStatuses.length > 0) {
              var ff_airline = res.data.appendix.airlines != undefined ? res.data.appendix.airlines : [];
              var ff_airports = res.data.appendix.airports ? res.data.appendix.airports : [];
              var flightStatuses = res.data.flightStatuses ? res.data.flightStatuses : [];

              this.form_flight = [];
              this.originateFlightData = [];
              for (let z = 0; z < this.flight_date.flightStatuses.length; z++) {
                this.form_flight.push(z);
                this.setOrgFlightData();
                let that = this;
                setTimeout(function () {
                  var depdate = flightStatuses[z].departureDate.dateLocal;
                  var arrdate = flightStatuses[z].arrivalDate.dateLocal;
                  $("#airline_code_" + z).val(that.flight_date.flightStatuses[z].carrierFsCode);
                  $("#flightnumber_" + z).val(that.flight_date.flightStatuses[z].flightNumber);
                  //console.log(ff_airports);
                  if (ff_airports && ff_airports.length > 0) {
                    for (let o = 0; o < ff_airports.length; o++) {
                      if (ff_airports[o].iata == that.flight_date.flightStatuses[z].departureAirportFsCode) {
                        $('#airportname_' + z).val(ff_airports[o].name);
                        $('#depp_iata_' + z).val(ff_airports[o].iata);
                        that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'dep'); // flight arrival data
                      }
                      if (ff_airports[o].iata == that.flight_date.flightStatuses[z].departureAirportFsCode) {
                        $('#airportname_' + z).val(ff_airports[o].name);
                        that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'dep'); // flight arrival data
                      }
                      if (ff_airports[o].iata == that.flight_date.flightStatuses[z].arrivalAirportFsCode) {
                        $('#airportname_arrival_' + z).val(ff_airports[o].name);
                        $('#arvv_iata_' + z).val(ff_airports[o].iata);
                        that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'arr');
                      }
                      if (ff_airports[o].iata == that.flight_date.flightStatuses[z].arrivalAirportFsCode) {
                        $('#time_travel_' + z).val(ff_airports[o].utcOffsetHours);
                        that.setArrivalAirport(ff_airports[o], that.flight_type, z, 'arr');
                      }

                    }
                  }
                  if (ff_airline && ff_airline.length > 0) {
                    for (let o = 0; o < ff_airline.length; o++) {
                      if (ff_airline[o].fs == that.flight_date.flightStatuses[z].carrierFsCode) {
                        $('#airline_name_' + z).val(ff_airline[o].name);
                      }
                    }
                  }
                  if (that.flight_date.flightStatuses[z].airportResources != undefined) {
                    var status_data = that.flight_date.flightStatuses[z].airportResources;
                    $("#search_departureG_" + z).val(status_data.departureGate);
                    $("#search_terminal_" + z).val(status_data.departureTerminal);
                  }
                  if (that.flight_date.flightStatuses[z].flightDurations != undefined
                    && that.flight_date.flightStatuses[z].flightDurations.scheduledBlockMinutes != undefined) {
                    var total_time = that.flight_date.flightStatuses[z].flightDurations.scheduledBlockMinutes;
                    var time_in_hr = that.getTimeInHour(total_time);
                    $("#search_timetotals_" + z).val(time_in_hr);
                  }

                  // $("#search_delayTime_"+z).val('');


                  console.log(that.flight_date.flightStatuses[z]);
                  var formatedDate = that.flight_date.flightStatuses[z].departureDate.dateLocal;
                  var arrv_formatedDate = that.flight_date.flightStatuses[z].arrivalDate.dateLocal;
                  $("#flightdeparturedate_" + z).val(that.dateForm(formatedDate));
                  $("#flightarrvedate_" + z).val(that.dateForm(arrv_formatedDate));
                  //console.log(isoDateString);
                  $("#flightdeparturetime_" + z).val(
                    that.dateTimeForm(depdate)
                  );
                  $("#flightarrivaltime_" + z).val(
                    that.dateTimeForm(arrdate)
                  );
                }, 400);
              }
            }

          }
        }, (error) => {
        this.toastr.error("Server not responding");
      })
    }
  }
  getTimeInHour(totalMinutes: any) {
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;
    return hours + ' h ' + minutes + ' m';
  }
  setOrgFlightData() {
    this.originateFlightData.push({
      'flight_number': '',
      'departure_date': '',
      'airline': '',
      'airline_code': '',
      'schedule_departure': '',
      'arrivaltimes': '',
      'departure_airport': '',
      'departure_city_country': '',
      'departure_latitude': '',
      'departure_longitude': '',
      'departure_iata': '',
      'arrival_airport': '',
      'arrival_airport_city_country': '',
      'arrival_latitude': '',
      'arrival_longitude': '',
      'arrival_iata': '',
      'timetotals': '',
      'terminalD': '',
      'departureG': '',
      'delayTime': '',
      'type': this.flight_type,
    })
  }

  convertTZ(date: any, tzString: any) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
  }

  dateTimeForm(dateVal: any) {
    var newDate = new Date(dateVal);
    var sMonth = newDate.getMonth() + 1;
    var sDay = newDate.getDate();
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = this.padValue(newDate.getMinutes());
    var sAMPM = "AM";
    var iHourCheck = sHour;
    sHour = this.padValue(sHour);
    return sHour + ":" + sMinute;
    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    } else if (iHourCheck === 0) {
      sHour = 12;
    }
    sHour = this.padValue(sHour);
    return sHour + ":" + sMinute + " " + sAMPM;
  }

  dateForm(dateVal: any) {
    var newDate = new Date(dateVal);
    var sMonth = newDate.getMonth() + 1;
    var sDay = newDate.getDate();
    var sYear = newDate.getFullYear();
    var sHour = newDate.getHours();
    var sMinute = this.padValue(newDate.getMinutes());
    var sAMPM = "AM";
    var iHourCheck = sHour;
    if (iHourCheck > 12) {
      sAMPM = "PM";
      sHour = iHourCheck - 12;
    } else if (iHourCheck === 0) {
      sHour = 12;
    }
    sHour = this.padValue(sHour);
    return sMonth + "/" + sDay + "/" + sYear;
  }

  padValue(value: any) {
    return value < 10 ? "0" + value : value;
  }

  getAirport(keywords: any, ev: any, f_type: any) {
    if (this.keywords && this.keywords.length > 3) {
      this.FlightService.getAirportName(this.keywords).subscribe((res: any) => {
        console.log(res)
        if (res && res.airport) {
        }
      }, error => {
        console.log('some thing went wrong');
      })
    }
  }

  save_origination() {
    this.isLoading = true
    if (this.form_flight && this.form_flight.length > 0) {
      var or = 0;
      var originateData: any = [];
      for (let og in this.form_flight) {
        var org_airportFrom = $("#airportname_" + or).val();
        var org_airportTo = $("#airportname_arrival_" + or).val();
        var org_airline = $("#airline_name_" + or).val();
        var org_airlineCode = $("#airline_code_" + or).val();
        var org_flightNo = $("#flightnumber_" + or).val();
        var org_depDateTime = $("#flightdeparturetime_" + or).val();
        var org_arrDateTime = $("#flightarrivaltime_" + or).val();
        var org_dep_date = $("#flightdeparturedate_" + or).val();
        var org_travel_time = $("#search_timetotals_" + or).val();
        var departureG = $("#search_departureG_" + or).val();
        var dep_terminal = $("#search_terminal_" + or).val();
        if (org_airportFrom == "" || org_airportFrom == undefined || org_airportTo == "" || org_airportTo == undefined) {
          this.toastr.error('Please add Airport')
        }
        this.originateFlightData[or].type = this.flight_type;
        this.originateFlightData[or].airline = org_airline;
        this.originateFlightData[or].airline_code = org_airlineCode;
        this.originateFlightData[or].flight_number = org_flightNo;
        this.originateFlightData[or].departure_airport = org_airportFrom;
        this.originateFlightData[or].arrival_airport = org_airportTo;
        this.originateFlightData[or].arrivaltimes = org_arrDateTime;
        this.originateFlightData[or].schedule_departure = org_depDateTime;
        this.originateFlightData[or].departure_date = org_dep_date;
        this.originateFlightData[or].timetotals = org_travel_time;
        this.originateFlightData[or].departureG = departureG;

        this.originateFlightData[or].terminalD = dep_terminal;

        originateData.push(this.originateFlightData[or]);
        console.log(this.originateFlightData);
        or++;
        this.FlightService.flightApiPost(this.package_id, this.originateFlightData, this.selected_people)
          .subscribe((obj: any) => {
            //console.log(obj);
            this.resetFlightForm();
            this.toastr.success(obj.already);
            this.response_flight_data();
            this.isLoading = false;
            this.dropdownList = [];
          })
      }
    }
  }

  resetFlightForm() {
    this.originateFlightData = [];
    this.flight_type = 'org';
    this.flightform_name = 'Originating';
    this.searchFlightForm = false;
    this.form_flight = [];
    this.flightSearch;
    this.ret_flightSearch;
    this.selected_people = [];
  }

  setArrivalAirport(air: any, f_type: any, cnt: any, c_type: any) {
    if (c_type == "arr") {
      this.originateFlightData[cnt].arrival_airport = air.name;
      this.originateFlightData[cnt].arrival_airport_city_country = air.countryName;
      this.originateFlightData[cnt].arrival_latitude = air.latitude;
      this.originateFlightData[cnt].arrival_longitude = air.longitude;
      this.originateFlightData[cnt].arrival_iata = air.iata;
    }
    if (c_type == "dep") {
      this.originateFlightData[cnt].departure_airport = air.name;
      this.originateFlightData[cnt].departure_city_country = air.countryName;
      this.originateFlightData[cnt].departure_latitude = air.latitude;
      this.originateFlightData[cnt].departure_longitude = air.longitude;
      this.originateFlightData[cnt].departure_iata = air.iata;
    }
    console.log(this.originateFlightData);
  }

  open() {
    const amazingTimePicker = this.atp.open({
      time: this.schedule_departure,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      changeToMinutes: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.schedule_departure = time;
    });
  }

  open_dep(cnt: any) {
    const amazingTimePicker = this.atp.open({
      time: $("#flightdeparturetime_" + cnt).val(),
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      changeToMinutes: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      // var dep_time=time;
      $("#flightdeparturetime_" + cnt).val(time);
    });
  }


  open_arr(cnt: any) {
    const amazingTimePicker = this.atp.open({
      time: $("#flightarrivaltime_" + cnt).val(),
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      changeToMinutes: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      // var dep_time=time;
      $("#flightarrivaltime_" + cnt).val(time);
    });
  }

  open_time() {
    const amazingTimePicker = this.atp.open({
      time: this.arrivaltimes,
      theme: 'dark',
      arrowStyle: {
        background: 'red',
        color: 'white'
      },
      changeToMinutes: true,
    });
    amazingTimePicker.afterClose().subscribe(time => {
      this.arrivaltimes = time;
    });
  }


  openflightEdit(id: any) {
    this.flightListd_pep = [];
    this.selected_people_edit = [];
    if (this.flightListd.length > 0) {
      for (let i = 0; i < this.flightListd.length; i++) {
        if (this.flightListd[i].id == id) {
          this.flightUpdateId = this.flightListd[i].id
          console.log(this.flightListd);
          this.flightForm_edit.patchValue({
            airline: this.flightListd[i].airline,
            airline_code: this.flightListd[i].airline_code,
            flight_number: this.flightListd[i].flight_number,
            schedule_departure: this.flightListd[i].schedule_departure,
            schedule_arrival: this.flightListd[i].schedule_arrival,
            departure_date: this.flightListd[i].departure_date,
          });
          // console.log(this.people_name, 'all people');
          if (this.people_name && this.people_name.length > 0) {
            for (let b = 0; b < this.people_name.length; b++) {
              /*this.selected_people;*/
              this.flightListd_pep.push(this.people_name[b]);
              //this.flightListd_pep[b].selected = false;
              if (this.flightListd[i].people_id && this.flightListd[i].people_id.length > 0) {
                for (let pplID of this.flightListd[i].people_id) {
                  if (pplID == this.people_name[b].id) {
                    console.log(pplID);
                    this.selected_people_edit.push(pplID);
                    //this.flightListd_pep[b].selected = true;
                    // this.flightForm_edit.patchValue({
                    //   departure_people: this.selected_people_edit,
                    // });
                  }
                }
              }
              //this.flightListd_pep.selected = true;
            }
          }
          // console.log(this.flightListd_pep, 'people');
          // console.log(this.selected_people_edit, 'sel people');
        }
      }
    }
    setTimeout(() => {
      this.showPeople = true;
    }, 500);
  }



  get flight_edit() {
    return this.flightForm_edit.controls;
  }

  manual_flightEdit: any = [];

  submitEditFlight() {
    // console.log(this.selected_people_edit,'ed'); return false;
    this.isLoading = true;
    this.isSubmittedEdit = true;
    if (this.flightForm_edit.invalid) {
      return
    } else {
      console.log(this.flightForm_edit.value, this.selected_people_edit);
      this.manual_flightEdit.push(this.flightForm_edit.value);
      this.FlightService.flightApiedit(this.flightUpdateId, this.flightForm_edit.value, this.selected_people_edit).subscribe((obj: any) => {
        this.toastr.success(obj.message);
        this.response_flight_data();
        $("#exampleModalCenter").trigger('click');
      })
    }
  }

  openflightform(id: any) {
    if (this.flightListd.length > 0) {
      for (let i = 0; i < this.flightListd.length; i++) {
        if (this.flightListd[i].id == id) {
          this.flightListID = id;
          this.flightListName = this.flightListd[i].airline;
        }
      }
    }
  }

  delete_flight() {
    this.isLoading = true;
    this.FlightService.deleteFlight(this.flightListID).subscribe((res: any) => {
      if (res.status === true) {
        this.toastr.success(res.success);
        this.response_flight_data();
        this.isLoading = false;
      } if (res.status === false) {
        this.toastr.error(res.success);
        this.response_flight_data();
        this.isLoading = false;
      }

    })
  }

  validateNumber(e: any) {
    const pattern = /^[0-9]$/;

    return pattern.test(e.key)
  }


  depAirportData = [];
  arrAirportData = [];
  searchAirport(ev, f_type) {
    var loc_keywords = ev.target.value;
    if (ev.target.value.length > 4) {
      var data = { keyword: loc_keywords, destinations: [] };
      this.FlightService.searchAirport(data).subscribe(
        (data: any) => {
          if (f_type == 'd') {
            this.depAirportData = data.airport;
          } else {
            this.arrAirportData = data.airport;

          }

        },
        (err) => {

        }
      );
    } else {
      this.depAirportData = [];
      this.arrAirportData = [];
    }
  }
  // departure_airport: ["", Validators.required],
  // departure_iata:[""],
  // departure_city_country:[""],
  // departure_latitude:[""],
  // departure_longitude:[""],

  // arrival_airport: ["", Validators.required],
  // arrival_iata:[""],
  // arrival_airport_city_country:[""],
  // arrival_latitude:[""],
  // arrival_longitude:[""],

  fetch_airp(f_type, air_data) {
    console.log(air_data)
    if (f_type == "d") {
      this.flightForm_submit.patchValue({
        departure_airport: air_data.dest_name,
        departure_iata: air_data.iata_code,
        departure_city_country: air_data.country_name,
        departure_latitude: air_data.latitude,
        departure_longitude: air_data.longitude,
      })
    }
    if (f_type == "a") {
      this.flightForm_submit.patchValue({
        arrival_airport: air_data.dest_name,
        arrival_iata: air_data.iata_code,
        arrival_airport_city_country: air_data.country_name,
        arrival_latitude: air_data.latitude,
        arrival_longitude: air_data.longitude,
      })
    }
    this.depAirportData = [];
    this.arrAirportData = [];
    console.log(this.flightForm_submit.value)
  }
}
