import { Component, OnInit } from '@angular/core';
import { langService } from '@core/services/translate-loader.service';
import { CocoaCore } from '@mitel-internal/cocoa';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import  manifest from '../cocoa-manifest.json';
@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})
export class SampleComponent implements OnInit {
  subscriptions: Subscription[] = [];
  translationsComplete: boolean;

  constructor(
    public translateSvc: TranslateService,
    private customLang: langService,
    private cocoa: CocoaCore
    ) {
      this.cocoa.register(manifest);
     }

  async ngOnInit(): Promise<void> {
    this.translateSvc.use('/sample');
    this.subscriptions.push(this.customLang.changeLang.subscribe(lang => {
      this.translateSvc.use(lang + '/sample');
    }));
    await this.translateSvc.get('sample').toPromise();
    this.translationsComplete = true;
  }

  onLinkClick(event) {
    this.cocoa.messageBus.send('sample-firstEvent', { data: 'btnClickedFromSample' });
  }

}
