import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILabFiles } from '../display-subject-employee-lab-materials/display-subject-employee-lab-materials.component';
import { ISubjectFull, ISubjLab } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

@Component({
  selector: 'display-subject-employee-lab-materials-lab-single',
  templateUrl: './display-subject-employee-lab-materials-lab-single.component.html',
  styleUrls: ['./display-subject-employee-lab-materials-lab-single.component.scss']
})
export class DisplaySubjectEmployeeLabMaterialsLabSingleComponent implements OnInit {

  @Input()
  public labF: ILabFiles
  @Input()
  public lab: ISubjLab
  @Input()
  public labNum: number;
  @Input()
  public fullName: string;
  @Input()
  public subject: ISubjectFull

  @Output()
  onDeleteLab: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  onUpdateSubject: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

  private sub: Subscription;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
  }

  public initFiles(): void {
    this.labF.labMaterials = [];

    for (let file of this.subject.lab.labs[this.labNum].labMaterials) {
      let info: string[] = file.split('`');
      this.labF.labMaterials.push({
        original: file,
        title: info[0].substring(0, info[0].indexOf('.')),
        author: `${info[2]} ${info[3]}`,
        date: new Date(parseInt(info[5].substring(0, info[5].indexOf('.')))),
        size: parseInt(info[4]),
        type: file.substr(file.lastIndexOf("."))
      })
    }
  }

  public deleteLab(): void {
    this.onDeleteLab.emit({ num: this.labNum });
  }

  public deleteFile(i: number): void {
    this.subject.lab.labs[this.labNum].labMaterials.splice(i, 1);
    this.initFiles();
    this.onUpdateSubject.emit({subject: this.subject});
  }

  public sortFiles(): void {
    this.subject.lab.labs[this.labNum].labMaterials = [];
    for (let lab of this.labF.labMaterials) {
      this.subject.lab.labs[this.labNum].labMaterials.push(lab.original);
    }
    this.onUpdateSubject.emit({subject: this.subject});
  }

  public filesUploaded($event): void {
    for (let file of $event.fileNames) {
      this.subject.lab.labs[this.labNum].labMaterials.push(file);
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
