import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationMainComponent } from './navigation-main/navigation-main.component';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './Services/Authentication/AuthenticationInterceptor';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './Services/Notification/notification.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';
@NgModule({
  declarations: [             //  all personal components
    AppComponent, ContactComponent, HomeComponent, LoginComponent, RegisterComponent, NavigationMainComponent, NotificationComponent, NotificationCardComponent
  ],
  imports: [                  //  foreign import components
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    AuthenticationService,
    NotificationService
],              //  services
  bootstrap: [AppComponent]   //  main component
})
export class AppModule { }
