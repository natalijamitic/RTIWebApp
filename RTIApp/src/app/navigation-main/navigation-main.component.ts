import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'navigation-main',
  templateUrl: './navigation-main.component.html',
  styleUrls: ['./navigation-main.component.scss']
})
export class NavigationMainComponent implements OnInit, OnDestroy {

  public user: any = null;
  public subscription: Subscription;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscription = this.authService.isLoggedIn.subscribe((user: any) => {
      this.user = JSON.parse(user);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();}
  }

}
