import { Routes } from '@angular/router';
import { FederationComponent } from './pages/admin/federation/federation.component';
import { FederationFormComponent } from './pages/admin/federation/federation-form/federation-form.component';
import { SignInComponent } from './pages/admin/sign-in/sign-in.component';
import { SignUpComponent } from './pages/admin/sign-up/sign-up.component';
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
import { EventsComponent } from './pages/organization/events/events.component';
import { FederationsComponent } from './pages/organization/federations/federations.component';
import { FederationsLandingPageComponent } from './pages/organization/federations-landing-page/federations-landing-page.component';


export const routes: Routes = [
  {
    path: "",
    component: OrganizationComponent,
    children: [
      { path: "federations", component: FederationsComponent },
      { path: "federations/:federation_id", component: FederationsLandingPageComponent },
      { path: "federations/:federation_id/events", component: EventsComponent}
      // { path: "events", component: EventsComponent}
    ]
  },
  // {
  //   path:"federations/:federation_id",
  //   component : FederationsComponent,
  //   children: [
  //     { path: "events", component: EventsComponent }
  //   ]
  // },
  // {
  //   path:"federations/:federation_id/events", component : EventsComponent,
  // },
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
      // {
      //   path: 'sport',
      //   children: [
      //     { path: "", component: SportComponent, },
      //     { path: "edit/:id", component: SportFormComponent },
      //     { path: "add", component: SportFormComponent },
      //   ]
      // },
      {
        path: APP_ROUTES.CATEGORY,
        children: [
          { path: "", component: CategoryComponent, },
          { path: "edit/:id", component: CategoryFormComponent },
          { path: "add", component: CategoryFormComponent },
        ]
      },
      {
        path: APP_ROUTES.GROUP_CATEGORY,
        children: [
          { path: "", component: GroupCategoryComponent, },
          { path: "edit/:id", component: GroupCategoryFormComponent },
          { path: "add", component: GroupCategoryFormComponent },
        ]
      },
      {
        path: APP_ROUTES.EVENT,
        children: [
          { path: "", component: EventComponent, },
          { path: "edit/:id", component: EventFormComponent },
          { path: "add", component: EventFormComponent },
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
    ]
  },


];
