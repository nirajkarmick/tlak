import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { CommunicationService } from "../../../../services/communication.service";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../../services/translate-config.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

declare var $: any;

@Component({
  selector: 'app-operations-team',
  templateUrl: './operations-team.component.html',
  styleUrls: ['./operations-team.component.css']
})

export class OperationsTeamComponent implements OnInit {
  AddManager: FormGroup;
  EditManager: FormGroup;
  EditGuide: FormGroup;
  AddGuide: FormGroup;
  AddContact: FormGroup;
  EditContact: FormGroup;
  AddPlacard: FormGroup;
  EditPlacard: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  isSubmitted2 = false;
  isSubmitted3 = false;
  isSubmittedEditManager = false;
  isSubmittedEditGuide = false;
  isSubmittedEditContact = false;
  isSubmittedEditPlaycard = false;
  package_id: any;
  userName = localStorage.getItem('user');
  // emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private CommunicationService: CommunicationService,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.AddManager = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
    this.EditManager = this.formBuilder.group({
      name: ["", Validators.required],
      phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
    this.EditGuide = this.formBuilder.group({
      guide_name: ["", Validators.required],
      guide_phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.required]
    })
    this.AddGuide = this.formBuilder.group({
      guide_name: ["", Validators.required],
      guide_phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      location: ["", Validators.required]
    })
    this.AddContact = this.formBuilder.group({
      contact_name: ["", Validators.required],
      contact_phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contact_email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
    this.EditContact = this.formBuilder.group({
      contact_name: ["", Validators.required],
      contact_phone: ["", [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      contact_email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
    })
    this.AddPlacard = this.formBuilder.group({
      placard: ["", Validators.required],
      placard_detail: ["", Validators.required]
    })
    this.EditPlacard = this.formBuilder.group({
      placard: ["", Validators.required],
      placard_detail: ["", Validators.required]
    })
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  public DepManagerlist: any = [];
  public DepDepGuidelist: any = [];
  public locations: any = [];
  public DepContact: any = [];
  public DepPlacard: any = [];

  render_data() {
    this.DepManagerlist = [];
    this.locations = [];
    this.DepDepGuidelist = [];
    this.DepContact = [];
    this.DepPlacard = [];

    this.CommunicationService.CommList(this.package_id).subscribe((res: any) => {
      console.log(res);
      const location = res.locations;
      if (res.DepManager.length > 0) {
        for (let i = 0; i < res.DepManager.length; i++) {
          this.DepManagerlist.push(res.DepManager[i]);
        }
      }
      if (location.length > 0) {
        for (let l = 0; l < location.length; l++) {
          this.locations.push(location[l]);
        }
      }
      if (res.DepGuide.length > 0) {
        for (let j = 0; j < res.DepGuide.length; j++) {
          this.DepDepGuidelist.push(res.DepGuide[j]);
        }
      }
      if (res.EmergencyNumber.length > 0) {
        for (let k = 0; k < res.EmergencyNumber.length; k++) {
          this.DepContact.push(res.EmergencyNumber[k]);
        }
      }
      if (res.placard.length > 0) {
        for (let m = 0; m < res.placard.length; m++) {
          this.DepPlacard.push(res.placard[m]);
        }
      }
    })
  };

  ngOnInit(): void {
  };

  get form() {
    this.isSubmitted = true;
    return this.AddManager.controls;
  };


  get form_g() {
    this.isSubmitted1 = true;
    return this.AddGuide.controls;
  };

  get form_tc() {
    this.isSubmitted2 = true;
    return this.AddContact.controls;
  };

  get form_pl() {
    this.isSubmitted3 = true;
    return this.AddPlacard.controls;
  };

  addManager() {
    this.isSubmitted = true;
    if (this.AddManager.invalid) {
      return
    } else {
      this.CommunicationService.addManager(this.package_id, this.AddManager.value).subscribe((obj: any) => {
        console.log(obj);
        this.AddManager.reset();
        this.isSubmitted = false;
        this.render_data();
      })
    }
  };



  addTourGuide() {
    this.isSubmitted1 = true;
    if (this.AddGuide.invalid) {
      return
    } else {
      this.CommunicationService.addTourGuide(this.package_id, this.AddGuide.value).subscribe((obj: any) => {
        console.log(obj);
        this.AddGuide.reset();
        this.isSubmitted1 = false;
        this.render_data();
      })
    }
  };

  addTourContact() {
    this.isSubmitted2 = true;
    if (this.AddContact.invalid) {
      return
    } else {
      this.CommunicationService.addContact(this.package_id, this.AddContact.value).subscribe((obj: any) => {
        console.log(obj);
        this.AddContact.reset();
        this.isSubmitted2 = false;
        this.render_data();
      })
    }
  };

  Placard() {
    this.isSubmitted3 = true;
    if (this.AddPlacard.invalid) {
      return
    } else {
      this.CommunicationService.addPlacard(this.package_id, this.AddPlacard.value).subscribe((obj: any) => {
        console.log(obj);
        this.AddPlacard.reset();
        this.isSubmitted3 = false;
        this.render_data();
      })
    }
  };

  get form1() {
    this.isSubmittedEditManager = true;
    return this.EditManager.controls;
  };

  openManagerEdit(id: any) {
    if (this.DepManagerlist.length > 0) {
      for (let a = 0; this.DepManagerlist.length > a; a++) {
        if (this.DepManagerlist[a].id == id) {
          this.DepManagerlistId = id;
          this.EditManager.patchValue({
            name: this.DepManagerlist[a].name,
            phone: this.DepManagerlist[a].phone,
            email: this.DepManagerlist[a].email
          });
        }
      }
    }
  };

  edit_Manager() {
    this.isSubmittedEditManager = true;
    if (this.EditManager.invalid) {
      return
    }
    else {
      this.CommunicationService.addManagerUpdate(this.DepManagerlistId, this.EditManager.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.EditManager.reset();
        this.isSubmittedEditManager = false;
        this.render_data();
      })
    }
  };

  DepManagerlistName = ""
  DepManagerlistId = "";
  openDeleteTourManager(id: any) {
    if (this.DepManagerlist.length > 0) {
      for (let b = 0; b < this.DepManagerlist.length; b++) {
        if (this.DepManagerlist[b].id == id) {
          this.DepManagerlistId = id;
          this.DepManagerlistName = this.DepManagerlist[b].name;
        }
      }
    }
  }

  deleteTourManager() {
    this.CommunicationService.deleteTourManager(this.DepManagerlistId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    }, (error) => {
      this.toastr.error("Database connection failed");
    })
  }

  // Edit and delete tour guide form
  get form2() {
    this.isSubmittedEditGuide = true;
    return this.EditGuide.controls;
  };


  editTourGuideForm(id: any) {
    if (this.DepDepGuidelist.length > 0) {
      for (let q = 0; this.DepDepGuidelist.length > q; q++) {
        if (this.DepDepGuidelist[q].id == id) {
          this.DepGuidelistId = id;
          this.EditGuide.patchValue({
            guide_name: this.DepDepGuidelist[q].name,
            guide_phone: this.DepDepGuidelist[q].phone,
            location: this.DepDepGuidelist[q].location
          });
        }
      }
    }
  };

  editTourGuide() {
    this.isSubmittedEditGuide = true;
    if (this.EditGuide.invalid) {
      return
    }
    else {
      this.CommunicationService.addTourGuideUpdate(this.DepGuidelistId, this.EditGuide.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.EditGuide.reset();
        this.isSubmittedEditGuide = false;
        this.render_data();
      }, (error) => {
        this.toastr.error("Database connection failed");
      })
    }
  }

  DepGuidelistName = ""
  DepGuidelistId = "";
  openDeleteTourGuide(id: any) {
    if (this.DepDepGuidelist.length > 0) {
      for (let b = 0; b < this.DepDepGuidelist.length; b++) {
        if (this.DepDepGuidelist[b].id == id) {
          this.DepGuidelistId = id;
          this.DepGuidelistName = this.DepDepGuidelist[b].name;
        }
      }
    }
  }

  deleteTourGuide() {
    console.log(this.DepGuidelistId)
    this.CommunicationService.deleteTourGuide(this.DepGuidelistId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    }, (error) => {
      this.toastr.error("Database connection failed");
    })
  }


  //  Edit and Delete enmergeny contact
  get formEditContact() {
    this.isSubmittedEditContact = true;
    return this.EditContact.controls;
  };

  editContactForm(id: any) {
    if (this.DepContact.length > 0) {
      for (let a = 0; this.DepContact.length > a; a++) {
        if (this.DepContact[a].id == id) {
          this.editEnmergencyId = id;
          this.EditContact.patchValue({
            contact_name: this.DepContact[a].name,
            contact_phone: this.DepContact[a].phone,
            contact_email: this.DepContact[a].email
          });
        }
      }
    }
  }



  editEnmergencyId = ""
  editEnmergencyName = ""
  deleteEnmergencyContact(id: any) {
    if (this.DepContact.length > 0) {
      for (let b = 0; b < this.DepContact.length; b++) {
        if (this.DepContact[b].id == id) {
          this.editEnmergencyId = id;
          this.editEnmergencyName = this.DepContact[b].name;
        }
      }
    }
  }

  editEnmergencyContact() {
    this.isSubmittedEditContact = true;
    if (this.EditContact.invalid) {
      return
    }
    else {
      this.CommunicationService.addEnmergencyUpdate(this.editEnmergencyId, this.EditContact.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.EditContact.reset();
        this.isSubmittedEditContact = false;
        this.render_data();
      }, (error) => {
        this.toastr.error("Database connection failed");
      })
    }
  }

  deleteEnmergencyContactPop() {
    console.log(this.editEnmergencyId)
    this.CommunicationService.deleteEnmergencyContact(this.editEnmergencyId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    }, (error) => {
      this.toastr.error("some thing went wrong");
    })
  }
  // edit and delete playcard

  get formPlaycard() {
    this.isSubmittedEditPlaycard = true;
    return this.EditPlacard.controls;
  };

  editPlacardId = ''
  editPlaycardForm(id: any) {
    if (this.DepPlacard.length > 0) {
      for (let s = 0; this.DepPlacard.length > s; s++) {
        if (this.DepPlacard[s].id == id) {
          this.editPlacardId = id;
          this.EditPlacard.patchValue({
            placard: this.DepPlacard[s].placard,
            placard_detail: this.DepPlacard[s].placard_detail,
          });
        }
      }
    }
  }

  editPlaycard() {
    this.isSubmittedEditPlaycard = true;
    if (this.EditPlacard.invalid) {
      return
    } else {
      console.log(this.editPlacardId, this.EditPlacard.value)
      this.CommunicationService.addPlaCardUpdate(this.editPlacardId, this.EditPlacard.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.message);
        this.EditPlacard.reset();
        this.isSubmittedEditPlaycard = false;
        this.render_data();
      }, (error) => {
        this.toastr.error("Database connection failed");
      })
    }
  }



  editplacard = ''
  deletePlayCardPop(id: any) {
    if (this.DepPlacard.length > 0) {
      for (let b = 0; b < this.DepPlacard.length; b++) {
        if (this.DepPlacard[b].id == id) {
          this.editPlacardId = id;
          this.editplacard = this.DepPlacard[b].placard;
        }
      }
    }
  }

  deletePlycard() {
    console.log(this.editPlacardId)
    this.CommunicationService.deleteplycard(this.editPlacardId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    }, (error) => {
      this.toastr.error("Database connection failed");
    })
  }


}


