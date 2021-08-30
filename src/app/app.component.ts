import { Component, OnInit } from '@angular/core';
import { ClHeaderComponent } from '@mitel/cloudlink-console-components';
import { Account, Claims, UserClaims } from '@mitel/cloudlink-sdk';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { AuthService } from '@core/services/authentication.service';
import { Logger } from '@core/services/logger.service';
import { BehaviorSubject } from 'rxjs';
import { navItems, supportedLanguages } from '@app/constants/appInfo';

const log = new Logger('AppComponent');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cocoa-starter';
  displayLoadingSpinner = false;
  appName: string;
  cloudEnv: string;
  claims: Claims;
  company: Account;
  claimsReceivedAndProcessed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  navItems: any[];
  menuClickCounter: number = 0;
  languages: any[];
  constructor(
    private authSvc: AuthService,
    private clHeader: ClHeaderComponent,
    private router: Router,
  ) { }

  ngOnInit(): void {
    ({ appName: this.appName, cloud: this.cloudEnv } = environment);
    this.clHeader.setClientId(environment.clientId);
    this.languages = supportedLanguages;
    this.navItems = navItems;
  }


  async handleUserClaims(claims: UserClaims): Promise<void> {
    if (claims) {
      try {

        this.authSvc.refresh();
        const state = await this.authSvc.setClaims(claims);
        this.claims = state.claims;

        // hack: this is a very subtle bug with the auth header.. it maintains state in a service
        // if we ever reload this component we get into a login loop
        // we wack the auth code after we handle valid claims
        const headerAuth = (this.clHeader.headerAuth as any);
        headerAuth.authCode = null;

      } catch (error) {
        log.warn('handleUserClaims() Error setting claims', error);
        this.authSvc.logout();
      }
    }
  }

  async handleAuthentication(url: string): Promise<void> {

    const urlParams = url.split('?');

    if (urlParams.length === 2) {
      const searchParams = new URLSearchParams(urlParams[1]);

      /**
       * Process new login with target for first login
       */
      this.claimsReceivedAndProcessed.subscribe(processed => {
        if (processed === true) {
          this.authSvc.setSession(this.company.accountId, true);
          this.goHomePage();
        }
      });
    }
    else {
      /**
       * Process new login with target for refresh
       */
      this.claimsReceivedAndProcessed.subscribe(processed => {
        if (processed === true) {
          const acountId = sessionStorage.getItem('accountId') || this.company.accountId;
          this.authSvc.setSession(acountId, false);
          this.goHomePage();
        }
      });
    }

  }

  goHomePage(): void {
    log.info('Navigating to home');
    this.router.navigateByUrl('/');
  }

  onMenuItemClicked(url: string): void {
    if (this.menuClickCounter++ < 1 && url === '/') {
      // The itemsClicked event fires when <cl-side-nav> initializes and again if AltRole changes.
      // Note: we always set altRole, so 2 initializing events.
      // Skip 1st event because we expect a 2nd when we set AltRole, causing the <cl-side-nav>
      // to fire it's itemsClicked event one more time.
      // Note: having a 2nd initilaizing itemsClicked event breaks the page refresh section below
      return;
    }
    if (url) {
      sessionStorage.setItem('current-url', url);
      this.router.navigateByUrl(url);
    }
  }

  onCompanyUpdated(company: Account): void {
    this.company = company;
    this.claimsReceivedAndProcessed.next(true);
    this.authSvc.setCompany(company);
  }

}
