import { Component } from '@angular/core';
import { ComponentsModule } from '../../../components/components.module';
import { EventFormComponent } from './event-form/event-form.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    ComponentsModule,
    EventFormComponent
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  collection:any = "event"
  headers = [
    '#', 
    "Descripcion", 
    "Locacion", 
    "Fecha Inicial", 
    "Fecha Final", 
    "Tipo Evento", 
    "Estado Evento", 
    "Costo de Inscripcion", 
    "Total Participantes", 
    "Cupos Disponibles", 
    "Creado por", 
    "Actualizado por", 
    "actions"
  ];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false },
      { title:"Locacion", key: 'location.description', order:false },
      { title:"Fecha Inicial", key: 'initial_date', order:false },
      { title:"Fecha Final", key: 'final_date', order:false },
      { title:"Tipo Evento", key: 'type_event_id', order:false },
      { title:"Estado Evento", key: 'status_event_id', order:false },
      { title:"Costo de Inscripcion", key: 'inscription_fee', order:false },
      { title:"Total Participantes", key: 'total_participants', order:false },
      { title:"Cupos Disponibles", key: 'available_slots', order:false },
      { title:"Creado por", key: 'created_user_id', order:false },
      { title:"Actualizado por", key: 'updated_user_id', order:false },
    ];
}
