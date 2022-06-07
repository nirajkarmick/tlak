import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { AdminControlService } from "../../../services/admin-control.service";
import { TranslateConfigService } from "../../../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isLoading= true;
  roleSelect:any;
  allUsers:any;
  userAdd: FormGroup;
  editUser: FormGroup;
  isSubmitted = false;
  isSubmitted1 = false;
  userListId:any;
  editUserDetails:any;
  editUserRoles:any;
  resend_name="";
  userCreate = false;
  userEdit = false;
  userView = false;
  userActivateInactivate = false;
  constructor(
    private ReactiveFormsModule: ReactiveFormsModule,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminControlService,
    private http: HttpClient,
    private toastr: ToastrService,
    private translate: TranslateConfigService
    ) 
    { 
      this.userAdd = this.formBuilder.group({
        name: ["", Validators.required],
        email: ["", Validators.required],
        mobile_number: ["", Validators.required],
        role: ["", Validators.required],
        tenant_id: localStorage.getItem('tenant_id'),
        company_id: localStorage.getItem('company_id'),
        company_name: localStorage.getItem('company_name'),
        tenant_code: localStorage.getItem('tenant_code'),
      });

      this.editUser = this.formBuilder.group({
        name: ["", Validators.required],
        email: ["", Validators.required],
        mobile_number: ["", Validators.required],
        role: [""],
        tenant_id: localStorage.getItem('tenant_id'),
        company_id: localStorage.getItem('company_id'),
        company_name: localStorage.getItem('company_name'),
        tenant_code: localStorage.getItem('tenant_code'),
      });
      this.renderData();
      this.loadPermissionMenu();
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
  }

  renderData() {
    this.adminService.users().subscribe((res:any) => {
      console.log(res, )
      this.allUsers = res.data.all_users;
      console.log(this.allUsers, 'datazzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
    })

    this.adminService.userCreate().subscribe((res:any) => {
      this.roleSelect = res.data.roles;
    })
  }

  get form() {
    return this.userAdd.controls;
  }

  addUser() {
    this.isSubmitted = true;
    if (this.userAdd.invalid) {
      return
    } else {
      console.log(this.userAdd.value)
      this.adminService.addRole(this.userAdd.value).subscribe((res: any) => {
         console.log(res);
         this.toastr.success(res.status);
         this.userAdd.reset();
         this.isSubmitted = false;
         this.renderData();
      } )
    }
  }

  userEditModel(id:any) {
    this.userListId = id;
    this.adminService.userUpdate(this.userListId).subscribe((res:any) => {
      console.log(res, 'datazzzzz')
       this.editUserDetails = res.data.user_details;
       this.editUserRoles = res.data.roles;
       console.log(this.editUserRoles, 'data')
       this.editUser.patchValue({
        name: this.editUserDetails.name,
        email: this.editUserDetails.email,
        mobile_number: this.editUserDetails.phone,
        role: this.editUserDetails.role_id,
      });
    }, (error) => {
      this.toastr.error("Something went wrong");
    })
  }

  get form1() {
    return this.editUser.controls;
  }

  editFormUser() {
    this.isSubmitted1 = true;
    if (this.editUser.invalid) {
      return
    } else {
     // console.log(this.userListId, this.editUser.value)
      this.adminService.sendUser(this.userListId, this.editUser.value).subscribe((res: any) => {
         console.log(res);
         this.toastr.success(res.message);
         this.editUser.reset();
         this.isSubmitted = false;
         this.renderData();
         document.getElementById('closeModel')?.click();
      },(error) => {
        this.toastr.error("something went wrong");
      })
    }
  }

  resendEmail() {
  this.adminService.emailSend(this.resend_id).subscribe((res:any) => {
    console.log(res.success)
    this.toastr.success(res.success);
    this.renderData()
  }, (error) => {
    this.toastr.error("something went wrong");
  })
  }

  userActive(id:any){
    this.adminService.ActiveUser(id).subscribe((res:any) => {
      console.log(res)
      this.toastr.success(res.success);
      this.renderData()
    },(error) => {
      this.toastr.error("something went wrong");
    })

  }

  inActive(id:any) {
    this.adminService.InactiveUser(id).subscribe((res:any) => {
      console.log(res)
      this.toastr.success(res.success);
      this.renderData()
    }, (error) => {
      this.toastr.error("Something went wrong");
    })

  }
  resend_id=0;
  openResend(user:any){
    this.resend_name=user.name;
    this.resend_id=user.id;
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'user-create') {
          this.userCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'user-edit') {
          this.userEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'user-view') {
          this.userView = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'user-activate-inactivate') {
          this.userActivateInactivate = true;
        }
      });
    }
  }

}
