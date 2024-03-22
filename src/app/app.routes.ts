import { Routes } from '@angular/router';
import { AssociationComponent } from './pages/association/association.component';
import { FederationComponent } from './pages/federation/federation.component';
import { AssociationFormComponent } from './pages/association/association-form/association-form.component';
import { FederationFormComponent } from './pages/federation/federation-form/federation-form.component';


export const routes: Routes = [
  {
    path: 'association', 
   
    children: [
    {
      path:"",
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
    path: 'federation',
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
];
