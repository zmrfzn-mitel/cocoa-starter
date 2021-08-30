/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NavigationErrorComponent } from './navigation-error.component';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Data, Params} from '@angular/router';
import {Subject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class FakeLoader {
}

describe('NavigationErrorComponent', () => {
  let component: NavigationErrorComponent;
  let fixture: ComponentFixture<NavigationErrorComponent>;
  let mockRoute: any = { snapshot: {}};  

  mockRoute.parent = { params: new Subject<any>()};
  mockRoute.params = new Subject<any>();
  mockRoute.queryParams = new Subject<any>();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationErrorComponent ],
      providers: [TranslateService,
        {provide: ActivatedRoute, useValue: mockRoute}],
      imports: [HttpClientTestingModule,
        TranslateModule.forRoot({
        loader: {provide: TranslateLoader, useClass: FakeLoader},
      }),
      RouterTestingModule.withRoutes([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    mockRoute.parent.params.next({paramName: 10});
    mockRoute.params.next({paramName: 'test'});
    expect(component).toBeTruthy();
  });

  it('should update error number', () => {
    const activatedRoute = TestBed.get(ActivatedRoute);

    component.errorNum = '404';
    activatedRoute.queryParams.next({});
    expect(component.errorNum).toBe('404');

    activatedRoute.queryParams.next({nav_error: '500'});
    expect(component.errorNum).toBe('500');
  });
});
