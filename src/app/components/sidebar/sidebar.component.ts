import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(private sessionService: SessionService) {}
  permissions: any;
  ngOnInit(){
    this.permissions = JSON.parse(this.sessionService.getItem('user')!).permissions
  }
}
