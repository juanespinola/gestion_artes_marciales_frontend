import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { PermissionFormComponent } from '../permission/permission-form/permission-form.component';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [ComponentsModule, PermissionFormComponent],
  templateUrl: './rol.component.html',
  styleUrl: './rol.component.scss'
})
export class RolComponent {
  collection:any = "rol"
  headers = ['#', "Descripcion", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'name', order:false }
    ];
}
