import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ParamMap ,ActivatedRoute} from '@angular/router'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from  '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateConfigService } from "../../../services/translate-config.service";

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
 
  id:any;
  email:any;
  token:any;
  verifiedMessage:any;
  notVerified:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService, 
    private formBuilder: FormBuilder,
    private ReactiveFormsModule: ReactiveFormsModule,
    private toastr: ToastrService,
    private translate: TranslateConfigService
  ) {

    this.id = this.route.snapshot.params['id'];
    this.email = this.route.snapshot.queryParams['email'];
    this.token = this.route.snapshot.queryParams['token'];

    if ( this.id && this.email && this.token) {
       this.verifyEmail()
    } 
  }

  ngOnInit(): void {
  }

  verifyEmail() {
    var data = {
      email: this.email,
      token: this.token
    }
    console.log(data);
    this.apiService.userVerify(this.id, data).subscribe((res:any) => {
      console.log(res)
      if(res.status === true) {
        this.toastr.success(res.message)
        this.verifiedMessage = res.message;
        setTimeout(()=>{
          this.router.navigateByUrl("/"); 
     }, 1000);
      }

      if(res.status === false) {
        this.notVerified = res.message
        this.toastr.error(res.message) 
       // this.router.navigateByUrl('/forgot-password');
      }
    })

  }

}
