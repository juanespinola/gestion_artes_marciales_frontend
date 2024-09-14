import { Component } from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import { MaterialModule } from '../../admin/components/material.module';
import {  ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../component/header/header.component';


@Component({
  selector: 'app-federations',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,  
    HeaderComponent,
  ],
  templateUrl: './federations.component.html',
  styleUrl: './federations.component.scss'
})
export class FederationsComponent {
  
  constructor(
    private apiService: ApiService, 
    private router: Router){  
  }

  federations: any;

  ngOnInit() {
    this.getFederations()
  }

  getFederations(){
    this.apiService.getData('federations')
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.federations = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });

  }

  selectedFederation(federation_id: number) {
    // this.router.navigate(['/events', federation_id]);
    this.router.navigate(['federation', federation_id]);
  }

}
