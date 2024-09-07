import { Component } from '@angular/core';
import { MaterialModule } from '../components/material.module';
import { ComponentsModule } from '../components/components.module';
import { UntypedFormBuilder } from '@angular/forms';
import { ApiService } from '../../../utils/api.service';
import { Router } from '@angular/router';
import { SessionService } from '../../../services/session.service';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [
    MaterialModule,
    ComponentsModule,
  ],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss'
})
export class RequestComponent {
  
  sidePanelOpened = true;
  public showSidebar = false;
  
  selectedCategory = 'all';
  searchText: string | null = null;
  requests: any = []
  user:any;
  typesrequest:any = [];
  copyData:any = [];


  constructor(public fb: UntypedFormBuilder,
    private apiService: ApiService,
    private router: Router,
    private sessionService: SessionService,
    private dialog: MatDialog
  ) {
    this.user = this.sessionService.getUser()
  }


  getAllRequest(){
    this.apiService.getData('requestautorization')
    .subscribe({
      next: (res:any) => {
        this.requests = res
        this.copyData = res
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  mobileSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }

  ngOnInit(): void {
    this.getAllRequest()
  }


  selectionlblClick(val: string): void {

    
    switch (val) {
      case "all":
        this.requests = this.copyData
      break;
      case "pendiente":
        this.requests = this.copyData.filter( (filter:any) => filter.status == 'pendiente')
      break;
      case "respuesta":
        this.requests = this.copyData.filter( (filter:any) => filter.status == 'respuesta')
      break;
      case "aprobado":
        this.requests = this.copyData.filter( (filter:any) => filter.status == 'aprobado')
      break;
      case "rechazado":
        this.requests = this.copyData.filter( (filter:any) => filter.status == 'rechazado')
      break;
    }
   
  }

  updateRequest(id:any): void {
    this.router.navigate(['admin','request','edit', id]);
  }

  deleteTodo(id: number): void {
    console.log(id);
    // this.todos.splice(id, 1);
  }

  remainingList(status:any) {
    return this.requests.filter((filter:any) => (filter.status == status)).length;
  }

  createRequestAutorization(){
    const dialogRef = this.dialog.open(RequestDialogComponent, {
      data: {
        federation_id: this.user.federation_id,
        association_id: this.user.association_id,
        user_email: this.user.email,
      }
    })
    dialogRef.afterClosed()
      .subscribe((result: any) => {
        if (result.event == 'success') {
          this.getAllRequest()
        }
      })
  }



}
