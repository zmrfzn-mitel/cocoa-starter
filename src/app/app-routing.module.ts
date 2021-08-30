import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from '@app/test-component/test-component.component';
import { NavigationErrorComponent } from '@core/components/navigation-error/navigation-error.component';

export const routes: Routes = [
  { path: '', component: TestComponentComponent },
  { path: 'test', component: TestComponentComponent },
  { path: 'nav_error', component: NavigationErrorComponent },
  { path: '**', component: TestComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
