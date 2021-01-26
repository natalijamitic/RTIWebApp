import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UploadFilesService {

    constructor(private http: HttpClient) { }

    uploadNotificationFile(formData: any): any {
        return this.http.post(`${environment.api}/upload/notification/file`, formData);
    }

    downloadNotificationFile(name: string): any {
        let headers = new HttpHeaders();
        return this.http.get(`${environment.api}/download/notification/file/${name}`, {headers, responseType: 'blob'});
    }

    public static openDownloadedFile(blob: Blob): void {
        let url = window.URL.createObjectURL(blob);
        let pwa = window.open(url);
        if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
            alert( 'Please disable your Pop-up blocker and try again.');
        }
    }
}