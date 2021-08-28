import { Component, OnInit } from '@angular/core';
import { ClHeaderComponent } from '@mitel/cloudlink-console-components';
import { Account, Claims, UserClaims } from '@mitel/cloudlink-sdk';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { AuthService } from './services/authentication.service';
import { Logger } from '@app/services/logger.service';
import { BehaviorSubject } from 'rxjs';

const log = new Logger('AppComponent');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cocoa-starter';
  appName: string;
  cloudEnv: string;
  claims: Claims;
  company: Account;
  claimsReceivedAndProcessed: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private authSvc: AuthService,
    private clHeader: ClHeaderComponent,
    private router: Router,
  ) { }

  ngOnInit(): void {
    ({ appName: this.appName, cloud: this.cloudEnv } = environment);
    this.clHeader.setClientId(environment.clientId);
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
        }
      });
    }

  }

  goHomePage(): void {
    this.router.navigateByUrl('/');
  }

  onCompanyUpdated(company: Account): void {
    this.company = company;
    this.claimsReceivedAndProcessed.next(true);
    this.authSvc.setCompany(company);

  }
}
