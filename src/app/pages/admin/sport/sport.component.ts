import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { SportFormComponent } from './sport-form/sport-form.component';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [ComponentsModule, SportFormComponent],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss'
})
export class SportComponent {

  collection:any = "sport"
  headers = ['#', "Descripcion", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false }
    ];

}
