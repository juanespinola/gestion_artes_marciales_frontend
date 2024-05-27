import { Component } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { LocationFormComponent } from './location-form/location-form.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [
    ComponentsModule,
    LocationFormComponent
  ],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {
  collection:any = "location"
  headers = [
    '#', 
    "Descripcion", 
    "Ciudad", 
    "Pais", 
    "Direccion", 
    "actions"
  ];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false },
      { title:"Ciudad", key: 'city_id', order:false },
      { title:"Pais", key: 'city_id', order:false },
      { title:"Direccion", key: 'address', order:false },
    ];
}
