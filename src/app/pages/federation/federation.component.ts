import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { FederationFormComponent } from './federation-form/federation-form.component';

@Component({
  selector: 'app-federation',
  standalone: true,
  imports: [ComponentsModule, FederationFormComponent],
  templateUrl: './federation.component.html',
  styleUrl: './federation.component.scss'
})
export class FederationComponent {
  collection:any = "federation"
  headers = ['Id', "Descripcion", "actions"];
  columns = [
    { title:"Id", key: 'id', order: true },
    { title:"Descripcion", key: 'description', order:false }
  ];
}
