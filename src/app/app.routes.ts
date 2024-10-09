import { Routes } from '@angular/router';
import { FederationComponent } from './pages/admin/federation/federation.component';
import { FederationFormComponent } from './pages/admin/federation/federation-form/federation-form.component';
import { SignInComponent } from './pages/admin/sign-in/sign-in.component';
import { SignInComponent as AthleteSignInComponent } from './pages/athlete/sign-in/sign-in.component';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';
import { SignUpComponent as AthleteSignUpComponent } from './pages/athlete/sign-up/sign-up.component';
import { PagesComponent } from './pages/admin/pages.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { UsersFormComponent } from './pages/admin/users/users-form/users-form.component';
import { UsersPermissionsComponent } from './pages/admin/users/users-permissions/users-permissions.component';
import { PermissionComponent } from './pages/admin/permission/permission.component';
import { PermissionFormComponent } from './pages/admin/permission/permission-form/permission-form.component';
import { RolComponent } from './pages/admin/rol/rol.component';
import { RolFormComponent } from './pages/admin/rol/rol-form/rol-form.component';

import { GroupCategoryComponent } from './pages/admin/group-category/group-category.component';
import { GroupCategoryFormComponent } from './pages/admin/group-category/group-category-form/group-category-form.component';
import { EventComponent } from './pages/admin/event/event.component';
import { EventFormComponent } from './pages/admin/event/event-form/event-form.component';
import { LocationComponent } from './pages/admin/location/location.component';
import { LocationFormComponent } from './pages/admin/location/location-form/location-form.component';
import { TypesEventComponent } from './pages/admin/types-event/types-event.component';
import { TypesEventFormComponent } from './pages/admin/types-event/types-event-form/types-event-form.component';
import { StatusEventComponent } from './pages/admin/status-event/status-event.component';
import { StatusEventFormComponent } from './pages/admin/status-event/status-event-form/status-event-form.component';
import { APP_ROUTES } from './routes';
import { AssociationComponent } from './pages/admin/association/association.component';
import { AssociationFormComponent } from './pages/admin/association/association-form/association-form.component';
import { CategoryComponent } from './pages/admin/category/category.component';
import { CategoryFormComponent } from './pages/admin/category/category-form/category-form.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { EventsComponent } from './pages/athlete/events/events.component';
import { FederationsComponent } from './pages/athlete/federations/federations.component';
import { EventDetailComponent } from './pages/athlete/events/event-detail/event-detail.component';
import { EventListEntryCategoriesComponent } from './pages/admin/event/event-list-entry-categories/event-list-entry-categories.component';
import { ProfileComponent as AdminProfileComponent } from './pages/admin/profile/profile.component';
import { RegisterEventComponent } from './pages/athlete/register-event/register-event.component';
import { PagesComponent as AthletePagesComponent } from './pages/athlete/pages.component';
import { FederationDetailComponent } from './pages/athlete/federations/federation-detail/federation-detail.component';
import { ProfileComponent } from './pages/athlete/profile/profile.component';
import { PaymentComponent } from './pages/athlete/payment/payment.component';
import { EventListAthleteInscriptionComponent } from './pages/admin/event/event-list-athlete-inscription/event-list-athlete-inscription.component';
import { EventListAthleteInscriptionComponent as AthleteEventListAthleteInscriptionComponent } from './pages/athlete/events/event-list-athlete-inscription/event-list-athlete-inscription.component';
import { NewComponent } from './pages/admin/new/new.component';
import { NewFormComponent } from './pages/admin/new/new-form/new-form.component';
import { NewDetailComponent } from './pages/athlete/federations/new-detail/new-detail.component';
import { EventBracketComponent } from './pages/athlete/events/event-bracket/event-bracket.component';
import { RequestComponent } from './pages/admin/request/request.component';
import { RequestFormComponent } from './pages/admin/request/request-form/request-form.component';
import { MembershipComponent } from './pages/athlete/membership/membership.component';
import { ParticipatedEventsComponent } from './pages/athlete/participated-events/participated-events.component';
import { CheckoutComponent } from './pages/athlete/checkout/checkout.component';
import { DashboardComponent } from './pages/athlete/dashboard/dashboard.component';
import { AthletesComponent } from './pages/athlete/athletes/athletes.component';
import { AthleteProfileComponent } from './pages/athlete/athlete-profile/athlete-profile.component';
import { RankingComponent } from './pages/athlete/ranking/ranking.component';
import { AthleteComponent } from './pages/admin/athlete/athlete.component';


export const routes: Routes = [
  // path athlete
  { path: "signin", component: AthleteSignInComponent },
  { path: "signup", component: AthleteSignUpComponent },
  {
    path: "",
    component: AthletePagesComponent,
    children: [
      { path: "federations", component: FederationsComponent },
      { 
        path: "federation/:federation_id", 
        children: [
          { path: "", component: FederationDetailComponent },
          { path: "news/:new_id", component: NewDetailComponent }
        ]
      },

      { path: "events", component: EventsComponent },
      { 
        path: "event/:event_id", 
        children: [
          { path: "", component: EventDetailComponent },
          { path: "registerevent", component: RegisterEventComponent },
          { path: "prueba", component: EventBracketComponent },
          { path: "pruebaa", component: AthleteEventListAthleteInscriptionComponent }
        ]
      },

      { 
        path: "athletes", 
        children: [
          { path:"", component: AthletesComponent },
          { path: "profile/:athlete_id", component: AthleteProfileComponent },
        ]
      },
      
      { path: "ranking", component: RankingComponent },
      { path: "profile", component: ProfileComponent },
      { path: "membership", component: MembershipComponent },
      { path: "participated_events", component: ParticipatedEventsComponent },
      { path: "checkout", component: CheckoutComponent },
      { path: "payment", component: PaymentComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: '', redirectTo: 'federations', pathMatch: 'full' },
      // { path: '**', redirectTo: 'federations' },
      
    ]
    
  },
 
  // path admin
  {
    path: APP_ROUTES.ADMIN_SIGNIN,
    children: [
      { path: "", component: SignInComponent, },
    ]
  },
  {
    path: "admin",
    component: PagesComponent,
    children: [
      {
        path: APP_ROUTES.ASSOCIATION,
        children: [
          { path: "", component: AssociationComponent, },
          { path: 'edit/:id', component: AssociationFormComponent },
          { path: 'add', component: AssociationFormComponent }
        ]
      },
      {
        path: APP_ROUTES.FEDERATION,
        children: [
          { path: "", component: FederationComponent },
          { path: 'edit/:id', component: FederationFormComponent },
          { path: 'add', component: FederationFormComponent }
        ]
      },
      {
        path: APP_ROUTES.USERS,
        children: [
          { path: "", component: UsersComponent },
          { path: "edit/:id", component: UsersFormComponent },
          { path: "add", component: UsersFormComponent },
          { path: "permissions/:id", component: UsersPermissionsComponent }
        ]
      },
      {
        path: APP_ROUTES.PERMISSION,
        children: [
          { path: "", component: PermissionComponent },
          { path: "edit/:id", component: PermissionFormComponent },
          { path: "add", component: PermissionFormComponent },
        ]
      },
      {
        path: APP_ROUTES.ROL,
        children: [
          { path: "", component: RolComponent, },
          { path: "edit/:id", component: RolFormComponent },
          { path: "add", component: RolFormComponent },
        ]
      },
      {
        path: APP_ROUTES.EVENT,
        children: [
          { path: "", component: EventComponent, },
          { path: "add", component: EventFormComponent },
          {
            path: "edit/:id",
            children: [
              { path: "", component: EventFormComponent },
              {
                path: APP_ROUTES.ENTRY_CATEGORIES,
                children: [
                  { path: "", component: EventListEntryCategoriesComponent, },
                  // {
                  //   path: ":id/" + APP_ROUTES.CLASS_CATEGORIES,
                  //   children: [
                  //     { path: "", component: EventListClassCategoriesComponent, },
                  //   ]
                  // }
                ]
              },
              {
                path: APP_ROUTES.ATHLETE_INSCRIPTIONS,
                children: [
                  { path: "", component: EventListAthleteInscriptionComponent }
                ]
              }
            ]
          },
        ]
      },
      {
        path: APP_ROUTES.LOCATION,
        children: [
          { path: "", component: LocationComponent, },
          { path: "edit/:id", component: LocationFormComponent },
          { path: "add", component: LocationFormComponent },
        ]
      },
      {
        path: APP_ROUTES.TYPE_EVENT,
        children: [
          { path: "", component: TypesEventComponent, },
          { path: "edit/:id", component: TypesEventFormComponent },
          { path: "add", component: TypesEventFormComponent },
        ]
      },
      {
        path: APP_ROUTES.STATUS_EVENT,
        children: [
          { path: "", component: StatusEventComponent, },
          { path: "edit/:id", component: StatusEventFormComponent },
          { path: "add", component: StatusEventFormComponent },
        ]
      },
      {
        path: APP_ROUTES.NEW,
        children: [
          { path: "", component: NewComponent, },
          { path: "edit/:id", component: NewFormComponent },
          { path: "add", component: NewFormComponent },
        ]
      },
      {
        path: APP_ROUTES.REQUEST,
        children: [
          { path: "", component: RequestComponent, },
          { path: "edit/:id", component: RequestFormComponent },
          { path: "add", component: RequestFormComponent },
        ]
      },
      {
        path: "profile",
        children: [
          { path: "", component: AdminProfileComponent, },
          // { path: "edit/:id", component: RequestFormComponent },
          // { path: "add", component: RequestFormComponent },
        ]
      },
      {
        path: APP_ROUTES.ATHLETES,
        children: [
          { path: "", component: AthleteComponent, },
          // { path: "edit/:id", component: RequestFormComponent },
          // { path: "add", component: RequestFormComponent },
        ]
      },
    ]

  },

];
