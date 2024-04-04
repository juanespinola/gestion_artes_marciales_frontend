import { Component } from '@angular/core';
import { ComponentsModule } from '../../components/components.module';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-association',
  standalone: true,
  imports: [ComponentsModule],
  templateUrl: './association.component.html',
  styleUrl: './association.component.scss'
})
export class AssociationComponent {
  collection:any = "association"
  headers = ['#', "Descripcion", "actions"];
  columns = [
      { title:"#", key: 'id', order: true },
      { title:"Descripcion", key: 'description', order:false }
    ];
}
