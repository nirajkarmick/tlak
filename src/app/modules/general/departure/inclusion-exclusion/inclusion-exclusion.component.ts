import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'
import { Data, ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { InclusionService } from "../../../../services/inclusion.service";
import { TranslateConfigService } from "../../../../services/translate-config.service";

declare let $: any;

@Component({
  selector: 'app-inclusion-exclusion',
  templateUrl: './inclusion-exclusion.component.html',
  styleUrls: ['./inclusion-exclusion.component.css']
})
export class InclusionExclusionComponent implements OnInit {
  credentials = { incl_name: "" };
  files: any;
  package_id: any;
  addInclusion: FormGroup;
  isSubmitted = false;
  EditInclusion: FormGroup;
  addExclusion: FormGroup
  isSubmittedInclusion = false;
  isSubmittedExclusion = false;
  incusionForm = new FormData();
  imageName: any;
  masterSelected: any;
  Checkedinclusions: any = [];
  public inclusions: any = [];
  public exclusions: any = [];
  imgURL: any;
  inclusion_selected: any = [];
  inclusionsId: any;
  inc_name: any;
  exclusionId: any;
  exclusion: any;
  inclusions_data: any = [];
  inclID: any;
  incName: any;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private inclusionService: InclusionService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.addInclusion = this.formBuilder.group({
      incl_name: ["", Validators.required],
      incl_img: ["", Validators.required],
      incl_img_name: ["", Validators.required],
    })
    this.EditInclusion = this.formBuilder.group({
      inc_name_edit: ["", Validators.required],
      incl_img: ["", Validators.required],
      incl_img_name: ["", Validators.required],
    })
    this.addExclusion = this.formBuilder.group({
      exclusion: ["", Validators.required],
    })
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.toastr.error('Package not found!');
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }
  }

  render_data() {
    this.inclusions = [];
    this.inclusionService.CreateInclusion(this.package_id).subscribe((res: any) => {
      // console.log(res, 'data');
      this.inclusions = res.unique_inclusions;
      this.inclusions_data = res.inclusionpkg != undefined ? res.inclusionpkg : [];
      this.exclusions = res.exclusions;
      if (this.exclusions && this.exclusions.exclusion != undefined) {
        this.addExclusion.patchValue({ 'exclusion': this.exclusions.exclusion });
      }

      if (this.inclusions_data && this.inclusions_data.length > 0) {
        let j = 0;
        for (let inc of this.inclusions) {
          this.inclusions[j].checked = false;
          for (let pckg_inc of this.inclusions_data) {
            if (pckg_inc.name == inc.name) {
              this.inclusions[j].checked = true;
              this.inclusion_selected.push(inc.name);

            }
          }
          j++;
        }

      }
      this.imgURL = res.img_url;
    })
    this.inclusions.push(this.inclusions_data);
  }

  ngOnInit(): void {

  }

  get form() {
    return this.addInclusion.controls;
  }

  get form2() {
    return this.addExclusion.controls;
  }

  addExclusionForm() {
    this.isSubmittedExclusion = true;
    if (this.addExclusion.invalid) {
      return
    } else {
      this.inclusionService.addExclusion(this.package_id, this.addExclusion.value).subscribe((obj: any) => {
        console.log(obj)
        this.toastr.success(obj.message);
        this.render_data();
        this.addExclusion.reset();
      })
    }
  }

  addIncl() {
    this.isSubmitted = true;
    console.log(this.addInclusion.value);
    if (this.addInclusion.invalid) {
      return
    } else {
      this.incusionForm.set("name", this.addInclusion.value.incl_name);
      this.incusionForm.set("id", this.addInclusion.value.incl_img);
      this.incusionForm.set("image_name", this.addInclusion.value.incl_img_name);
      this.inclusionService.addInclusion(this.package_id, this.incusionForm).subscribe((obj: any) => {
        this.render_data();
        this.incusionForm = new FormData();
      })
    }
  }

  UpdateIncl() {
    this.isSubmittedInclusion = true;
    if (this.EditInclusion.invalid) {
      return
    } else {
      console.log(this.EditInclusion.value);
      this.inclusionService.UpdateInclusion(this.inclusionsId, this.EditInclusion.value).subscribe((obj: any) => {
        console.log(obj);
        if (obj.statuscode == 200) {
          this.toastr.success(obj.message)
        }
        this.render_data();
        document.getElementById('editinclusionClose')?.click();
        //this.incusionForm = new FormData();
      }, (error) => {
        this.toastr.error("Something Went Wrong")
      })
    }

  }

  saveIncl() {
    console.log(this.inclusion_selected)
    if (this.inclusion_selected.length == 0) {
      this.toastr.error('please check any Inclusion')
    } else {
      console.log(this.inclusion_selected)
      this.inclusionService.saveInclusion(this.package_id, this.inclusion_selected).subscribe((obj: any) => {
        console.log(obj)
        if (obj.statuscode == 200) {
          this.toastr.success(obj.message)
        }
        this.render_data();
      }, (error) => {
        this.toastr.error('something went wrong');
      })
    }
  }

  selected_incl_img: any;
  incl_imgType = [
    { 'id': 1, 'name': 'Flight', 'image': 'airticket.png' },
    { 'id': 2, 'name': 'Lunch', 'image': 'lunch.png' },
    { 'id': 3, 'name': 'Breakfast', 'image': 'breakfast.png' },
    { 'id': 4, 'name': 'Hotel', 'image': 'hotel.png' },
    { 'id': 5, 'name': 'Dinner', 'image': 'dinner.png' },
    { 'id': 6, 'name': 'Visa', 'image': 'visa.png' },
    { 'id': 7, 'name': 'Cycle', 'image': 'cycle.png' },
    { 'id': 8, 'name': 'Paragliding', 'image': 'paragliding.png' },
    { 'id': 9, 'name': 'Site seeing', 'image': 'seeing.png' },
    { 'id': 10, 'name': 'Insurance', 'image': 'insurance.png' },
    { 'id': 11, 'name': 'Bus', 'image': 'bus.png' },
    { 'id': 12, 'name': 'Car', 'image': 'sedan.png' },
    { 'id': 13, 'name': 'City Tour', 'image': 'citytour.png' },
    { 'id': 14, 'name': 'Gala Dinner', 'image': 'galadinner.png' },
    { 'id': 15, 'name': 'Toll Tax', 'image': 'tolltax.png' },
    { 'id': 16, 'name': 'Train', 'image': 'train.png' },
    { 'id': 17, 'name': 'Cable Car', 'image': 'cablecar.png' },
    { 'id': 18, 'name': 'Boat Tour', 'image': 'boat-tour.png' },
    { 'id': 19, 'name': 'Shikara Ride', 'image': 'shikara-ride.png' },
    { 'id': 20, 'name': 'Tour Guide', 'image': 'tour-guide.png' },
    { 'id': 21, 'name': 'Desert Safari', 'image': 'desert-safari.png' },
  ];

  select_incl_img() {
    if (this.select_incl_img != null) {
      for (let inc of this.incl_imgType) {
        if (inc.id == this.selected_incl_img) {
          this.addInclusion.patchValue({
            incl_img: inc.id,
            incl_img_name: inc.image,
          });
        }
      }
      console.log(this.addInclusion.value);
    }
  }

  select_incl_imgEdit() {
    if (this.select_incl_img != null) {
      for (let inc of this.incl_imgType) {
        if (inc.id == this.selected_incl_img) {
          this.EditInclusion.patchValue({
            incl_img: inc.id,
            incl_img_name: inc.image,
          });
        }
      }
    }
  }

  filename(files: any) {
    console.log(files.target.files)

    const file = files.target.files[0];
    this.imageName = file.name;
    // this.incusionForm = new FormData();
    this.incusionForm.set("image", file);
  }

  filename1(files: any) {
    console.log(files.target.files)
    const file = files.target.files[0];
    this.imageName = file.name;
    // this.incusionForm = new FormData();
    this.incusionForm.set("image", file);
  }

  checkUncheckAll() {
    this.inclusion_selected = [];
    for (var i = 0; i < this.inclusions.length; i++) {
      this.inclusions[i].checked = this.masterSelected;
      this.inclusion_selected = [];
      for (let item of this.inclusions) {
        if (item.checked == true) {
          this.inclusion_selected.push({ "name": item.name, "id": item.id, image_name: item.images_url });
        }
      }
    }
  }

  setInclusion() {
    this.inclusion_selected = [];
    for (let item of this.inclusions) {
      if (item.checked == true) {
        this.inclusion_selected.push({ "name": item.name, "id": item.id, image_name: item.images_url });
      }
    }
  }


  // Get List of Checked Items
  // getCheckedItemList() {
  //   this.Checkedinclusions = [];
  //   for (var i = 0; i < this.inclusions.length; i++) {
  //     if (this.inclusions[i].isSelected)
  //       this.Checkedinclusions.push(this.inclusions[i]);
  //   }
  //   this.Checkedinclusions = JSON.stringify(this.Checkedinclusions);

  // }

  uploadIncusion() {
  }

  get form1() {
    this.isSubmittedInclusion = true;
    return this.EditInclusion.controls;
  };

  editinclusion(id: any, name: any, images_url: any) {
    console.log(images_url);
    console.log(name);
    this.EditInclusion.reset();
    for (let inc of this.incl_imgType) {
      console.log(inc);
      if (images_url == inc.image) {
        this.EditInclusion.patchValue({
          inc_img: name,
          incl_img_name: inc.image
        });
        this.selected_incl_img = inc.id;
      }
      console.log(this.selected_incl_img)
    }

    if (this.inclusions.length > 0) {
      this.inclusionsId = id;
      this.EditInclusion.patchValue({
        inc_name_edit: name,
      });
      console.log(this.EditInclusion)
    }

  }

  submitinclusion(index: any) {
  }

  deleteinclusion(id: any, name: any) {
    this.inclID = id;
    this.incName = name;
  }

  deleteinclusionBtn() {
    this.inclusionService.deleteInclusion(this.inclID).subscribe((res: any) => {
      // console.log(res);
      this.toastr.success(res.message);
      this.render_data();
    });
  }

  addinclusion() {
    const addnewincl = document.getElementsByClassName('addnewincl')[0];
    const addnewincl_show = document.getElementsByClassName('addnewincl_show')[0];
    addnewincl.classList.add('d-block');
    addnewincl_show.classList.add('d-none');
  }


  editExclusion(id: any, exclusion: any) {
    this.exclusionId = id;
    this.exclusion = exclusion;
    this.addExclusion.patchValue({
      exclusion: this.exclusion,
    });
  }

  deletePopExclusion(id: any, exclusion: any) {
    this.exclusionId = id;
    this.exclusion = exclusion;
  }

  deleteExclusion() {
    this.exclusionId;
    console.log(this.exclusionId)
    this.inclusionService.deleteExclusion(this.exclusionId).subscribe((res: any) => {
      this.toastr.success(res.message);
      this.render_data();
    }, (error) => {
      //this.toastr.error(res.message);
      this.toastr.error("some thing went wrong");
    })
  }

}
