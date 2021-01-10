import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    constructor(private http: HttpClient) { }

    upload(formData: any): any {
        return this.http.post(`${environment.api}/upload/notification/file`, formData);
    }

}