import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../admin/components/material.module';
import { CoreService } from '../../../../services/core.service';
import { ActivatedRoute, Route, Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../../../../services/session.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  options = this.settings.getOptions();
  federation_id: any;
  athlete: any;

  constructor(
    private settings: CoreService,
    private scroller: ViewportScroller,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {
    // this.federation_id = this.activatedRoute.snapshot.paramMap.get('federation_id')
    this.federation_id = history.state?.federation_id;
    this.athlete = this.sessionService.getUser()
    
  }

  navigateLoginAthlete(){
    this.router.navigate(['athlete', 'signin']);
  }


  goToEvents(){
    // this.router.navigate(['federations', this.federation_id, 'events'], {state: { federation_id: this.federation_id}})
    this.router.navigate(['events'], {state: { federation_id: this.federation_id }})
  }

  navigateProfileAthlete(athlete:any){
    // this.router.navigate(['athlete', 'sign-in']);
    console.log(athlete)
  }

}
