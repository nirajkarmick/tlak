import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Router, ParamMap, ActivatedRoute } from "@angular/router";
import { LoginService } from "../../../services/login.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  credentials = { email: "", password: "", current_url: "" };
  //loginForm=true;
  loginForm: FormGroup;
  resendForm: FormGroup;
  resetForm = false;
  verifyForm = false;
  isLoading = true;
  isSubmitted = false;
  isSubmitted1 = false;
  errormsg: string = "";
  redirect_msg: string;
  popUpMsg: any;
  passErr = "";
  userErr = "";
  errorMessage:any;
  resendMessage = 1;
  verifyUser:any;
  showPass = false;
  token = localStorage.getItem('token');

  constructor(
    private router: Router,
    private lservice: LoginService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.redirect_msg = "";
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      password: ["", Validators.required],
    });
    this.resendForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 1400);
    this.authentication ();
  }

  passIconShow() {
    var passwordinput = document.getElementById("passw_show");
    var eyeicontoggle = document.getElementById("eyeicon");
    if ($("#passw_show").attr("type") === "password") {
      $("#passw_show").attr("type", "text");
      $("#eyeicon").removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      $("#passw_show").attr("type", "password");
      $("#eyeicon").removeClass("fa-eye-slash").addClass("fa-eye");
    }
  }

  ngOnInit() {
    if (
      localStorage.getItem("token") != undefined &&
      localStorage.getItem("token") != null
    ) {
      //this.router.navigateByUrl('/dashboard');
    }
  }

  get formControls() {
    return this.loginForm.controls;
  }

  login() {
    this.isLoading = true;
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.lservice.login(this.loginForm.value).subscribe(
      (obj: any) => {
        console.log(obj);
        if (obj.status == true && obj.verify == 1) {
          this.toastr.success(obj.message);
          this.isLoading = false;
          localStorage.setItem("user", obj.data.name ? obj.data.name : "user");
          localStorage.setItem("permissionArray", JSON.stringify(obj.permissions));
          localStorage.setItem("userId", obj.data.id);
          localStorage.setItem("userEmail", obj.data.email);
          localStorage.setItem("token", obj.success.token);
          localStorage.setItem("userDate", JSON.stringify(obj.data));
          localStorage.setItem("tenant_id", obj.data.tenant_id);
          localStorage.setItem("tenant_code", obj.data.tenant_code);
          localStorage.setItem("company_id", obj.data.company_id);
          localStorage.setItem("company_name", obj.data.company_name);
          localStorage.setItem("verify_email", obj.data.email_verified_at);
          this.router.navigateByUrl("/dashboard");
        }
        if (obj.status == false ) {
          console.log(obj.message);
          this.errorMessage = obj.message;
          this.toastr.error(obj.message);
          this.isLoading = false;
        } 

        if(obj.verify == 0) {
          this.resendMessage = obj.verify;
          this.verifyUser = obj.message;
          this.toastr.error(obj.message);
        }
      },
      (error) => {
        this.toastr.error("some thing went wrong");
        this.isLoading = false;
      }
    );
  }
  
  get mailResend() {
    return this.resendForm.controls;
  }

  resendMail() {
    //this.isLoading = true;
    this.isSubmitted1 = false;
    if (this.resendForm.invalid) {
      this.isLoading = false;
    } else {
      this.lservice.resend(this.resendForm.value).subscribe((res:any) => {
        console.log(res,"hhscvhsvchscvshhhhhhh")

        if( res.status == true) {
          this.toastr.success(res.message);
          this.resendMessage = res.verify;
        } 
        if ( res.status == false)
        this.toastr.error(res.message);
        this.resendMessage = res.verify;
      })
    }
  }

  authentication () {
    if( this.token === '') {
      this.toastr.error('User is not authorized')
      this.router.navigateByUrl("/"); 
    } if (this.token) {
      this.router.navigateByUrl("/dashboard");
    }
  }

  ViewPassword() {
    this.showPass = ($('#Spass:checked').length > 0);
    if (this.showPass) {
      $('#password').get(0).type = 'text';
      $('.fas').removeClass('fa-eye').addClass('fa-eye-slash')
    } else {
      $('#password').get(0).type = 'password';
      $('.fas').removeClass('fa-eye-slash').addClass('fa-eye')
    }
  }
}
