import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { supportedLanguages } from '../constants/appInfo';

@Injectable({
  providedIn: 'root'
})
export class AppInfoService {

  supportedLanguages = supportedLanguages;

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
