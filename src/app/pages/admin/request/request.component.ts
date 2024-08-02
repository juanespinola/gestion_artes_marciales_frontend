import { Component } from '@angular/core';
import { MaterialModule } from '../components/material.module';
import { ComponentsModule } from '../components/components.module';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
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
    // this.inputFg = this.fb.group({
    //   mess: [],
    // });
  }


  allTodos(): void {
    // tslint:disable-next-line - Disables all
    // this.todos.forEach(
    //   (todo) => (todo.completionStatus = (<HTMLInputElement>event!.target).checked),
    // );
  }

  selectionlblClick(val: string): void {
    // if (val === 'all') {
    //   this.copyTodos = this.todos;
    //   this.selectedCategory = 'all';
    // } else if (val === 'uncomplete') {
    //   this.copyTodos = this.todos.filter((todo) => !todo.completionStatus);
    //   this.selectedCategory = 'uncomplete';
    // } else if (val === 'complete') {
    //   this.copyTodos = this.todos.filter((x) => x.completionStatus);
    //   this.selectedCategory = 'complete';
    // }
  }

  updateRequest(id:any): void {
    this.router.navigate(['admin','request','edit', id]);
  }

  deleteTodo(id: number): void {
    console.log(id);
    // this.todos.splice(id, 1);
  }

  remainingList() {
    // return this.todos.filter((todo) => !todo.completionStatus).length;
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
