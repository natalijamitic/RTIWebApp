import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  // {
  //   path: 'home',
  //   component: AppComponent
  // },
  // {
  //   path: 'about',
  //   component: AppComponent
  // },
  // {
  //   path: 'courses',
  //   component: AppComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
