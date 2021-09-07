import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleRoutingModule } from './sample-routing.module';
import { SampleComponent } from './components/sample.component';
import { CoreModule } from '@app/core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomTranslateLoader } from '@core/services/translate-loader.service';


@NgModule({
  declarations: [
    SampleComponent
  ],
  imports: [
    CommonModule,
    SampleRoutingModule,
    CoreModule
  ]
})
export class SampleModule { }
