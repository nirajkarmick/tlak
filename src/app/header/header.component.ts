import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { TranslateModule } from '@ngx-translate/core'
import { CompanySettingsService } from "../services/company-settings.service";
import { TranslateConfigService } from "../services/translate-config.service";
import { TranslateService } from '@ngx-translate/core';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companySettings: any;
  selectedLanguage = 'en';
  TravellersName = localStorage.getItem('company_name');
  userName = localStorage.getItem('user');
  tenentId = localStorage.getItem('tenant_id');
  departureCreate = false;
  departureEdit = false;
  poiCreate = false;
  poiEdit = false;
  poiView = false;
  locationEdit = false;
  optionalDepartureCreate = false;
  optionalDepartureEdit = false;
  optionalDepartureDelete = false;
  optionalDepartureView = false
  userCreate = false;
  userEdit = false;
  userView = false;
  roleCreate = false;
  roleEdit = false;
  roleView = false;
  userActivateInactivate = false;
  departureView = false;
  poiDelete = false;
  
  constructor(
    private router: Router,
    private RouterModule: RouterModule,
    private http: HttpClient,
    private CompanySettingsService: CompanySettingsService,
    private translate: TranslateConfigService
  ) {
    if (localStorage.getItem('lang') != undefined) {
      this.selectedLanguage = localStorage.getItem('lang')
      this.translate.changeLanguage(this.selectedLanguage);
    }
    this.render_data();
    this.loadPermissionMenu();
  }

  changeLang(type: any) {
  //  console.log(type.target.value)
    this.selectedLanguage = type.target.value;
    this.translate.changeLanguage(this.selectedLanguage);
    localStorage.setItem("lang", this.selectedLanguage);
  }

  logo: any;

  render_data() {
    this.CompanySettingsService.CompnaySettings().subscribe((res: any) => {
      //console.log(res, "setting")
      this.companySettings = res.data.tenant;
      this.logo = this.companySettings.logo_url + this.companySettings.company_logo
    })
  }

  ngOnInit(): void {
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tenant_id');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('tenant_code');
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  openProfileMenu(e: any) {
    var myTargetElement = e.target;
    var selector, mainElement;
    if (
      $(myTargetElement).hasClass("search-toggle") ||
      $(myTargetElement).parent().hasClass("search-toggle") ||
      $(myTargetElement).parent().parent().hasClass("search-toggle")
    ) {
      if ($(myTargetElement).hasClass("search-toggle")) {
        selector = $(myTargetElement).parent();
        mainElement = $(myTargetElement);
      } else if ($(myTargetElement).parent().hasClass("search-toggle")) {
        selector = $(myTargetElement).parent().parent();
        mainElement = $(myTargetElement).parent();
      } else if (
        $(myTargetElement).parent().parent().hasClass("search-toggle")
      ) {
        selector = $(myTargetElement).parent().parent().parent();
        mainElement = $(myTargetElement).parent().parent();
      }
      if (
        !mainElement.hasClass("active") &&
        $(".navbar-list li").find(".active")
      ) {
        $(".navbar-list li").removeClass("iq-show");
        $(".navbar-list li .search-toggle").removeClass("active");
      }

      selector.toggleClass("iq-show");
      mainElement.toggleClass("active");

      e.preventDefault();
    } else if ($(myTargetElement).is(".search-input")) {
    } else {
      $(".navbar-list li").removeClass("iq-show");
      $(".navbar-list li .search-toggle").removeClass("active");
    }
  }

  hideProfileMenuHead() {
    if ($(".navbar-list li").find(".active")) {
      $(".navbar-list li").removeClass("iq-show");
      $(".navbar-list li .search-toggle").removeClass("active");
    }
  }

  openMenu() {
    $("body").toggleClass("sidebar-main");
  }

  loadPermissionMenu() {
    if (localStorage.getItem('permissionArray') != null) {
      var permissionArray = JSON.parse(localStorage.getItem('permissionArray'));
      // console.log(permissionArray, 'permission')
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-create') {
          this.departureCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-edit') {
          this.departureEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-create') {
          this.poiCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-edit') {
          this.poiEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-view') {
          this.poiView = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'location-edit') {
          this.locationEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-create') {
          this.optionalDepartureCreate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-edit') {
          this.optionalDepartureEdit = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-delete') {
          this.optionalDepartureDelete = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'optional-departure-view') {
          this.optionalDepartureView = true;
        }
      });
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
      permissionArray.forEach(permissions => {
        if (permissions == 'user-activate-inactivate') {
          this.userActivateInactivate = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'departure-view') {
          this.departureView = true;
        }
      });
      permissionArray.forEach(permissions => {
        if (permissions == 'poi-delete') {
          this.poiDelete = true;
        }
      });
    }
  }
}
