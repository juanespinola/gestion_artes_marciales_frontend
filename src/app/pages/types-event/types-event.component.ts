import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { TypesEventFormComponent } from './types-event-form/types-event-form.component';

@Component({
  selector: 'app-types-event',
  standalone: true,
  imports: [
    ComponentsModule, 
    TypesEventFormComponent
  ],
  templateUrl: './types-event.component.html',
  styleUrl: './types-event.component.scss'
})
export class TypesEventComponent {
  collection:any = "typesevent"
  headers = ['#', "Descripcion", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false }
    ];
}
