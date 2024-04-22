import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ViewportScroller } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../components/material.module';
import { CoreService } from '../../../../services/core.service';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

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

  constructor(
    private settings: CoreService,
    private scroller: ViewportScroller,
    private activatedRoute: ActivatedRoute
  ) {
    this.federation_id = this.activatedRoute.snapshot.paramMap.get('federation_id')
  }

  loginFederation(){
    console.log('hacemos redir a federacion', this.federation_id)
  }
}
