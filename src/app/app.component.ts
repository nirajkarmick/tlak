import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Spinkit } from 'ng-http-loader';

declare let $: any;
import 'src/assets/js/smooth-scrollbar.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  showHeader = false;
  currentRoute: any;
  userIP = '';
  public spinkit = Spinkit;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private httpClient: HttpClient,
    private titleService: Title
  ) {
    this.location.onUrlChange((x: any) => this.urlChange(x));
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        this.currentRoute = event.url;
      //  console.log(this.currentRoute);
        if (this.currentRoute == '/app/' || this.currentRoute == '/app'
          || this.currentRoute == '/app/register' || this.currentRoute == '/app/register/' || this.currentRoute == '/'
          || this.currentRoute == '/register' || this.currentRoute == '/register/'
          || this.currentRoute == '/forgot-password' || this.currentRoute == '/forgot-password/'
          || this.currentRoute == '/app/forgot-password' || this.currentRoute == '/app/forgot-password/'
          || this.currentRoute.indexOf('/reset-password') > -1 || this.currentRoute.indexOf('/verify') > -1
        ) {
          // console.log('header not found', this.currentRoute)
          this.showHeader = false;
        } else {
          // console.log('header show', this.currentRoute)
          this.showHeader = true;
          if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null) {
          } else {
            this.router.navigateByUrl('/');
          }
        }
        this.hideProfileMenu()
      });
    this.getGeolocation();

  }

  ngOnInit(): void {
    this.hideProfileMenu();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
      //  console.log(data);
        this.titleService.setTitle(data.title)
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }

  }

  urlChange(x: any) {
    if (x != '/app/' && x != "/register" && x != "/" && x != 'app/register') {
      // console.log(x);
    }
  }

  hideProfileMenu() {
    if ($(".navbar-list li").find(".active")) {
      $(".navbar-list li").removeClass("iq-show");
      $(".navbar-list li .search-toggle").removeClass("active");
    }
  }

  getGeolocation() {
    this.httpClient.get("https://ipgeolocation.abstractapi.com/v1/?api_key=8b524e6b5bf5450ba6ce9005bdf7e5d0").subscribe(
      (value: any) => {
        // console.log(value, 'data');
        this.userIP = value.ip;
        localStorage.setItem("country", value.country);
        localStorage.setItem("country_code", value.country_code);
        localStorage.setItem("geonameId", value.country_geoname_id);
        localStorage.setItem("ip_address", value.ip_address);
        localStorage.setItem("latitude", value.latitude);
        localStorage.setItem("longitude", value.longitude);
      },
      (error) => {
     //   this.getLocation1();
        console.log('Unable to get data');
      }
    );
  }

  // getLocation1() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position: Position) => {
  //       if (position) {
  //         console.log("Latitude: " + position.coords.latitude +
  //           "Longitude: " + position.coords.longitude);
  //         this.lat = position.coords.latitude;
  //         this.lng = position.coords.longitude;
  //         console.log(this.lat);
  //         console.log(this.lat);
  //       }
  //     },
  //       (error) => console.log(error));
  //   } else {
  //     alert("Geolocation is not supported by this browser.");
  //   }
  // }


}
