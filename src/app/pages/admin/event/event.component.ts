import { Component, ViewChild } from '@angular/core';
import { ComponentsModule } from '../components/components.module';
import { EventFormComponent } from './event-form/event-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { AlertsService } from '../../../services/alerts.service';
import { DeleteDialogComponent } from '../components/dialogs/delete-dialog/delete-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../components/material.module';
import { APP_ROUTES } from '../../../routes';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
    EventFormComponent
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  collection:any = ""
  headers: any[] = [];
  filters: any[] = [];
  // columns = [
  //     { title:"#", key: 'id', order: true },
  //     { title:"Descripcion", key: 'description', order:false },
  //     { title:"Locacion", key: 'location.description', order:false },
  //     { title:"Fecha Inicial", key: 'initial_date', order:false },
  //     { title:"Fecha Final", key: 'final_date', order:false },
  //     { title:"Tipo Evento", key: 'type_event_id', order:false },
  //     { title:"Estado Evento", key: 'status_event_id', order:false },
  //     { title:"Costo de Inscripcion", key: 'inscription_fee', order:false },
  //     { title:"Total Participantes", key: 'total_participants', order:false },
  //     { title:"Cupos Disponibles", key: 'available_slots', order:false },
  //     { title:"Creado por", key: 'created_user_id', order:false },
  //     { title:"Actualizado por", key: 'updated_user_id', order:false },
  //   ];

  elements:any;
  dataSource: any;

  constructor(
    public dialog: MatDialog, 
    private apiService: ApiService,
    private route: Router,
    private alertsService: AlertsService
    ){
      this.collection = "event"
    
      this.headers = [
        '#', 
        "description", 
        "initial_date", 
        "final_date",  
        "actions"
      ];
    }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

    ngAfterViewInit() {
      this.getAll()
    }

    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    updateAction(id:any): void {
      console.log(id)
      this.route.navigate(["admin","event","edit", id]);
    }

    deleteAction(id:any): void {
      const dialogRef = this.dialog.open(DeleteDialogComponent)
      dialogRef.afterClosed()
        .subscribe((result: any) => {
          if (result.event === 'success') {
            this.apiService.deleteData(this.collection, id)
              .subscribe({
                next: (res: any) => {
                  this.dataSource.data = this.dataSource.data.filter((value: any) => value.id !== id);
                  this.alertsService.showAlert("Correcto!", res.messages, 'success')
                },
                error: (error) => {
                  console.log(error)
                  this.alertsService.showAlert("Error!", error.statusText, 'error')
                }
              })
          }
        })
    }

    createAction(): void {
      this.route.navigate(["admin","event","add"]);
    }
    

    getAll() {
      this.apiService.getData(this.collection)
      .subscribe({
        next:(res:any) => {
          console.log(res)
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error:(error) => {
          console.log(error)
          this.alertsService.showAlert("Error!", error.statusText, 'error')
        }
      });
    }

    categoryAction(id:any): void {
      this.route.navigate(["admin","event","edit", id, APP_ROUTES.ENTRY_CATEGORIES]);
    }

    athletesRegistrationAction(id:any): void {
      this.route.navigate(["admin","event","edit", id, APP_ROUTES.ATHLETE_INSCRIPTIONS]);
    }

    



}
