import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { NewFormComponent } from './new-form/new-form.component';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    ComponentsModule,
    NewFormComponent
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent {
  collection:any = "new"
  headers = ['#', "Titulo", "Estado", "actions"];
  columns = [
    { title:"#", key: 'id', order: true },
    { title:"Titulo", key: 'title', order:false },
    { title:"Estado", key: 'status', order:false }
  ];
}
