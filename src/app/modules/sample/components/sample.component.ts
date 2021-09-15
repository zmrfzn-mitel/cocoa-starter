import { Component, OnInit } from '@angular/core';
import { langService, userLangPreference } from '@core/services/translate-loader.service';
import { CocoaCore } from '@mitel-internal/cocoa';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import manifest from '../cocoa-manifest.json';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  subscriptions: Subscription[] = [];;

  constructor(
    public translateSvc: TranslateService,
    private customLang: langService,
    private cocoa: CocoaCore,
    private userLangPreference: userLangPreference
  ) {
    this.cocoa.register(manifest);
  }

  ngOnInit() {
    this.translateSvc.use(this.userLangPreference.getLocale() + '/sample');
    this.subscriptions.push(this.customLang.changeLang.subscribe(lang => {
      this.translateSvc.use(lang + '/sample');
    }));
  }

}
