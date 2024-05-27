import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventFormEntryCategoriesComponent } from './event-form-entry-categories/event-form-entry-categories.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { DeleteDialogComponent } from '../../components/dialogs/delete-dialog/delete-dialog.component';
import { AlertsService } from '../../../../services/alerts.service';

@Component({
  selector: 'app-event-list-entry-categories',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './event-list-entry-categories.component.html',
  styleUrl: './event-list-entry-categories.component.scss'
})
export class EventListEntryCategoriesComponent {

  collection = "entrycategories"
  entriescategories:any = [];
  entry:any = [];

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private alertsService: AlertsService
  ) { }

  ngOnInit() {
    this.getEntriesCategories()
  }


  getEntriesCategories(){
    this.apiService.getData(this.collection)
    .subscribe({
      next: (res:any) => {
        console.log( res )
        this.entriescategories = res;
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  // crear modal para agregar una category entry
  openDialog(action: string, obj: any): void {
    obj.action = action;
    obj.event_id = this.route.snapshot.params['id']
    const dialogRef = this.dialog.open(EventFormEntryCategoriesComponent, {
      data: obj,
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if (result.event === 'add') {
        this.getEntriesCategories()
      } else if (result.event === 'update') {
        this.getEntriesCategories()
      } 
    });
  }

  deleteAction(id:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent)
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event === 'success') {
          this.apiService.deleteData(this.collection, id)
            .subscribe({
              next: (res: any) => {
                this.getEntriesCategories()
                this.alertsService.showAlert("Correcto!", res.messages, 'success')
              },
              error: (error) => {
                
                this.alertsService.showAlert("Error!", error.statusText, 'error')
              }
            })
        }
      })
  }


  navigateClasses(entrycategory:any): void {
    this.router.navigate(["admin","event","edit", entrycategory.event_id, 'entrycategories', entrycategory.id ,'classcategories']);
  }


  asArray(array: any): any {
    return array
  }
}
