import { Component } from '@angular/core';
import { StatusEventFormComponent } from './status-event-form/status-event-form.component';
import { ComponentsModule } from '../components/components.module';

@Component({
  selector: 'app-status-event',
  standalone: true,
  imports: [
    ComponentsModule, 
    StatusEventFormComponent
  ],
  templateUrl: './status-event.component.html',
  styleUrl: './status-event.component.scss'
})
export class StatusEventComponent {
  collection:any = "statusevent"
  headers = ['#', "Descripcion", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false }
    ];
}
