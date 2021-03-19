import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MergePdfService {

  constructor(private http: HttpClient) { }

  merge(file: any): Observable<any> {
    return this.http.post(`${environment.urlApi}merge`, file, { responseType: 'blob' });
  }

  deleteFile(nameFile: string): Observable<any> {
    return this.http.delete(`${environment.urlApi}delete-file/${nameFile}`);
  }
}
