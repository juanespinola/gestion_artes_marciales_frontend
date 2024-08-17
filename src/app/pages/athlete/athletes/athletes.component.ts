import { Component } from '@angular/core';
import { MaterialModule } from '../component/material.module';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-athletes',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './athletes.component.html',
  styleUrl: './athletes.component.scss'
})
export class AthletesComponent {

  athletes:any = []
  constructor(
    private apiService: ApiService, 
    private router: Router,){  
  }

  ngOnInit(): void {
    this.getAthletesWinLose()
  }

  getAthletesWinLose(){
    this.apiService.getData('athleteswinlose')
    .subscribe({
      next: (res:any) => {
        // console.log(res)
        this.athletes = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });

  }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.athletes = this.filter(filterValue);
  }

  filter(v: string) {
    return this.athletes
      .filter(
        (x:any) => x.name.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
  }


  getAthleteProfile(id:any){
    this.router.navigate(["athletes","profile", id]);
  }
}
