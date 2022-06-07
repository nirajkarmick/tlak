import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { AdminControlService } from "../../../services/admin-control.service";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  isLoading = true;
  isSubmitted = false;
  permissionData: any;
  rolesForm: FormGroup;
  permissionMenu: any = [];
  pId: any;
  permission: any;
  roleCreate = false;
  roleEdit = false;
  roleView = false;
  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminControlService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {
    this.rolesForm = this.formBuilder.group({
      name: ["", Validators.required]
    })
    this.renderData();
    this.loadPermissionMenu();
    if (this.roleView == false) {
      this.toastr.error("You are not authorized");
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  renderData() {
    this.adminService.roles().subscribe((res: any) => {
      this.permissionData = res.data.roles;
      console.log(this.permissionData, 'permission')
    })
  }

  get form() {
    return this.rolesForm.controls;
  };

  roleSubmit() {
    this.isSubmitted = true;
    console.log(this.rolesForm)
    if (this.rolesForm.invalid) {
      return
    } else {
      this.adminService.createRole(this.rolesForm.value).subscribe((res: any) => {
        console.log(res)
        this.rolesForm.reset();
        this.isSubmitted = false;
        this.renderData();
        if (res.status) {
          this.toastr.success(res.success);
        } if (res.errors) {
          this.toastr.error(res.errors);
        } if (res.exception) {
          this.toastr.warning(res.exception);
        }
        document.getElementById('ClosecreateModal')?.click();
      }, (error) => {
        this.toastr.error("Something went wrong")
      })
    }
  }
  
  permissionId(id: any) {
    this.pId = id

  }

  onCheckboxChange(id: any,check:any) { 
    if(check==true){      
    this.permissionMenu.push(id);
    }else{
      if(this.permissionMenu.indexOf(id)>-1){
        this.toastr.error('available');
      }
    }
    console.log(this.permissionMenu)
    console.log(this.permissionData)
  }

  updateRole(data:any) {
   // console.log(data);return;
   // var role_id = $('#roleID').val()
    this.isSubmitted = true;
    console.log(this.pId, this.permissionMenu, 'data');
    //return;
    var perData={'permissions':data};
    this.adminService.rolesUpdate(this.pId, perData).subscribe((res: any) => {
      console.log(res);
      this.toastr.success(res.message);
      this.renderData();
      this.isSubmitted = false;
    })
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'role-create') {
          this.roleCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'role-edit') {
          this.roleEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'role-view') {
          this.roleView = true;
        }
      });
    }
  }

}
