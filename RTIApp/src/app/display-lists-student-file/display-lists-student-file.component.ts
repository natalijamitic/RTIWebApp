import { Component, Input, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IStudent } from '../registration/registration.component';
import { IList } from '../Services/Subjects/subjects.service';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';
import { UploadFilesComponent } from '../upload-files/upload-files.component';

@Component({
  selector: 'display-lists-student-file',
  templateUrl: './display-lists-student-file.component.html',
  styleUrls: ['./display-lists-student-file.component.scss']
})
export class DisplayListsStudentFileComponent implements OnInit {

  @Input()
  public list: IList;

  @Input()
  public student: IStudent;

  @Output()
  onUpdateList: EventEmitter<any> = new EventEmitter<any>();

  private sub: Subscription;

  @ViewChild('uploadFiles') uploadFiles: UploadFilesComponent;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
  }

  public filesUploaded($event): void {
    for (let file of $event.fileNames) {
      let found = false;
      for (let f of this.list.files) {
        if (f.student == this.student.username) {
          f.file = file;
          found = true;
        }
      }
      if (!found) {
        this.list.files.push({student: this.student.username, file: file});
      }
    }
    this.onUpdateList.emit({list: this.list});
  }

  public addFile(): void {
    this.uploadFiles.info = {
      title: '',
      username: this.student.username
    }
    this.uploadFiles.uploadFiles();
  }

  public downloadFile(fileName: string): void {
    this.sub?.unsubscribe();

    this.sub = this.uploadService.downloadNotificationFile(fileName).subscribe((result: any) => {
      UploadFilesService.openDownloadedFile(result);
    });
  }

  public canRegister(): boolean {
    if (!this.list) {
      return false;
    }
    if (this.list.valid && this.list.files.length < this.list.limit) {
      for (let f of this.list.files) {
        if (f.student == this.student.username && f.file) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

}
