import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/services/auth-guard.guard';
import { SampleComponent } from './components/sample.component';

const routes: Routes = [
  {
    path: '',
    component: SampleComponent,
    canActivate:[AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
