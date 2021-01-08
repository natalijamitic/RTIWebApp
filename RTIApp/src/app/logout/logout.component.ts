import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

}
