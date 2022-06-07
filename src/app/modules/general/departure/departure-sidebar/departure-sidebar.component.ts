import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Data, ActivatedRoute, Router, NavigationEnd, RouterModule} from "@angular/router";
import {filter} from 'rxjs/operators';
import {DepartureService} from "../../../../services/departure.service";
import {TranslateConfigService} from "../../../../services/translate-config.service";
import {ToastrService} from 'ngx-toastr';
import {DOCUMENT} from '@angular/common';
import Scrollbar from 'smooth-scrollbar';

@Component({
  selector: 'app-departure-sidebar',
  templateUrl: './departure-sidebar.component.html',
  styleUrls: ['./departure-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DepartureSidebarComponent implements OnInit {
  package_id: any;
  currentRoute: any;
  createEnable = false;
  /*depBreak = 0;*/
  DepDetails: any;
  @Input() depBreak: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private RouterModule: RouterModule,
    private departure_service: DepartureService,
    private translate: TranslateConfigService,
    private toastr: ToastrService,
  ) {
    this.package_id = this.route.snapshot.queryParams['package_id'];
    if (this.package_id === undefined) {
      this.router.navigateByUrl('/departure-create');
    } else {
      this.render_data();
    }

    //  console.log(this.router);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe((event: any) => {
        this.currentRoute = event.url;
        if (this.currentRoute.search('departure-create') > -1) {
          this.createEnable = true;
        }
      });
  }

  processitineary: any
  processdestination: any
  processdocument: any
  processflight: any
  processhotel: any
  processinclusion: any
  processoperation: any
  processterms: any
  processtraveler: any

  render_data() {
    this.departure_service.proccessStatus(this.package_id).subscribe((res: any) => {
    //  console.log(res, 'sadfsadfasdfsadfsd')
      this.processitineary = res.package_submenu_status.itineary;
      this.processdestination = res.package_submenu_status.destination;
      this.processdocument = res.package_submenu_status.document;
      this.processflight = res.package_submenu_status.flight;
      this.processhotel = res.package_submenu_status.hotel;
      this.processinclusion = res.package_submenu_status.inclusion;
      this.processoperation = res.package_submenu_status.operation;
      this.processterms = res.package_submenu_status.terms;
      this.processtraveler = res.package_submenu_status.traveler;
    })
    this.departure_service.departureGet(this.package_id).subscribe((res: any) => {
      this.depBreak = res.tourpackage.departure_break == '1' ? 1 : 0;
      // this.DepDetails = res.tourpackage;
      // this.depBreak = res.tourpackage.status;
    }, error => {
      this.toastr.error('database connection failed');
      this.router.navigateByUrl('/departure-table');
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      //console.log(document.getElementById('sidebar-scrollbar'));
      if (document.getElementById('sidebar-scrollbar')) {


      }

      const scrollbar = Scrollbar.init(document.getElementById('sidebar-scrollbar'), {
        plugins: {
          overscroll: true
        }
      });
      scrollbar.updatePluginOptions('overscroll', {
        effect: 'glow',
        damping: 0.14,
        maxOverscroll: 300,
        glowColor: '#222a2d'
      });

    }, 400);

  }

  sidemenutoggle() {
    const iconchange = document.getElementsByClassName('icontoggleClass')[0];
    iconchange.classList.toggle('open');

    const mainbody = document.getElementsByClassName('content-page')[0];
    mainbody.classList.toggle('sidebar-main');
  }

}
