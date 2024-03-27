import { ChangeDetectorRef, Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [    
    MatSidenavModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    RouterOutlet,  
    ComponentsModule  
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private sessionService: SessionService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
    
    this.sessionService.isAuthenticated()
  }

  ngOnInit() {
    
  }
}
