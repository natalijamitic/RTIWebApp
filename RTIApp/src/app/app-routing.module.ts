import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { HomeComponent } from './home/home.component';
import { MasterComponent } from './master/master.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResearchProjectsComponent } from './research-projects/research-projects.component';
import { ResearchComponent } from './research/research.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'korisnici',
    component: UsersComponent
  },
  {
    path: 'registracija',
    component: RegistrationComponent
  },
  {
    path: 'profil',
    component: ProfileComponent,
  },
  {
    path: 'zaposlen',
    component: EmployeeComponent,
  },
  {
    path: 'zaposleni',
    component: EmployeesComponent
  },
  {
    path: 'obavestenja',
    component: NotificationComponent
  },
  {
    path: 'predmeti/:dept',
    component: MasterComponent
  },
  {
    path: 'projekti',
    component: ProjectsComponent
  },
  {
    path: 'nauka/projekti',
    component: ResearchProjectsComponent
  },
  {
    path: 'nauka/istrazivanja',
    component: ResearchComponent
  },
  {
    path: 'nauka/projekti',
    component: ResearchProjectsComponent
  },
  {
    path: 'kontakt',
    component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
