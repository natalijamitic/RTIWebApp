import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubjectsService } from '../Services/Subjects/subjects.service';

export interface Itimetable {
  lecture: number;
  exercise: number;
  lab: number;
}

export interface ISubjectShort {
  type: string;
  semestar: number;
  code: string;
  title: string;
  timetable: Itimetable;
  espb: Number;
}

@Component({
  selector: 'master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

  public department: string;
  public subjects: Array<ISubjectShort> = null;
  public subjectsGrouped: Array<Array<ISubjectShort>> = null;

  protected subscription: Subscription;

  constructor(private subjService: SubjectsService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.params.subscribe(params => {
      this.initComponent(params['dept']);
    });
  }

  public initComponent(dept: string): void {
    this.department = dept;
    this.subjects = this.subjectsGrouped = null;

    this.subscription = this.subjService.getSubjectsByDepartment(this.department).subscribe((result: Array<ISubjectShort>) => {
      if (result?.length > 0) {
        this.subjects = result;
        this.subjects.sort((s1:ISubjectShort, s2: ISubjectShort) => s1.semestar - s2.semestar);

        this.subjectsGrouped  = this.subjects.reduce(function (res, subj, i) {
          if (!i || res[res.length - 1][0].semestar !== subj.semestar) {
              return res.concat([[subj]]);
          }
          res[res.length - 1].push(subj);
          return res;
        }, []);

        // prvo obavezni pa onda izborni
        for (let i = 0; i < this.subjectsGrouped.length; i++) {
          this.subjectsGrouped[i].sort((s1, s2) => s1.type < s2.type ? 1 : -1)
        }
      }
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subjects = null;
    this.subjectsGrouped = null;

    if (this.subscription){
      this.subscription.unsubscribe();}
  }

}
