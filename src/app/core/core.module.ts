import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/authentication.service';
import { AuthenticationService } from '@mitel/cloudlink-sdk';
import { ClConsoleComponentsModule, ClHeaderComponent, ClSideNavComponent } from '@mitel/cloudlink-console-components';
import { NavigationErrorComponent } from '@core/components/navigation-error/navigation-error.component';
import { TranslateModule, TranslateLoader, TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { CustomTranslateLoader } from './services/translate-loader.service';


@NgModule({
  declarations: [
    NavigationErrorComponent
  ],
  imports: [
    CommonModule,
    ClConsoleComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    })
  ],
  providers: [
    AuthService,
    AuthenticationService,
    ClHeaderComponent,
    ClSideNavComponent
  ],
  exports: [
    ClHeaderComponent,
    ClSideNavComponent,
    NavigationErrorComponent
  ]
})
export class CoreModule { }
