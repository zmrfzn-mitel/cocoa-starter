import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppModel, AppList, supportedLanguages } from './app-info';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  supportedLanguages = supportedLanguages;
  appList = AppList;

  constructor(
    
  ) { }

  
  getSupportedLanguages(): any[] {
    return (this.supportedLanguages);
  }

  getLangCodes(): string[] {
    const langCodes: string[] = [];
    for (const lang of this.supportedLanguages) {
      langCodes.push(lang.langCode);
    }
    return langCodes;
  }
}
