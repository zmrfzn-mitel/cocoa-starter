import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '@app/app-routing.module';
import { AppComponent } from '@app/components/app.component';
import { CoreModule } from '@core/core.module';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CustomTranslateLoader } from './core/services/translate-loader.service';
import { TestComponentComponent } from '@app/components/test-component/test-component.component';
import { CocoaModule } from '@mitel-internal/cocoa';
import { CocoaCuxModule } from '@mitel-internal/cocoa/cux';

declare var System: any;


@NgModule({
  declarations: [
    AppComponent,
    TestComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    }),
    CocoaModule,
    CocoaCuxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
