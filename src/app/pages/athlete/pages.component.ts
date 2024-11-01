import { ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { filter } from 'rxjs/operators';
import { MaterialModule } from '../admin/components/material.module';
import { AppSettings } from '../../app.config';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { CoreService } from '../../services/core.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavService } from '../../services/nav.service';
import { navItems } from '../admin/components/sidebar/sidebar-pages';
import { ComponentsModule } from './component/components.module';
import { MinorAuthorizationDialogComponent } from './minor-authorization/minor-authorization-dialog/minor-authorization-dialog.component';
import { ApiService } from '../../utils/api.service';
import { MatDialog } from '@angular/material/dialog';


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
    NgScrollbarModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  encapsulation: ViewEncapsulation.None
})

export class PagesComponent {
  navItems = navItems;

  @ViewChild('leftsidenav')
  public sidenav: MatSidenav;
  resView = false;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;
  //get options from service
  options = this.settings.getOptions();
  private layoutChangesSubscription = Subscription.EMPTY;
  private isMobileScreen = false;
  private isContentWidthFixed = true;
  private isCollapsedWidthFixed = false;
  private htmlElement!: HTMLHtmlElement;

  athlete:any;
  federation_id:any;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  get isTablet(): boolean {
    return this.resView;
  }

  constructor(
    private settings: CoreService,
    private mediaMatcher: MediaMatcher,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private dialog: MatDialog,
  ) {
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

    // This is for scroll to top
    this.router.events
      .pipe(filter((event:any) => event instanceof NavigationEnd))
      .subscribe((e) => {
        this.content.scrollTo({ top: 0 });
      });
      // this.sessionService.isAuthenticated();
    this.athlete = this.sessionService.getUser();
    
    
    
  }

  ngOnInit(): void {
    this.activatedRoute.firstChild?.paramMap.subscribe(params => {
      this.federation_id = params.get('federation_id') ? params.get('federation_id') : history?.state.federation_id
    })

    let listaRutas:any = ['profile', 'registerevent'];
    let rutas = this.router.url.split("/")
    if(listaRutas.includes(rutas.at(-1))){
      this.openMinorAuthorizationDialog()
    }
  }

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

  goToEvents(){
    // this.router.navigate(['federations', this.federation_id, 'events'], {state: { federation_id: this.federation_id}})
    this.router.navigate(['events'], {state: { federation_id: this.federation_id }})
  }

  goToRanking(){
    this.router.navigate(['events'], {state: { federation_id: this.federation_id }})
  }

  goToListAthletes(){
    this.router.navigate(['events'], {state: { federation_id: this.federation_id }})
  }

  openMinorAuthorizationDialog() {
    this.apiService.getData("athlete/minor_authorization")
    .subscribe((res:any) => {
      console.log(res)

      if(!res.minor_verified) {
        const dialogRef = this.dialog.open(MinorAuthorizationDialogComponent);
        dialogRef.afterClosed()
        .subscribe((result) => {
          if(result.event == 'success'){
            this.router.navigate(['minor_authorization'])
          }
        });
      }
    });
  }
}
