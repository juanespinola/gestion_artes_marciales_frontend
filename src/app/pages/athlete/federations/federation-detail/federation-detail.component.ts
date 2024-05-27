import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../component/material.module';
import { HeaderComponent } from '../../component/header/header.component';
import { ApiService } from '../../../../utils/api.service';


@Component({
  selector: 'app-federation-detail',
  standalone: true,
  imports: [
    MaterialModule,
    RouterOutlet,  
    HeaderComponent,
  ],
  templateUrl: './federation-detail.component.html',
  styleUrl: './federation-detail.component.scss'
})
export class FederationDetailComponent {
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
