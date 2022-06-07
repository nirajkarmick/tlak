import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { CompanySettingsService } from "../../../services/company-settings.service";
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';


declare let $: any;

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  errImage = '';
  imgName = '';
  photo_name: any;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  popUpMsg: any;
  banner: any;
  showCropper: any;
  isSubmitted = false;
  addAgent: FormGroup;
  incusionForm = new FormData();
  incusionForm1 = new FormData();
  agentEdit: FormGroup;
  tenentEdit: FormGroup;
  companySettings: any;
  tenentID = localStorage.getItem('tenant_id');
  agent: any;
  agentName: any;
  AgentId: any;
  imageName: any;
  filePath:any;
  company_logo:any;
  agent_url:any;
  compName: any;
  compid: any;
  cp_Name: any;
  cEmail: any;
  cPhone: any;
  webSite: any;
  address_street: any;
  address_city: any;
  address_country: any;
  facebook: any;
  twitter: any;
  instagram: any;
  address_zip: any;

  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private CompanySettingsService: CompanySettingsService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.addAgent = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      company: ["", Validators.required],
      street_address: [""],
      city: [""],
      state: [""],
      country: [""],
      zipcode: [""],
      company_logo: [""],
      company_website: [""],
      tenant_id: this.tenentID,
    });

    this.agentEdit = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
      company: ["", Validators.required],
      street_address: [""],
      city: [""],
      state: [""],
      country: [""],
      zipcode: [""],
      company_logo: [""],
      company_website: [""],
      tenant_id: this.tenentID,
    });

    this.tenentEdit = this.formBuilder.group({
      company_name: [""],
      phone: [""],
      name: [""],
      email: [""],
      tenant_id: [""],
      company_website: [""],
      facebook: [""],
      instagram: [""],
      twitter: [""]
    });
    this.render_data();
  }

  ngOnInit(): void {
  }

  render_data() {
    this.CompanySettingsService.CompnaySettings().subscribe((res: any) => {
      console.log(res, "setting")
      this.companySettings = res.data.tenant;
      this.compName = this.companySettings.company_name;
      this.compid = this.companySettings.company_id;
      this.cp_Name = this.companySettings.name;
      this.cEmail = this.companySettings.email;
      this.cPhone = this.companySettings.phone;
      this.webSite = this.companySettings.company_website;
      this.address_street = this.companySettings.address_street;
      this.address_city = this.companySettings.address_city;
      this.address_country = this.companySettings.address_country;
      this.address_zip = this.companySettings.address_zip;
      this.facebook = this.companySettings.facebook;
      this.twitter = this.companySettings.twitter;
      this.instagram = this.companySettings.instagram;
      console.log(this.companySettings, 'compnamebdsbdfbfbfbfbfb');
      this.tenentEdit.patchValue({
        name: this.companySettings.name,
        phone: this.companySettings.phone,
        company_name: this.companySettings.company_name,
        email: this.companySettings.email,
        tenant_id: this.companySettings.tenant_id,
        facebook: this.companySettings.facebook,
        instagram: this.companySettings.instagram,
        twitter: this.companySettings.twitter,
      });
      this.croppedImage = this.companySettings.logo_url + this.companySettings.company_logo
    });
    this.CompanySettingsService.agentList(this.tenentID).subscribe((obj: any) => {
      console.log(obj, 'agent list')
      this.agent = obj.data;
      this.agent_url = obj.url;
    });
  }

  all_images: any;
  filename(files: any) {
    let that = this;
    const file = files.target.files[0];
    this.incusionForm.set('image', file);
    this.imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
    this.filePath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.all_images = e.target.result;
      that.agentEdit.patchValue({
        company_logo: that.all_images,
      });
    });
    console.log(this.all_images);
    reader.readAsDataURL(file);
  }

  all_images1: any;
  filename1(files: any) {
    let that = this;
    const file = files.target.files[0];
    this.incusionForm1.set('image', file);
    this.imageName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
    this.filePath = reader.result as string;
    };
    reader.addEventListener('load', function (e: any) {
      that.all_images = e.target.result;
      //this.company_logo: that.all_images
      that.addAgent.patchValue({
        company_logo: that.all_images,
      });
    });
    reader.readAsDataURL(file);
  }

  fileSize: any;
  filesizeLimit: any;

  onFileChange(files: any) {
    const file = (files.target).files[0];
    this.imageChangedEvent = file.name;
    this.fileSize = file.size;
    this.filesizeLimit = 1024 * 1024;
    var extName = this.imageChangedEvent.toString().split('.').pop();
    var _validFileExtensions = ["jpg", "jpeg", "png"];
    var ext_found = _validFileExtensions.indexOf(extName);

    if (ext_found < 0) {
      this.imageChangedEvent = '';
      this.toastr.error('jpg, jpeg, png format supported');
      return;
    }
    if (this.fileSize > this.filesizeLimit) {
      this.toastr.error('File too large' + this.fileSize + '. Maximum size' + this.filesizeLimit);
      return;
    } else {
      this.open_crop_modal();
      this.imageChangedEvent = files;
    }
  }

  open_crop_modal() {
    $('#crop_model .overlay').css('background', 'none');
    $('#crop_model').css('display', 'block');
    $('#crop_model').addClass('show');
    $('#crop_model').css('z-index', '99999');
  }

  close_crop() {
    $('#crop_model').removeClass('show');
    $('#crop_model').css('display', 'none');
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  scale = 1;
  transform: ImageTransform = {};
  containWithinAspectRatio = false;

  toggleContainWithinAspectRatio() {
    this.containWithinAspectRatio = !this.containWithinAspectRatio;
  }
zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    };
  }

  cropperReady(sourceImageDimensions: Dimensions) {
    console.log('Cropper ready', sourceImageDimensions);
  }

  imageLoaded() {
    this.showCropper = true;
    console.log('Image loaded');
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  done_cropping() {
    this.photo_name = this.imgName;
    this.close_crop();
    this.CompanySettingsService.logoUpdate(this.tenentID, this.croppedImage).subscribe((res: any) => {
      console.log(res)
      //this.companySettings = res.data.tenant;
      //this.croppedImage = this.companySettings.company_logo;
      this.render_data();
    },(error) => {
      this.toastr.error("Something went wrong");
    });
  }

  get form() {
    return this.addAgent.controls;
  }

  agentAdd() {
    this.isSubmitted = true;
    if (this.addAgent.invalid) {
      return
    } else {
     // console.log(this.addAgent.value)
      this.CompanySettingsService.addAgent(this.addAgent.value).subscribe((res: any) => {
        console.log(res);
        this.toastr.success(res.status);
        this.addAgent.reset();
        this.isSubmitted = false;
        $('#AgentLogo').attr('src', '');
        this.render_data();
        document.getElementById('closeAgentmodal')?.click();
      }, (error) => {
        this.toastr.error("something went wrong");
      })
    }
  }

  get form1() {
    return this.agentEdit.controls;
  }


  openAgent(id: any) {
    for (let a = 0; this.agent.length > 0; a++) {
      if (this.agent[a].id == id) {
        this.AgentId = id;
        this.company_logo = this.agent[a].company_logo;
        this.agentEdit.patchValue({
          name: this.agent[a].name,
          email: this.agent[a].email,
          phone: this.agent[a].phone,
          company: this.agent[a].company,
          street_address: this.agent[a].street_address,
          city: this.agent[a].city,
          state: this.agent[a].state,
          country: this.agent[a].country,
          zipcode: this.agent[a].zipcode,
         // company_logo: this.agent[a].company_logo,
          company_website: this.agent[a].company_website,

        });
        console.log(this.company_logo, 'sfsf')
        this.filePath = this.agent_url + this.company_logo;
        console.log(this.filePath)
      }
    }
  }

  editAgent() {
    this.isSubmitted = true;
    console.log(this.agentEdit.value)
    if (this.agentEdit.invalid) {
      return
    } else {
      this.CompanySettingsService.editAgent(this.AgentId, this.agentEdit.value).subscribe((res: any) => {
        this.toastr.success(res.status);
        this.agentEdit.reset();
        this.isSubmitted = false;
        this.render_data();
        document.getElementById('closeAgentmodaledit')?.click();
      }, (error) => {
        this.toastr.error("Something went wrong")
      })
    }
  }

  deleteAgentPop(id: any, name: any) {
    this.agentName = name;
    this.AgentId = id
  }

  deleteAgent() {
    this.CompanySettingsService.deleteAgent(this.AgentId).subscribe((res: any) => {
      this.toastr.success(res.status);
      this.render_data();
    }, (error) => {
      this.toastr.error("Something went wrong");
    });
  }

  get form2() {
    return this.tenentEdit.controls;
  }

  editTnent() {
    this.isSubmitted = true;
    if (this.tenentEdit.invalid) {
      return
    } else {
      this.CompanySettingsService.compEditForm(this.tenentID,this.tenentEdit.value).subscribe((res: any) => {
        console.log(res);
        this.render_data();
        this.toastr.success(res.message);
        document.getElementById('closeModel')?.click();
      }, (error) => {
        this.toastr.error("Something went wrong");
      })
    }
  }
}
