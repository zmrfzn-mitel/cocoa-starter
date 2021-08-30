import { Injectable, Output, EventEmitter } from '@angular/core';

import { Observable, from, Subject } from 'rxjs';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AppInfoService } from './app-info.service';

import * as _ from 'lodash';

export class CustomTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    let langWithModulePath = lang.split("/");
    let modulePath;

    if (langWithModulePath[1]) {
      modulePath = langWithModulePath[1];
    }

    if (langWithModulePath[0]) {
      lang = langWithModulePath[0];
    } else {
      lang = localStorage.getItem('userLangPreference') ? localStorage.getItem('userLangPreference') : navigator.language;
    }

    switch(lang) {
      case 'en':
      case 'en-US':
        lang = 'en-US';
        break;
      case 'en-GB':
        lang = 'en-GB';
          break;
      case 'de':
      case 'de-DE':
        lang = 'de-DE';
        break;
      case 'fr':
      case 'fr-FR':
        lang = 'fr-FR';
        break;
      default:
        lang = 'en-US';
    }

    let files = [
      import(`../../assets/cl-console-components/i18n/${lang}.json`),
      import(`../../assets/i18n/${lang}.json`)
    ];

    if (modulePath) {
      files.push(import(`../${modulePath}/assets/i18n/${lang}.json`));
    }

    return from(Promise.all( files ).then( values => {
      return  _.merge(...values);
    }));
  }
}

@Injectable({
  providedIn: 'root'
})
export class langService {
  changeLang: Subject<any>;

  constructor() {
    this.changeLang = new Subject<any>();
  }

  changeLanguage(lang: string) {
    this.changeLang.next(lang);
  }
}

@Injectable({
  providedIn: 'root'
})
export class userLangPreference {
  constructor(
    private appInfoService: AppInfoService,
    private translateSvc: TranslateService
    ) {
    
  }
  setUserLanguage(lang: string) {
    let langWithModulePath = lang.split("/");
    if (langWithModulePath[0]) {
      lang = langWithModulePath[0];
    }
    lang = this.formatLocale(lang);
    localStorage.setItem('userLangPreference', lang);
  }
  
  getUserLanguage() {
    return localStorage.getItem('userLangPreference');
  }

  getLocale() {
    const langRegex = new RegExp(
      this.appInfoService.getLangCodes().join('|') + '|' + 
      this.appInfoService.getLangCodes().toString().split('-').toString().split(',').join('|'),
      'gi'
    );
    this.translateSvc.addLangs(this.appInfoService.getLangCodes());
    let browserLang = this.translateSvc.getBrowserCultureLang();
    let userLang = this.getUserLanguage();
    if (userLang) {
      return this.formatLocale(userLang);
    } else {
      return this.formatLocale(browserLang.match(langRegex) ? browserLang : 'en-US');
    }
  }

  formatLocale(lang:string) {
    switch(lang) {
      case 'en':
      case 'en-US':
        return lang = 'en-US';
      case 'en-GB':
        return lang = 'en-GB';
      case 'de':
      case 'de-DE':
        return lang = 'de-DE';
      case 'fr':
      case 'fr-FR':
        return lang = 'fr-FR';
      default:
        return lang = 'en-US';
    }
  }

  getLanguagePrefix() {
    let selectedLang = this.getLocale();
    if(selectedLang){
      selectedLang = selectedLang.split('-')[0]
    }
    return selectedLang;
  }
}