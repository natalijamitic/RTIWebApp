import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IUser } from './registration/registration.component';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rtiApp';

  loggedInUser: IUser;

  constructor(private router: Router,
    private authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.router.url);
    this.authService.isLoggedIn.subscribe((user) => {
      this.loggedInUser = JSON.parse(user);
      console.log(this.router.url);
    })

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log("AL(OO")
        console.log(event)
        let forbid: boolean = false;
        switch (event.url) {
          case "/korisnici":
          case "/planangazovanja":
          case "/korisnici/registracija":
          case "/korisnici/obrada/admin":
          case "/korisnici/obrada/zaposlen":
          case "/korisnici/obrada/student":
          case "/profil/obrada/admin":
          case "/admin/obavestenja/pregled":
          case "/admin/obavestenja/tipovi":
            if (!this.loggedInUser || this.loggedInUser.type != 'admin') {
              forbid = true;
            }
            break;

          case "/profil":
            if (!this.loggedInUser) {
              forbid = true;
            }
            break;

          case "/registracija":
            if (this.loggedInUser) {
              forbid = true;
            }
            break;

          case "/profil/obrada/zaposlen":
            if (!this.loggedInUser || this.loggedInUser.type != 'zaposlen') {
              forbid = true;
            }
            break;
          case "/profil/obrada/student":
            if (!this.loggedInUser || this.loggedInUser.type != 'student') {
              forbid = true;
            }
            break;

          default:
            break;
        }

        if (forbid) {
          console.log("FORBID")
          this.router.navigate(["error"]);
        }
      });
  }

  n
}
