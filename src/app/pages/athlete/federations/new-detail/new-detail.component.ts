import { Component } from '@angular/core';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from '../../component/material.module';
import moment from 'moment';

@Component({
  selector: 'app-new-detail',
  standalone: true,
  imports: [
    MaterialModule,
  ],
  templateUrl: './new-detail.component.html',
  styleUrl: './new-detail.component.scss'
})
export class NewDetailComponent {
  new: any = [];
  new_id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ){    
    this.new_id = this.activatedRoute.snapshot.paramMap.get('new_id')
    this.getNew()
  }


  getNew(){
    this.apiService.getData(`news/${this.new_id}/newdetail`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.new = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  formatDate(dateNew: any) : any {
    return moment(dateNew).format('L');
  }
}
