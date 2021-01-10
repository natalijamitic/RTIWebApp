import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IEmployee } from '../employees/employees.component';
import { ISubjectShort } from '../master/master.component';
import { EmployeesService } from '../Services/Employees/employees.service';
import { SubjectsService } from '../Services/Subjects/subjects.service';


import { IDropdownSettings } from 'ng-multiselect-dropdown';

export interface IGroup {
  name: string;
  employees: Array<string>;
}

export interface IAssignmentFull {
  subject: string;
  employees: Array<string>;
  group: Array<IGroup>
}

@Component({
  selector: 'assignment-configuration',
  templateUrl: './assignment-configuration.component.html',
  styleUrls: ['./assignment-configuration.component.scss']
})
export class AssignmentConfigurationComponent implements OnInit, OnDestroy {
  public employeeTitles = ["istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar", "redovni profesor", "vanredni profesor", "docent", "asistent", "saradnik u nastavi"];

  public assignments: Array<IAssignmentFull> = null;
  public teachers: Array<IEmployee> = null;
  public teachersNames: Array<string> = null;
  public allSubjects: Array<ISubjectShort> = null;
  public subjects: Array<ISubjectShort> = null;

  public newAssignment: IAssignmentFull = {
    subject: "",
    employees: null,
    group: null
  }


  public selectedSubject: [{code: string}];
  public selectedTeachersP = Array(10);
  public selectedTeachersV = Array(10);
  public selectedNumGroup: number = null;
  public dropdownSettings: IDropdownSettings = {};
  public dropdownSettingsSubject: IDropdownSettings = {};
  public dropdownSettingsTeachers: IDropdownSettings = {};

  public counter = Array;


  public msg: string ='';

  private sub1: Subscription;
  private sub2: Subscription;
  private sub3: Subscription;

  constructor(private employeeService: EmployeesService,
              private subjectService: SubjectsService) { }

  ngOnInit(): void {
    this.sub1 = this.employeeService.getAssignmentListFull().subscribe((result: Array<IAssignmentFull>) => {
      this.assignments = [...result];
    })

    this.sub2 = this.employeeService.getAllEmployees().subscribe((result: Array<IEmployee>) => {
      this.teachers = result.filter((emp: IEmployee) => this.isTeacher(emp));
      this.teachersNames = this.teachers.map((teacher: IEmployee) => teacher.username);
    })

    this.sub3 = this.subjectService.getAllSubjects().subscribe((result: Array<ISubjectShort>) => {
      this.allSubjects = [...result];
      this.subjects = result.filter((subj: ISubjectShort) => !this.assignments.find((ass: IAssignmentFull) => ass.subject == subj.code));
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: ' ',
      textField: ' ',
      enableCheckAll: false,
      allowSearchFilter: false,
    };

    this.dropdownSettingsSubject = {
      singleSelection: true,
      idField: 'code',
      textField: 'code',
      allowSearchFilter: true,
    }

    this.dropdownSettingsTeachers = {
      singleSelection: false,
      idField: '',
      textField: '',
      enableCheckAll: false,
      allowSearchFilter: true,
    }
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
  }

  public deleteAssignment(ass: IAssignmentFull, num: number) {
    this.employeeService.deleteAssignment(ass.subject).subscribe((result) => {
      setTimeout(() => {
        this.assignments.splice(num, 1);
      })
    });
  }

  public insertAssignment() {
    if (!this.selectedSubject || !this.selectedSubject[0]?.code || !this.selectedNumGroup) {
      this.msg = "Morate popuniti sva obavezna polja."
      return;
    }

    for (let i = 0; i < this.selectedNumGroup; i++) {
      if (!this.selectedTeachersP[i] || !this.selectedTeachersV[i] || this.selectedTeachersP[i].length == 0 || this.selectedTeachersV[i].length == 0) {
        this.msg = "Morate popuniti sva obavezna polja."
        return;
      }
    }

    let employeesAll = [];
    let groups: Array<IGroup> = [];

    for (let i = 0; i < this.selectedNumGroup; i++) {
      if(!employeesAll.find((emp: string) => emp == this.selectedTeachersP[i])) {
        employeesAll.push(...this.selectedTeachersP[i]);
      }
      if(!employeesAll.find((emp: string) => emp == this.selectedTeachersV[i])) {
        employeesAll.push(...this.selectedTeachersV[i]);
      }
      let group: IGroup = {
        name: `P${i}`,
        employees: this.selectedTeachersP[i]
      }
      groups.push(group);
      group = {
        name: `V${i}`,
        employees: this.selectedTeachersV[i]
      }
      groups.push(group);
    }



    this.newAssignment = {
      subject: this.selectedSubject[0].code,
      employees: employeesAll,
      group: groups
    }

    this.msg = "";
    console.log(this.newAssignment);
    this.employeeService.insertAssignment(this.newAssignment).subscribe((result) => {
      console.log("RESULT")
      this.assignments.push(this.newAssignment);
      this.subjects = this.subjects.filter((subj: ISubjectShort) => subj.code != this.newAssignment.subject);
      this.newAssignment = {
        subject: "",
        employees: null,
        group: null
      }

      this.selectedSubject = null;
      this.selectedTeachersP = Array(10);
      this.selectedTeachersV = Array(10);
      this.selectedNumGroup = null;
    })
  }

  public getSubjectTitle(code: string): string {
    return this.allSubjects?.find((subj: ISubjectShort) => subj.code == code).title;
  }


  private isTeacher(employee: IEmployee): boolean {
    if (!employee.title || this.employeeTitles.findIndex((title: String) => title === employee.title) < 3 || employee.status == 'neaktivan') {
      return false;
    }
    return true;
  }
}
