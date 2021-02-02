import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavigationMainComponent } from './navigation-main/navigation-main.component';
import { FormBuilder, FormsModule } from '@angular/forms';
import { AuthenticationService } from './Services/Authentication/authentication.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './Services/Authentication/AuthenticationInterceptor';
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from './Services/Notification/notification.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { ResearchComponent } from './research/research.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResearchProjectsComponent } from './research-projects/research-projects.component';
import { ProjectsService } from './Services/Projects/projects.service';
import { ResearchProjectsCardComponent } from './research-projects-card/research-projects-card.component';
import { ProjectsCardComponent } from './projects-card/projects-card.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeesService } from './Services/Employees/employees.service';
import { EmployeeComponent } from './employee/employee.component';
import { MasterComponent } from './master/master.component';
import { SubjectsService } from './Services/Subjects/subjects.service';
import { MasterCardComponent } from './master-card/master-card.component';
import { NavigationVerticalComponent } from './navigation-vertical/navigation-vertical.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { FirstLoginComponent } from './first-login/first-login.component';
import { UsersComponent } from './users/users.component';
import { UsersService } from './Services/Users/users.service';
import { DisplayAdminComponent } from './display-admin/display-admin.component';
import { DisplayEmployeeComponent } from './display-employee/display-employee.component';
import { DisplayStudentComponent } from './display-student/display-student.component';
import { StudentService } from './Services/Students/student.service';
import { DisplayNotificationTypesComponent } from './display-notification-types/display-notification-types.component';
import { DisplayNotificationsComponent } from './display-notifications/display-notifications.component';
import { AssignmentConfigurationComponent } from './assignment-configuration/assignment-configuration.component';
import { ErrorRoutePageComponent } from './error-route-page/error-route-page.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { DisplaySubjectStudentComponent } from './display-subject-student/display-subject-student.component';
import { DisplaySubjectNotificationsComponent } from './display-subject-notifications/display-subject-notifications.component';
import { AddSubjectNotificationsComponent } from './add-subject-notifications/add-subject-notifications.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';
import { UploadFilesService } from './Services/UploadFiles/upload-files.service';
import { NavigationSubjectComponent } from './navigation-subject/navigation-subject.component';
import { DisplaySubjectStudentInformationComponent } from './display-subject-student-information/display-subject-student-information.component';
import { DisplaySubjectStudentNotificationsComponent } from './display-subject-student-notifications/display-subject-student-notifications.component';
import { DisplaySubjectStudentLectureComponent } from './display-subject-student-lecture/display-subject-student-lecture.component';
import { DisplaySubjectStudentExerciseComponent } from './display-subject-student-exercise/display-subject-student-exercise.component';
import { DisplaySubjectStudentExamMaterialsComponent } from './display-subject-student-exam-materials/display-subject-student-exam-materials.component';
import { DisplaySubjectStudentLabComponent } from './display-subject-student-lab/display-subject-student-lab.component';
import { DisplaySubjectStudentProjectComponent } from './display-subject-student-project/display-subject-student-project.component';
import { DisplaySubjectsEmployeeComponent } from './display-subjects-employee/display-subjects-employee.component';
import { DisplaySubjectEmployeeComponent } from './display-subject-employee/display-subject-employee.component';
import { NavigationSubjectEmployeeComponent } from './navigation-subject-employee/navigation-subject-employee.component';
import { DisplaySubjectEmployeeInformationComponent } from './display-subject-employee-information/display-subject-employee-information.component';
import { DisplaySubjectEmployeeLectureComponent } from './display-subject-employee-lecture/display-subject-employee-lecture.component';
import { SortablejsModule } from 'ngx-sortablejs';
import { DisplaySubjectEmployeeExerciseComponent } from './display-subject-employee-exercise/display-subject-employee-exercise.component';
import { DisplaySubjectEmployeeExamMaterialsComponent } from './display-subject-employee-exam-materials/display-subject-employee-exam-materials.component';
import { DisplaySubjectEmployeeLabMaterialsComponent } from './display-subject-employee-lab-materials/display-subject-employee-lab-materials.component';
import { DisplaySubjectEmployeeProjectMaterialsComponent } from './display-subject-employee-project-materials/display-subject-employee-project-materials.component';
import { DisplaySubjectEmployeeLabMaterialsLabSingleComponent } from './display-subject-employee-lab-materials-lab-single/display-subject-employee-lab-materials-lab-single.component';
import { DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent } from './display-subject-employee-project-materials-project-single/display-subject-employee-project-materials-project-single.component';
import { AddNewSubjectComponent } from './add-new-subject/add-new-subject.component';
import { AddNewListComponent } from './add-new-list/add-new-list.component';

@NgModule({
  declarations: [             //  all personal components
    AppComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationMainComponent,
    NotificationComponent,
    NotificationCardComponent,
    ResearchComponent,
    ProjectsComponent,
    ResearchProjectsComponent,
    ResearchProjectsCardComponent,
    ProjectsCardComponent,
    EmployeesComponent,
    EmployeeComponent,
    MasterComponent,
    MasterCardComponent,
    NavigationVerticalComponent,
    RegistrationComponent,
    ProfileComponent,
    LogoutComponent,
    FirstLoginComponent,
    UsersComponent,
    DisplayAdminComponent,
    DisplayEmployeeComponent,
    DisplayStudentComponent,
    DisplayNotificationTypesComponent,
    DisplayNotificationsComponent,
    AssignmentConfigurationComponent,
    ErrorRoutePageComponent,
    SubjectListComponent,
    DisplaySubjectStudentComponent,
    DisplaySubjectNotificationsComponent,
    AddSubjectNotificationsComponent,
    UploadFilesComponent,
    NavigationSubjectComponent,
    DisplaySubjectStudentInformationComponent,
    DisplaySubjectStudentNotificationsComponent,
    DisplaySubjectStudentLectureComponent,
    DisplaySubjectStudentExerciseComponent,
    DisplaySubjectStudentExamMaterialsComponent,
    DisplaySubjectStudentLabComponent,
    DisplaySubjectStudentProjectComponent,
    DisplaySubjectsEmployeeComponent,
    DisplaySubjectEmployeeComponent,
    NavigationSubjectEmployeeComponent,
    DisplaySubjectEmployeeInformationComponent,
    DisplaySubjectEmployeeLectureComponent,
    DisplaySubjectEmployeeExerciseComponent,
    DisplaySubjectEmployeeExamMaterialsComponent,
    DisplaySubjectEmployeeLabMaterialsComponent,
    DisplaySubjectEmployeeProjectMaterialsComponent,
    DisplaySubjectEmployeeLabMaterialsLabSingleComponent,
    DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent,
    AddNewSubjectComponent,
    AddNewListComponent,
  ],
  imports: [                  //  foreign import components
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    EditorModule,
    SortablejsModule.forRoot({ animation: 150, easing: "cubic-bezier(1, 0, 0, 1)", handle: '.handle', ghostClass: 'red-background-class' }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    AuthenticationService,
    NotificationService,
    ProjectsService,
    EmployeesService,
    SubjectsService,
    UsersService,
    StudentService,
    FormBuilder,
    UploadFilesService,
  ],              //  services
  bootstrap: [AppComponent]   //  main component
})
export class AppModule { }
