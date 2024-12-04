import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetectionService {
  private apiUrl = '/predict/';

  constructor(private http: HttpClient) {}

  detectAnimal(imageFile: File): Observable<Blob> {
    const formData = new FormData();
    formData.append('file', imageFile);
    return this.http.post(this.apiUrl, formData, { responseType: 'blob' });
  }
}
