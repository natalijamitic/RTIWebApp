import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProjectFiles } from '../display-subject-employee-project-materials/display-subject-employee-project-materials.component';
import { ISubjectFull, ISubjProject } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

@Component({
  selector: 'display-subject-employee-project-materials-project-single',
  templateUrl: './display-subject-employee-project-materials-project-single.component.html',
  styleUrls: ['./display-subject-employee-project-materials-project-single.component.scss']
})
export class DisplaySubjectEmployeeProjectMaterialsProjectSingleComponent implements OnInit {

  @Input()
  public projF: IProjectFiles
  @Input()
  public proj: ISubjProject
  @Input()
  public projNum: number;
  @Input()
  public fullName: string;
  @Input()
  public subject: ISubjectFull

  @Output()
  onDeleteProj: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onUpdateSubject: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

  private sub: Subscription;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
  }

  public initFiles(): void {
    this.projF.projectMaterials = [];

    for (let file of this.subject.project.projects[this.projNum].projectMaterials) {
      let info: string[] = file.split('`');
      this.projF.projectMaterials.push({
        original: file,
        title: info[0].substring(0, info[0].indexOf('.')),
        author: `${info[2]} ${info[3]}`,
        date: new Date(parseInt(info[5].substring(0, info[5].indexOf('.')))),
        size: parseInt(info[4]),
        type: file.substr(file.lastIndexOf("."))
      })
    }
  }

  public deleteProject(): void {
    this.onDeleteProj.emit({ num: this.projNum });
  }

  public deleteFile(i: number): void {
    this.subject.project.projects[this.projNum].projectMaterials.splice(i, 1);
    this.initFiles();
    this.onUpdateSubject.emit({subject: this.subject});
  }

  public sortFiles(): void {
    this.subject.project.projects[this.projNum].projectMaterials = [];
    for (let lab of this.projF.projectMaterials) {
      this.subject.project.projects[this.projNum].projectMaterials.push(lab.original);
    }
    this.onUpdateSubject.emit({subject: this.subject});
  }

  public filesUploaded($event): void {
    for (let file of $event.fileNames) {
      this.subject.project.projects[this.projNum].projectMaterials.push(file);
    }
    this.initFiles();
    this.onUpdateSubject.emit({subject: this.subject});
  }

  public addFile(): void {
    this.uploadFiles.info = {
      title: '',
      username: this.fullName
    }
    this.uploadFiles.uploadFiles();
  }

  public downloadFile(fileName: string): void {
    this.sub?.unsubscribe();

    this.sub = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }

}
