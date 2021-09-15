import { Component, OnInit } from '@angular/core';
import { ClHeaderComponent } from '@mitel/cloudlink-console-components';
import { Account, Claims, UserClaims } from '@mitel/cloudlink-sdk';
import { Router } from '@angular/router';

import { environment } from '@env/environment';
import { AuthService } from '@core/services/authentication.service';
import { Logger } from '@core/services/logger.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { navItems, supportedLanguages } from '@app/constants/appInfo';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { langService, userLangPreference } from '../core/services/translate-loader.service';
import { AppInfoService } from '../services/app-info.service';
import { CocoaCore } from '@mitel-internal/cocoa';

import manifest from '../cocoa-manifest.json';

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
  subscriptions: Subscription[] = [];
  selectedLangCode: string;
  constructor(
    private authSvc: AuthService,
    private clHeader: ClHeaderComponent,
    private router: Router,
    private translateSvc: TranslateService,
    private langSvc: langService,
    private appInfoService: AppInfoService,
    private userLang: userLangPreference,
    private cocoa: CocoaCore
  ) {
    // Register manifest to cocoa.
    this.cocoa.register(manifest);
  }

  ngOnInit(): void {
    ({ appName: this.appName, cloud: this.cloudEnv } = environment);
    this.clHeader.setClientId(environment.clientId);
    this.languages = supportedLanguages;
    this.navItems = navItems;
    this.subscriptions.push(
      this.translateSvc.onLangChange.subscribe((event: LangChangeEvent) => {
        if (event.lang && this.selectedLangCode !== event.lang) {
          this.userLang.setUserLanguage(event.lang);
          this.selectedLangCode = event.lang;
          this.langSvc.changeLanguage(event.lang);
          this.setTranslatedMenuLabels();
        }
      }),
      this.cocoa.messageBus.listen('appEvent1').subscribe(
        message => alert(`message received in app. message:${message.data}`)
      )
    );
  }


  async handleUserClaims(claims: UserClaims): Promise<void> {
    if (claims) {
      this.setupTranslationService();
      try {
        const session = sessionStorage.getItem('just-logged-in') || false;
        if (!session) {
          this.authSvc.refresh();
        }
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

  setupTranslationService() {
    this.languages = this.getLanguages();
    const langRegex = new RegExp(
      this.appInfoService.getLangCodes().join('|') + '|' +
      this.appInfoService.getLangCodes().toString().split('-').toString().split(',').join('|'),
      'gi'
    );
    this.translateSvc.addLangs(this.appInfoService.getLangCodes());
    const browserLang = this.translateSvc.getBrowserCultureLang();
    let userLang: string = localStorage.getItem('userLangPreference');
    if (!userLang && userLang.startsWith('en')) {
      this.selectedLangCode = (browserLang.match(langRegex) ? browserLang : 'en-US');
    } else if (!userLang.startsWith('en')) {
      this.selectedLangCode = userLang.split('-')[0] + '/';
      //this.userLang.setUserLanguage(languageCode);
    } else {
      this.selectedLangCode = userLang ? userLang : (browserLang.match(langRegex) ? browserLang : 'en-US');
    }
    this.translateSvc.use(this.selectedLangCode);
  }

  getLanguages(): any[] {
    return (this.appInfoService.getSupportedLanguages());
  }

  setTranslatedMenuLabels() {
    let navItem, child;
    for (navItem of this.navItems) {
      const key = 'menu_items.' + navItem.translationKey;
      navItem.name = this.translateSvc.instant(key);
      if (navItem.children !== undefined && navItem.children.length > 0) {
        for (child of navItem.children) {
          const childkey = 'menu_items.' + child.translationKey;
          child.name = this.translateSvc.instant(childkey);
        }
      }
    }
  }

  goHomePage(): void {
    const returnUrl = sessionStorage.getItem('current-url');
    if (returnUrl) {
      this.router.navigate([returnUrl]);
    } else {
      log.info('Navigating to home');
      this.router.navigateByUrl('/');
    }
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

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
