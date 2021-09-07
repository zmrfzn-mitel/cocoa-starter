import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TestComponentComponent } from '@app/components/test-component/test-component.component';
import { NavigationErrorComponent } from '@core/components/navigation-error/navigation-error.component';

export const routes: Routes = [
  { path: '', component: TestComponentComponent },
  { path: 'test', component: TestComponentComponent },
  { path: 'navigationError', component: NavigationErrorComponent },
  { path: 'sample', loadChildren: () => import('./modules/sample/sample.module').then(m => m.SampleModule) },
  { path: '**', component: TestComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { useHash: true, preloadingStrategy: PreloadAllModules,relativeLinkResolution: 'legacy' }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
