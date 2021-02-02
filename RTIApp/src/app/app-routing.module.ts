import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewSubjectComponent } from './add-new-subject/add-new-subject.component';
import { AddSubjectNotificationsComponent } from './add-subject-notifications/add-subject-notifications.component';
import { AppComponent } from './app.component';
import { AssignmentConfigurationComponent } from './assignment-configuration/assignment-configuration.component';
import { ContactComponent } from './contact/contact.component';
import { DisplayAdminComponent } from './display-admin/display-admin.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DisplayNotificationTypesComponent } from './display-notification-types/display-notification-types.component';
import { DisplayNotificationsComponent } from './display-notifications/display-notifications.component';
import { DisplayStudentComponent } from './display-student/display-student.component';
import { DisplaySubjectEmployeeExamMaterialsComponent } from './display-subject-employee-exam-materials/display-subject-employee-exam-materials.component';
import { DisplaySubjectEmployeeExerciseComponent } from './display-subject-employee-exercise/display-subject-employee-exercise.component';
import { DisplaySubjectEmployeeInformationComponent } from './display-subject-employee-information/display-subject-employee-information.component';
import { DisplaySubjectEmployeeLabMaterialsComponent } from './display-subject-employee-lab-materials/display-subject-employee-lab-materials.component';
import { DisplaySubjectEmployeeLectureComponent } from './display-subject-employee-lecture/display-subject-employee-lecture.component';
import { DisplaySubjectEmployeeProjectMaterialsComponent } from './display-subject-employee-project-materials/display-subject-employee-project-materials.component';
import { DisplaySubjectEmployeeComponent } from './display-subject-employee/display-subject-employee.component';
import { DisplaySubjectNotificationsComponent } from './display-subject-notifications/display-subject-notifications.component';
import { DisplaySubjectStudentExamMaterialsComponent } from './display-subject-student-exam-materials/display-subject-student-exam-materials.component';
import { DisplaySubjectStudentExerciseComponent } from './display-subject-student-exercise/display-subject-student-exercise.component';
import { DisplaySubjectStudentInformationComponent } from './display-subject-student-information/display-subject-student-information.component';
import { DisplaySubjectStudentLabComponent } from './display-subject-student-lab/display-subject-student-lab.component';
import { DisplaySubjectStudentLectureComponent } from './display-subject-student-lecture/display-subject-student-lecture.component';
import { DisplaySubjectStudentNotificationsComponent } from './display-subject-student-notifications/display-subject-student-notifications.component';
import { DisplaySubjectStudentProjectComponent } from './display-subject-student-project/display-subject-student-project.component';
import { DisplaySubjectStudentComponent } from './display-subject-student/display-subject-student.component';
import { DisplaySubjectsEmployeeComponent } from './display-subjects-employee/display-subjects-employee.component';
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
import { SubjectListComponent } from './subject-list/subject-list.component';
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
    path: 'napravipredmet',
    component: AddNewSubjectComponent
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
    path: 'vesti/dodaj',
    component: AddSubjectNotificationsComponent
  },
  {
    path: 'vesti/obrada',
    component: AddSubjectNotificationsComponent
  },
  {
    path: 'vesti/pregled',
    component: DisplaySubjectNotificationsComponent
  },
  {
    path: 'listapredmeta',
    component: SubjectListComponent
  },
  {
    path: 'listapredmeta/:code',
    component: DisplaySubjectStudentComponent,
    children: [
      {
        path: 'obavestenja',
        component: DisplaySubjectStudentNotificationsComponent
      },
      {
        path: 'informacije',
        component: DisplaySubjectStudentInformationComponent
      },
      {
        path: 'predavanja',
        component: DisplaySubjectStudentLectureComponent
      },
      {
        path: 'vezbe',
        component: DisplaySubjectStudentExerciseComponent
      },
      {
        path: 'ispitna-pitanja',
        component: DisplaySubjectStudentExamMaterialsComponent
      },
      {
        path: 'laboratorija',
        component: DisplaySubjectStudentLabComponent
      },
      {
        path: 'projekti-domaci',
        component: DisplaySubjectStudentProjectComponent
      }
    ]
  },

  {
    path: 'zaposlen/predmeti',
    component: DisplaySubjectsEmployeeComponent,
    children: [
      {
        path: 'informacije/:code',
        component: DisplaySubjectEmployeeInformationComponent
      },
      {
        path: 'predavanja/:code',
        component: DisplaySubjectEmployeeLectureComponent
      },
      {
        path: 'vezbe/:code',
        component: DisplaySubjectEmployeeExerciseComponent
      },
      {
        path: 'ispitna-pitanja/:code',
        component: DisplaySubjectEmployeeExamMaterialsComponent
      },
      {
        path: 'laboratorija/:code',
        component: DisplaySubjectEmployeeLabMaterialsComponent
      },
      {
        path: 'projekti-domaci/:code',
        component: DisplaySubjectEmployeeProjectMaterialsComponent
      }
    ]
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
