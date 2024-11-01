import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { SessionService } from '../../services/session.service';
import { MaterialModule } from './components/material.module';
import { AppSettings } from '../../app.config';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { CoreService } from '../../services/core.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavService } from '../../services/nav.service';
import { navItems } from './components/sidebar/sidebar-pages';


const MOBILE_VIEW = 'screen and (max-width: 768px)';
const TABLET_VIEW = 'screen and (min-width: 769px) and (max-width: 1024px)';
const MONITOR_VIEW = 'screen and (min-width: 1024px)';
const BELOWMONITOR = 'screen and (max-width: 1023px)';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [    
    RouterOutlet,  
    ComponentsModule,
    MaterialModule,
    NgScrollbarModule,

  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class PagesComponent {
  navItems = navItems;
  user: any;
  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  //get options from service
  options = this.settings.getOptions();
  navopt = this.navService.showClass;
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  constructor(
    private settings: CoreService,
    private navService: NavService,
    private breakpointObserver: BreakpointObserver,
    private sessionService: SessionService
  ) {
    this.sessionService.isAuthenticated()
    this.user = this.sessionService.getUser();

    this.htmlElement = document.querySelector('html')!;
    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_VIEW, TABLET_VIEW, MONITOR_VIEW, BELOWMONITOR])
      .subscribe((state) => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;
        this.isMobileScreen = state.breakpoints[BELOWMONITOR];

        if (this.options.sidenavCollapsed == false) {
          this.options.sidenavCollapsed = state.breakpoints[TABLET_VIEW];
        }
        this.isContentWidthFixed = state.breakpoints[MONITOR_VIEW];
        this.resView = state.breakpoints[BELOWMONITOR];
      });

    
    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  resetCollapsedState(timer = 400) {
    setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    this.settings.setOptions(this.options);
  }

  receiveOptions(options: AppSettings): void {
    this.options = options;
    this.toggleDarkTheme(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('dark-theme');
      this.htmlElement.classList.remove('light-theme');
    } else {
      this.htmlElement.classList.remove('dark-theme');
      this.htmlElement.classList.add('light-theme');
    }
  }
}
