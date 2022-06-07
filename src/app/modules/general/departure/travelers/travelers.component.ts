import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Data, ActivatedRoute, Router } from "@angular/router";
import { TravellersService } from '../../../../services/travellers.service'
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../../services/translate-config.service";

declare var $: any;

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {
  credentials = { name: "" };
  credential = { import_file: "" };
  credentialss = { editable_name: "" };
  addPeople: FormGroup;
  addCSV: FormGroup;
  updatePeople: FormGroup;
  p_name: any;
  editable_id: any;
  editable_name: any;
  isSubmitted = false;
  isSubmitted1 = false;
  id: any;
  name: any;
  d: any;
  package_id: any;
  public paginationArray: any = [];
  totalData = 0;
  prev_page_url = "";
  next_page_url = "";
  last_page_url = "";
  total_page = 0;
  current_page = 1;
  last_pg_active = false;
  public travelerList: any = [];
  disableDeparture:any;
  

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private travellerServices: TravellersService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.addPeople = this.formBuilder.group({
      name: ["", Validators.required],
    })
    this.addCSV = this.formBuilder.group({
      import_file: [null],
    })
    this.updatePeople = this.formBuilder.group({
      editable_name: ["", Validators.required],
    })
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      alert('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  render_data() {
    this.paginationArray = [];
    this.travelerList = [];
    this.travellerServices.Travellerslist(this.package_id, this.current_page,).subscribe((res: any) => {
      this.disableDeparture = res.disableDeparture;
      //this.travelerList = res.peoples.data;
      if (res.peoples.data.length > 0) {
        for (let i = 0; i < res.peoples.data.length; i++) {
          this.travelerList.push(res.peoples.data[i]);
        }
      }
      this.totalData = res.peoples.total;
      this.prev_page_url = res.peoples.prev_page_url;
      this.next_page_url = res.peoples.next_page_url;
      this.last_page_url = res.peoples.last_page_url;
      this.total_page = res.peoples.last_page;
      this.current_page = res.peoples.current_page;
      for (let k = 1; k <= this.total_page; k++) {
        this.paginationArray.push(
          { 'page_no': k }
        );
      }
      if (this.current_page == this.total_page) {
        this.last_pg_active = true;
      }
    })
  }



  gotToPage(pg: any) {
    this.current_page = pg;
    this.render_data();

  }

  goToNext() {
    if (this.current_page != this.total_page) {
      this.current_page = this.current_page + 1;
      this.render_data();
    }
  }

  goToPrev() {
    if (this.current_page > 1) {
      this.current_page = this.current_page - 1;
      this.render_data();
    }
  }

  goToLast() {
    this.current_page = this.total_page;
    this.render_data();

  }

  goToFirst() {
    this.current_page = 1;
    this.render_data();
  }

  ngOnInit(): void {
  }


  openEditpeople(id: any) {
    if (this.travelerList.length > 0) {
      for (let i = 0; i < this.travelerList.length; i++) {
        if (this.travelerList[i].id == id) {
          this.editable_id = id;
          this.editable_name = this.travelerList[i].name;
        }
      }
    }
  }

  openDeletepeople(id: any) {
    if (this.travelerList.length > 0) {
      for (let i = 0; i < this.travelerList.length; i++) {
        if (this.travelerList[i].id == id) {
          this.editable_id = id;
          this.editable_name = this.travelerList[i].name;
        }
      }
    }
  }


  delete() {
    this.openDeletepeople(this.id);
    this.travellerServices.removePeople(this.editable_id).subscribe((obj: any) => {
      this.toastr.success(obj.success);
      this.render_data();
    })
  }

  get formz() {
    return this.updatePeople.controls;
  }

  updateName() {
    this.isSubmitted = true;
    if (this.updatePeople.invalid) {
      return
    }
    this.travellerServices.updatePeople(this.editable_id, this.editable_name).subscribe((obj: any) => {
      this.toastr.success(obj.message);
      this.render_data();
    })
  }

  get form() {
    this.isSubmitted1 = true;
    return this.addPeople.controls;
  }

  fileToUpload: File | null = null;

  get csv() {
    return this.addCSV.controls;
  }

  files: any;

  postCsv(evt: any) {
    this.isSubmitted = true;
    if (this.csvTraveller.length == 0) {
      this.toastr.error('Please upload csv');
      return;
    }
    if (this.addCSV.invalid) {
      return
    } else {
      this.travellerServices.uploadCSV(this.package_id, this.csvTraveller).subscribe((obj: any) => {
        this.addCSV.reset();
        $("#file").val('');
        if (obj.status == true) {
          this.toastr.success(obj.message);
        } else {
          this.toastr.error(obj.message);
        }
        this.render_data();
        this.csvTraveller = [];
      })
    }
  }

  get updatename() {
    return this.updatePeople.controls;
  }

  getname(event: any) {
    $('input[type="file"]').change(function (e: any) {
      var fileName = e.target.files[0].name;
      $("#filename").html(fileName);
    });
    var obj_csv = { size: 0, dataFile: [] };
    if (event.files && event.files[0]) {
      let reader = new FileReader();
      reader.readAsBinaryString(event.files[0]);
      let that = this;
      reader.onload = function (e: any) {
        obj_csv.size = e.total;
        obj_csv.dataFile = e.target.result
        that.parseData(obj_csv.dataFile)

      }
    }
  }

  csvData: any = [];
  csvTraveller: any = [];

  parseData(data: any) {
    this.csvData = [];
    this.csvTraveller = [];
    let lbreak = data.split("\n");
    lbreak.forEach((res: string) => {
      this.csvData.push(res.split(","));
    });
    let i = 0;
    for (let nm of this.csvData) {
      if (i > 0) {
        //let k = 0;
        for (let name of nm) {
          if (name) {
            console.log(name)
            this.csvTraveller.push(name.replace('\r', ''))
          }
          // k++;
        }
      }
      i++;
    }
    console.log(this.csvTraveller);
  }

  addpeople() {
    this.isSubmitted1 = true;
    if (this.addPeople.invalid) {
      return
    } else {
      this.travellerServices.createPeople(this.package_id, this.addPeople.value).subscribe((obj: any) => {
        this.addPeople.reset();
        this.isSubmitted1 = false;
        this.render_data();
      })
    }
  }
}