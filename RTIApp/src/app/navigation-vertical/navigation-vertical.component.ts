import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'navigation-vertical',
  templateUrl: './navigation-vertical.component.html',
  styleUrls: ['./navigation-vertical.component.scss']
})
export class NavigationVerticalComponent implements OnInit, OnDestroy {

  public user: any = null;
  public subscription: Subscription;
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
