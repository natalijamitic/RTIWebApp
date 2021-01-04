import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { NotificationComponent } from './notification/notification.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResearchProjectsComponent } from './research-projects/research-projects.component';
import { ResearchComponent } from './research/research.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'obavestenja',
    component: NotificationComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  },
  {
    path: 'projekti',
    component: ProjectsComponent
  },
  {
    path: 'nauka/istrazivanja',
    component: ResearchComponent
  },
  {
    path: 'nauka/projekti',
    component: ResearchProjectsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
