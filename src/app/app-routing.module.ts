import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './modules/general/home/home.component';
import { NotFoundComponent } from './modules/general/not-found/not-found.component';
import { PaymentResponseComponent } from './payment-response/payment-response.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent, },

  // {
  //   path: '',
  //   loadChildren: () => import('./header/header.module')
  //   .then((mod) => mod.HeaderModule),
  //   },
  //   {
  //   path: '',
  //   loadChildren: () =>  import('./footer/footer.module')
  //   .then((mod) => mod.FooterModule),
  //   },
  { path: 'payment_response', component: PaymentResponseComponent },
  {
    path: 'contact',
    loadChildren: () => import('./modules/general/contact/contact.module')
      .then(mod => mod.ContactModule),
      data : {  
        title: 'Contact'  
    }
  },
  {
    path: 'about',
    loadChildren: () => import('./modules/general/about/about.module')
      .then(mod => mod.AboutModule),
      data : {  
        title: 'About'  
    }
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/general/register/register.module')
      .then(mod => mod.RegisterModule),
      data : {  
        title: 'Register'  
    }
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./modules/general/forgot-password/forgot-password.module')
      .then(mod => mod.ForgotPasswordModule),
      data : {  
        title: 'Forgot Password'  
    }
  },
  {
    path: 'reset-password/:token',
    loadChildren: () => import('./modules/general/reset-password/reset-password-routing.module')
      .then(mod => mod.ResetPasswordRoutingModule),
      data : {  
        title: 'Reset password'  
    }
  },
  {
    path: 'verify/:id',
    loadChildren: () => import('./modules/general/verify/verify-routing.module')
      .then(mod => mod.VerifyRoutingModule),
      data : {  
        title: 'Verify Passoword'  
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/general/dashboard/dashboard.module')
      .then(mod => mod.DashboardModule),
      data : {  
        title: 'Dashboard'  
    }
  },
  {
    path: 'departure-table',
    loadChildren: () => import('./modules/general/departure/departure-table/departure-table.module')
      .then(mod => mod.DepartureTableModule),
      data : {  
        title: 'Departure List'  
    }
  },
  {
    path: 'departure-create',
    loadChildren: () => import('./modules/general/departure/departure-create/departure-create.module')
      .then(mod => mod.DepartureCreateModule),
      data : {  
        title: 'Create Departure'  
    }
  },
  {
    path: 'departure-edit',
    loadChildren: () => import('./modules/general/departure/departure-create/departure-create.module')
      .then(mod => mod.DepartureCreateModule),
      data : {  
        title: 'Departure Edit'  
    }
  },
  {
    path: 'departure-location',
    loadChildren: () => import('./modules/general/departure/departure-location/departure-location.module')
      .then(mod => mod.DepartureLocationModule),
      data : {  
        title: 'Destination'  
    }
  },
  {
    path: 'departure-itinerary',
    loadChildren: () => import('./modules/general/departure/departure-itinerary/departure-itinerary.module')
      .then(mod => mod.DepartureItineraryModule),
      data : {  
        title: 'Itinerary'  
    }
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/general/upcoming-tour/create/create.module')
      .then(mod => mod.CreateModule),
      data : {  
        title: 'Upcoming Tour Create'  
    }
  },
  {
    path: 'upcoming-tours',
    loadChildren: () => import('./modules/general/upcoming-tour/upcoming-tour.module')
      .then(mod => mod.UpcomingTourModule),
      data : {  
        title: 'Upcoming Tour Table'  
    }
  },
  {
    path: 'setting',
    loadChildren: () => import('./modules/general/setting/setting.module')
      .then(mod => mod.SettingModule),
      data : {  
        title: 'Company Settings'  
    }
  },
  {
    path: 'add-credit',
    loadChildren: () => import('./modules/general/add-credit/add-credit.module')
      .then(mod => mod.AddCreditModule),
      data : {  
        title: 'Add Credit'  
    }
  },
  {
    path: '',
    loadChildren: () => import('./modules/general/signin/signin.module')
      .then(mod => mod.SigninModule),
      data : {  
        title: 'Signin'  
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/general/signin/signin.module')
      .then(mod => mod.SigninModule),
      data : {  
        title: 'login'  
    }
  },
  {
    path: 'poi',
    loadChildren: () => import('./modules/general/point-of-interest/poi/poi.module')
      .then(mod => mod.PoiModule),
      data : {  
        title: 'Point of Interest'  
    }
  },
  {
    path: 'add-poi',
    loadChildren: () => import('./modules/general/point-of-interest/add-poi/add-poi.module')
      .then(mod => mod.AddPoiModule),
      data : {  
        title: 'Add Point of Interest'  
    }
  },
  // {
  //   path: 'add-poi',
  //   loadChildren: () => import('./modules/general/point-of-interest/add-poi/add-poi.module')
  //     .then(mod => mod.AddPoiModule),
  //     data : {  
  //       title: 'Add Point of Interest'  
  //   }
  // },
  {
    path: 'inclusion-exclusion',
    loadChildren: () => import('./modules/general/departure/inclusion-exclusion/inclusion-exclusion.module')
      .then(mod => mod.InclusionExclusionModule),
      data : {  
        title: 'Inclusion/Exclusion'  
    }
  },
  {
    path: 'departure-settings',
    loadChildren: () => import('./modules/general/departure/departure-settings/departure-settings.module')
      .then(mod => mod.DepartureSettingsModule),
      data : {  
        title: 'Departure Settings'  
    }
  },
  {
    path: 'feedback',
    loadChildren: () => import('./modules/general/departure/feedback/feedback.module')
      .then(mod => mod.FeedbackModule),
      data : {  
        title: 'Tour Feedback'  
    }
  },
  {
    path: 'termandconditions',
    loadChildren: () => import('./modules/general/departure/terms-and-conditions/terms-and-conditions.module')
      .then(mod => mod.TermsAndConditionsModule),
      data : {  
        title: 'T&C'  
    }
  },
  {
    path: 'flights',
    loadChildren: () => import('./modules/general/departure/flights/flights.module')
      .then(mod => mod.FlightsModule),
      data : {  
        title: 'Flights'  
    }
  },
  {
    path: 'hotels',
    loadChildren: () => import('./modules/general/departure/hotels/hotels.module')
      .then(mod => mod.HotelsModule),
      data : {  
        title: 'Hotels'  
    }
  },
  {
    path: 'operations-team',
    loadChildren: () => import('./modules/general/departure/operations-team/operations-team.module')
      .then(mod => mod.OperationsTeamModule),
      data : {  
        title: 'Operation Teams'  
    }
  },
  {
    path: 'tour-documents',
    loadChildren: () => import('./modules/general/departure/tour-documents/tour-documents.module')
      .then(mod => mod.TourDocumentsModule),
      data : {  
        title: 'Tour Document'  
    }
  },
  {
    path: 'travelers',
    loadChildren: () => import('./modules/general/departure/travelers/travelers.module')
      .then(mod => mod.TravelersModule),
      data : {  
        title: 'Travellers'  
    }
  },
  {
    path: 'departure-upcoming-tours',
    loadChildren: () => import('./modules/general/departure/departure-upcoming-tours/upcoming-tours.module')
      .then(mod => mod.UpcomingToursModule),
      data : {  
        title: 'Upcomming Tours List'  
    }
  },
  {
    path: 'change-password',
    loadChildren: () => import('./modules/general/chnage-password/chnage-password.module')
      .then(mod => mod.ChnagePasswordModule),
      data : {  
        title: 'Change Password'  
    }
  },
  {
    path: 'break-departure',
    loadChildren: () => import('./modules/general/departure/break-departure/break-departure.module')
      .then(mod => mod.BreakDepartureModule),
      data : {  
        title: 'Departure Break'  
    }
  },
  {
    path: 'billing',
    loadChildren: () => import('./modules/general/billing/billing.module')
      .then(mod => mod.BillingModule),
      data : {  
        title: 'Billing'  
    }
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/general/users/users.module')
      .then(mod => mod.UsersModule),
      data : {  
        title: 'Users'  
    }
  },
  {
    path: 'roles',
    loadChildren: () => import('./modules/general/roles/roles.module')
      .then(mod => mod.RolesModule),
      data : {  
        title: 'Roles'  
    }
  },
  {
    path: 'travellers',
    loadChildren: () => import('./modules/general/travellers/travellers.module')
      .then(mod => mod.TravellersModule),
      data : {  
        title: 'Travellers'  
    }
  },
  {
    path: 'opereraters-list',
    loadChildren: () => import('./modules/general/operators/operators.module')
      .then(mod => mod.OperatorsModule),
      data : {  
        title: 'Operators List'  
    }
  },
  {
    path: 'travellers-list',
    loadChildren: () => import('./modules/general/travellers-list/travellers-list.module')
      .then(mod => mod.TravellersListModule),
      data : {  
        title: 'Travellers List'  
    }
  },
  {
    path: 'pdf-page',
    loadChildren: () => import('./modules/general/departure/pdf-page/pdf-page-routing.module')
      .then(mod => mod.PdfPageRoutingModule),
      data : {  
        title: 'PDF Pages'  
    }
  },
  {
    path: 'pdf-page/create',
    loadChildren: () => import('./modules/general/departure/pdf-page/pdfcreate/pdfcreate.module')
      .then(mod => mod.PdfcreateModule),
      data : {  
        title: 'PDF Create'  
    }
  },
  {
    path: 'departure-billing',
    loadChildren: () => import('./modules/general/departure-billing/departure-billing.module')
      .then(mod => mod.DepartureBillingModule),
      data : {  
        title: 'Departure Billing'  
    }
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./modules/general/payment-details/payment-details.module')
      .then(mod => mod.PaymentDetailsModule),
      data : {  
        title: 'Payment Details'  
    }
  },
  {
    path: 'notification',
    loadChildren: () => import('./modules/general/departure/notification/notification-routing.module')
      .then(mod => mod.NotificationRoutingModule),
      data : {  
        title: 'Notification'  
    }
  },
  { path: '**', component: NotFoundComponent },
  { path: '404', component: NotFoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
