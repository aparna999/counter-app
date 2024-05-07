import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeadlineService {
  private apiUrl = '/api/deadline';

  constructor(private http: HttpClient) {}

  getDeadline(): Observable<{ secondsLeft: number }> {
    return this.http.get<{ secondsLeft: number }>(this.apiUrl); //test by placing api call with of({ secondsLeft: 3000 });
  }
}
