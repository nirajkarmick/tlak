import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomInterceptorInterceptor } from './custom-interceptor.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterModule } from './modules/general/register/register.module';
import { DashboardModule } from './modules/general/dashboard/dashboard.module';
import { SettingModule } from './modules/general/setting/setting.module';
import { AddCreditModule } from './modules/general/add-credit/add-credit.module';
import { DepartureTableModule } from './modules/general/departure/departure-table/departure-table.module';
import { DepartureCreateModule } from './modules/general/departure/departure-create/departure-create.module';
import { PoiModule } from './modules/general/point-of-interest/poi/poi.module';
import { AddPoiModule } from './modules/general/point-of-interest/add-poi/add-poi.module';
import { DepartureLocationModule } from './modules/general/departure/departure-location/departure-location.module';
import { DepartureItineraryModule } from './modules/general/departure/departure-itinerary/departure-itinerary.module';
import { DepartureSidebarModule } from './modules/general/departure/departure-sidebar/departure-sidebar.module';
import { CreateModule } from './modules/general/upcoming-tour/create/create.module';
import { UpcomingTourModule } from './modules/general/upcoming-tour/upcoming-tour.module';
import { InclusionExclusionModule } from './modules/general/departure/inclusion-exclusion/inclusion-exclusion.module';
import { TravelersModule } from './modules/general/departure/travelers/travelers.module';
import { FlightsModule } from './modules/general/departure/flights/flights.module';
import { HotelsModule } from './modules/general/departure/hotels/hotels.module';
import { TourDocumentsModule } from './modules/general/departure/tour-documents/tour-documents.module';
import { OperationsTeamModule } from './modules/general/departure/operations-team/operations-team.module';
import { UpcomingToursModule } from './modules/general/departure/departure-upcoming-tours/upcoming-tours.module';
import { DepartureSettingsModule } from './modules/general/departure/departure-settings/departure-settings.module';
import { FeedbackModule } from './modules/general/departure/feedback/feedback.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { ForgotPasswordModule } from './modules/general/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './modules/general/reset-password/reset-password.module';
import { TermsAndConditionsModule } from './modules/general/departure/terms-and-conditions/terms-and-conditions.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { ChnagePasswordComponent } from './modules/general/chnage-password/chnage-password.component';
import { ChnagePasswordModule } from './modules/general/chnage-password/chnage-password.module';
import { BreakDepartureModule } from './modules/general/departure/break-departure/break-departure.module';
import { BillingModule } from './modules/general/billing/billing.module';
import { UsersModule } from './modules/general/users/users.module';
import { RolesModule } from './modules/general/roles/roles.module';
import { TravellersModule } from './modules/general/travellers/travellers.module';
import { OperatorsModule } from './modules/general/operators/operators.module';
import { TravellersListModule } from './modules/general/travellers-list/travellers-list.module';
import { PdfPageModule } from './modules/general/departure/pdf-page/pdf-page.module';
import { PdfcreateModule } from './modules/general/departure/pdf-page/pdfcreate/pdfcreate.module';
import { DepartureBillingModule } from './modules/general/departure-billing/departure-billing.module';
import { PaymentDetailsModule } from './modules/general/payment-details/payment-details.module';
import { AgmCoreModule } from '@agm/core';
import { environment } from "../environments/environment";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from "ngx-translate-multi-http-loader";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { VerifyModule } from './modules/general/verify/verify.module';
import { PaymentResponseComponent } from './payment-response/payment-response.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationModule } from './modules/general/departure/notification/notification.module';
import { MomentModule } from 'ngx-moment';
import { GoogleChartsModule } from 'angular-google-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { DatePipe } from '@angular/common';
//import { ChartsModule } from 'ng2-charts';
// import { NgChartsModule } from 'ng2-charts';

// translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json')
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,
    ChnagePasswordComponent,
    PaymentResponseComponent,
  ],
  imports: [
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MomentModule,
    GoogleChartsModule,
    Ng2GoogleChartsModule,
   // ChartsModule,
    // NgChartsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterModule,
    DashboardModule,
    SettingModule,
    AddCreditModule,
    DepartureTableModule,
    DepartureCreateModule,
    PoiModule,
    AddPoiModule,
    DepartureLocationModule,
    DepartureItineraryModule,
    DepartureSidebarModule,
    CreateModule,
    UpcomingTourModule,
    InclusionExclusionModule,
    TravelersModule,
    FlightsModule,
    HotelsModule,
    TourDocumentsModule,
    OperationsTeamModule,
    UpcomingToursModule,
    DepartureSettingsModule,
    FeedbackModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    AmazingTimePickerModule,
    ToastrModule.forRoot({ timeOut: 1500, positionClass: 'toast-bottom-right', preventDuplicates: true, }),
    ToastContainerModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'wait a sec' }),
    NgSelectModule,
    AngularMultiSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSpinnerModule,
    NgHttpLoaderModule.forRoot(),
    ForgotPasswordModule,
    ResetPasswordModule,
    TermsAndConditionsModule,
    ImageCropperModule,
    ChnagePasswordModule,
    BreakDepartureModule,
    BillingModule,
    UsersModule,
    RolesModule,
    TravellersModule,
    OperatorsModule,
    TravellersListModule,
    PdfPageModule,
    PdfcreateModule,
    DepartureBillingModule,
    PaymentDetailsModule,
    HeaderModule,
    FooterModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: environment.coordinateKey,
      //apiKey: 'AIzaSyDe20rB3ZDxDKMs4NTje6ueQTTtp1JixVo',
      libraries: ['places']
    }),
    TranslateModule.forRoot({
      // defaultLanguage : 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    VerifyModule,
    NotificationModule,
  ],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  exports: [
    MatDatepickerModule,

  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
