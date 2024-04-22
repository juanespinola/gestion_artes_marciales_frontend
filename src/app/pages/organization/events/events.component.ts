import { Component } from '@angular/core';
import { MaterialModule } from '../../../components/material.module';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    
  }

  ngOnInit() {

    // necesitas traer el id de la federacion y luego cargar los eventos de la federacion
    // tambien si podes, filtrar por aca federacion y asociacion que se seleccione
    // fuerza kp
    this.activatedRoute.params
    .subscribe((param: any) => {
      console.log(param)
    })
    
  }
}
