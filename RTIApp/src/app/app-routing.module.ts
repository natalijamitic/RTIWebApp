import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AssignmentConfigurationComponent } from './assignment-configuration/assignment-configuration.component';
import { ContactComponent } from './contact/contact.component';
import { DisplayAdminComponent } from './display-admin/display-admin.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DisplayNotificationTypesComponent } from './display-notification-types/display-notification-types.component';
import { DisplayNotificationsComponent } from './display-notifications/display-notifications.component';
import { DisplayStudentComponent } from './display-student/display-student.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { ErrorRoutePageComponent } from './error-route-page/error-route-page.component';
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
    path: 'planangazovanja',
    component: AssignmentConfigurationComponent
  },
  {
    path: 'korisnici/registracija',
    component: RegistrationComponent
  },
  {
    path: 'korisnici/obrada/admin',
    component: DisplayAdminComponent
  },
  {
    path: 'korisnici/obrada/zaposlen',
    component: DisplayEmployeeComponent
  },
  {
    path: 'korisnici/obrada/student',
    component: DisplayStudentComponent
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
    path: 'profil/obrada/admin',
    component: DisplayAdminComponent
  },
  {
    path: 'profil/obrada/zaposlen',
    component: DisplayEmployeeComponent
  },
  {
    path: 'profil/obrada/student',
    component: DisplayStudentComponent
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
    path: 'admin/obavestenja/pregled',
    component: DisplayNotificationsComponent
  },
  {
    path: 'admin/obavestenja/tipovi',
    component: DisplayNotificationTypesComponent
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
  {
    path: 'error',
    component: ErrorRoutePageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
