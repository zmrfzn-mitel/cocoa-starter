import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/services/authentication.service';
import { AuthenticationService } from '@mitel/cloudlink-sdk';
import { ClConsoleComponentsModule, ClHeaderComponent, ClSideNavComponent } from '@mitel/cloudlink-console-components';
import { NavigationErrorComponent } from '@core/components/navigation-error/navigation-error.component';



@NgModule({
  declarations: [
    NavigationErrorComponent
  ],
  imports: [
    CommonModule,
    ClConsoleComponentsModule
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
