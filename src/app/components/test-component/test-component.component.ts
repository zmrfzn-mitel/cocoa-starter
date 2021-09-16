import { Component, OnInit } from '@angular/core';
import { Logger } from '@core/services/logger.service';
import { CocoaCore } from '@mitel-internal/cocoa';
import { buttonTypeMaping } from '@mitel-internal/cocoa/cux';

const log = new Logger('AppComponent');

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {

  buttonType: string;
  constructor(private cocoa: CocoaCore) { }

  ngOnInit(): void {
    this.buttonType = 'info';
  }
  onBtnClick(event: any): void {
    log.info('appEvent1 logged');
  }

}
