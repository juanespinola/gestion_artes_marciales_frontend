import { Routes } from '@angular/router';
import { AssociationComponent } from './pages/association/association.component';
import { FederationComponent } from './pages/federation/federation.component';
import { AssociationFormComponent } from './pages/association/association-form/association-form.component';
import { FederationFormComponent } from './pages/federation/federation-form/federation-form.component';
import { AuthComponent } from './templates/auth/auth.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { PagesComponent } from './pages/pages.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { UsersPermissionsComponent } from './pages/users/users-permissions/users-permissions.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { PermissionFormComponent } from './pages/permission/permission-form/permission-form.component';
import { RolComponent } from './pages/rol/rol.component';
import { RolFormComponent } from './pages/rol/rol-form/rol-form.component';


export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: "",
        component: AuthComponent
      },
      {
        path: "signin",
        component: SignInComponent
      },
      {
        path: "signup",
        component: SignUpComponent
      }
    ]
  },
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: 'associations',
        children: [
          {
            path: "",
            component: AssociationComponent,
          },
          {
            path: 'edit/:id',
            component: AssociationFormComponent
          },
          {
            path: 'add',
            component: AssociationFormComponent
          }]
      },
      {
        path: 'federations',
        children: [
          {
            path: "",
            component: FederationComponent,
          },
          {
            path: 'edit/:id',
            component: FederationFormComponent,
          },
          {
            path: 'add',
            component: FederationFormComponent
          }
        ]
      },
      {
        path: 'users',
        children: [
          {
            path: "",
            component: UsersComponent,
          },
          {
            path: "edit/:id",
            component: UsersFormComponent
          },
          {
            path: "add",
            component: UsersFormComponent
          },
          {
            path: "permissions/:id",
            component: UsersPermissionsComponent
          }

        ]
      },
      {
        path: 'permission',
        children: [
          {
            path: "",
            component: PermissionComponent,
          },
          {
            path: "edit/:id",
            component: PermissionFormComponent
          },
          {
            path: "add",
            component: PermissionFormComponent
          },
        ]
      },
      {
        path: 'rol',
        children: [
          { path: "", component: RolComponent, },
          { path: "edit/:id", component: RolFormComponent },
          { path: "add", component: RolFormComponent },
        ]
      }
    ]
  },


];
