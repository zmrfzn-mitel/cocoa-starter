import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ClConsoleComponentsModule,
  ClHeaderComponent
} from '@mitel/cloudlink-console-components';
import { AuthenticationService } from '@mitel/cloudlink-sdk';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/authentication.service';

declare var System: any;


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ClConsoleComponentsModule,
  ],
  providers: [
    ClHeaderComponent,
    AuthService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
