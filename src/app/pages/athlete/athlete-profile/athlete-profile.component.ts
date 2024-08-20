import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../../../utils/api.service';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from '../component/material.module';
import moment from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-athlete-profile',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './athlete-profile.component.html',
  styleUrl: './athlete-profile.component.scss'
})
export class AthleteProfileComponent {

  athlete:any
  athlete_id:any;
  dataSource: any;
  headers: any[] = [];
  event_id:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ){
    this.athlete_id = this.activatedRoute.snapshot.paramMap.get('athlete_id')
    this.headers = ["#"];
  }

  ngOnInit(){
    this.getAthleteProfileWinLose()
  }


  getAthleteProfileWinLose(){
    this.apiService.getData(`athleteprofilewinlose/${this.athlete_id}`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
        this.athlete = res
        this.dataSource = new MatTableDataSource(res.inscriptions)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.log(err),
      complete: () => {}
    });

  }

  getAthleteEventMatchWinLoseInformation(){
    this.apiService.getData(`athleteeventmatchwinlose/${this.athlete_id}`)
    .subscribe({
      next: (res:any) => {
        console.log(res)
      },
      error: (err) => console.log(err),
      complete: () => {}
    })
  }

  getAge(birthdate: any) : any {
    return moment().diff(birthdate, 'years')
  }

}
