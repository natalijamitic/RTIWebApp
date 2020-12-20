import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [             //  all personal components
    AppComponent
  ],
  imports: [                  //  foreign import components
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],              //  services
  bootstrap: [AppComponent]   //  main component
})
export class AppModule { }
