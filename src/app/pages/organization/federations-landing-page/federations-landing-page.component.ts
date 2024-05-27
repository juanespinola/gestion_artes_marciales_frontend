import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../admin/components/material.module';
import { ApiService } from '../../../utils/api.service';

@Component({
  selector: 'app-federations-landing-page',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,  
    HeaderComponent,
  ],
  templateUrl: './federations-landing-page.component.html',
  styleUrl: './federations-landing-page.component.scss'
})
export class FederationsLandingPageComponent {
  federation_id: any;
  federation: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ){
    this.federation_id = this.activatedRoute.snapshot.paramMap.get('federation_id')
    this.getFederation()
  }

  getFederation(){
    this.apiService.getData(`federations/${this.federation_id}`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.federation = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }
}
