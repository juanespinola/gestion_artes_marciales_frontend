import { Component } from '@angular/core';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  athlete:any 
  constructor(private sessionService: SessionService){
    this.athlete = this.sessionService.getUser();
  }
}
