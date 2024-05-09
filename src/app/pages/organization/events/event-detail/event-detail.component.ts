import { Component } from '@angular/core';
import { MaterialModule } from '../../../../components/material.module';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss'
})
export class EventDetailComponent {

}
