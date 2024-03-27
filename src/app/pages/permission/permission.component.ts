import { Component } from '@angular/core';
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { ComponentsModule } from '../../components/components.module';

@Component({
  selector: 'app-permission',
  standalone: true,
  imports: [ComponentsModule, PermissionFormComponent],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.scss'
})
export class PermissionComponent {
  collection:any = "permission"
  headers = ['Id', "Descripcion", "Grupo", "actions"];
  columns = [
    { title:"Id", key: 'id', order: true },
    { title:"Descripcion", key: 'name', order:false },
    { title:"Grupo", key: 'group_name', order:false }
  ];

}
