import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadFilesService } from '../Services/UploadFiles/upload-files.service';

@Component({
  selector: 'upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {
  info: any;
  msg: string;
  selectedFiles: FileList;
  fileUrls: string[] = [];
  fileUploadForm: FormGroup;

  current: number = 0;

  @Input()
  single: boolean = false;

  @Output()
  onFileUpload: EventEmitter<any> = new EventEmitter<any>();

  constructor(private uploadService: UploadFilesService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      uploadedFile: ['']
    });
  }

  public selectFiles(event): void {
    if (this.single) {
      let type = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1);
      type = type.toLowerCase();
      if (type !== 'zip' && type !== '7z') {
        this.msg="Samo .zip ili .7z sme";
        return;
      }
    }
    this.selectedFiles = event.target.files;
    this.msg = "";
  }

  public uploadFiles(): boolean {
    if (!this.selectedFiles || this.selectedFiles.length == 0) {
      return false;
    }

    this.current = 0;
    this.fileUrls = [];
    this.msg = "";

    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
    return true;
  }

  public upload(idx: number, file: File) {

    this.fileUploadForm.get('uploadedFile').setValue(file);

    const formData = new FormData();
    formData.append('uploadedFile', this.fileUploadForm.get('uploadedFile').value);
    formData.append('additionalInfo', JSON.stringify(this.info));

    this.uploadService.uploadNotificationFile(formData).subscribe(
      event => {

        this.msg = `${this.msg}\tFile #${idx} posted.`
        this.fileUrls.push(event.fileName);

        if (++this.current == this.selectedFiles.length) {
          this.onFileUpload.emit({fileNames: this.fileUrls});
        };

      },
      err => {
        console.log(err);
      });
  }

}
