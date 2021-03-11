import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MergePdfService {

  constructor(private http: HttpClient) { }

  merge(urlDocument: string, file: any): Observable<any> {
    return this.http.post(urlDocument, file, { responseType: 'blob' });
  }

  downloadFile(urlDocument: string): Observable<any> {
    return this.http.get(urlDocument, { responseType: 'blob' });
  }
}
