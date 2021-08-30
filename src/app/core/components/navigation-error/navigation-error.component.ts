import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-error',
  templateUrl: './navigation-error.component.html',
  styleUrls: ['./navigation-error.component.scss']
})
export class NavigationErrorComponent implements OnInit, OnDestroy {
  @Input() errorNum = '';

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.route.queryParams.subscribe((params) => {
      this.errorNum = params.nav_error || this.errorNum;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
