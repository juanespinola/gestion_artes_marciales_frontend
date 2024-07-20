import { Component } from '@angular/core';
import { MaterialModule } from '../../component/material.module';
import { ApiService } from '../../../../utils/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../services/alerts.service';
import { EventBracketComponent } from '../event-bracket/event-bracket.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-event-schedules',
  standalone: true,
  imports: [
    MaterialModule,
    EventBracketComponent
  ],
  templateUrl: './event-schedules.component.html',
  styleUrl: './event-schedules.component.scss'
})
export class EventSchedulesComponent {

  entriescategories: any = [];
  event_id: any;
  
  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertsService: AlertsService,
    private dialog : MatDialog
  ){
    this.event_id = this.activatedRoute.snapshot.paramMap.get('event_id')

  
  }

  ngAfterViewInit() {
    this.getEntryCategories()
  }


  getSubKeys(key: any): any {
    return key;
  }

  getEntryCategories() {
    this.apiService.getData(`events/${this.event_id}/registered`)
    .subscribe({
      next:(res:any) => {
        // console.log(res)
        this.entriescategories = res;
      },
      error:(error:any) => {
        console.log(error)
        this.alertsService.showAlert("Error!", error.statusText, 'error')
      }
    });
  }

  matchBrackets(entry_category_id:any){
    const dialogRef = this.dialog.open(EventBracketComponent, {
      data: {
        entry_category_id,
        event_id:this.event_id
      }
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        // if (result.event == 'success') {
        //   this.getAll();
        // }
      })
  }

}
