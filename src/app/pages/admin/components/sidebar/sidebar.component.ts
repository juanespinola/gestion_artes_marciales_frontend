import { MatListModule } from '@angular/material/list';
import { SessionService } from '../../../../services/session.service';
import { CommonModule } from '@angular/common';
import { NavService } from '../../../../services/nav.service';
import {
  Component,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavItem } from './nav-item/nav-item';
import { Router } from '@angular/router';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MaterialModule } from '../material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    TablerIconsModule,
    TranslateModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  navopt = this.navService.showClass;

  constructor(public navService: NavService) {}
  ngOnInit(){
    
    // console.log(JSON.parse(this.sessionService.getItem('user')!))
  }
}
