import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Set } from './set.model';

@Injectable({
  providedIn: 'root',
})
export class SetService {
  constructor(private http: HttpClient) {}

  getAllSets(): Observable<Set[]> {
    console.log('getAllSets aangeroepen');
    return this.http.get<any>(environment.apiUrl + 'set');
  }

  getSetById(id: string): Observable<any> {
    console.log('getUserById aangeroepen');
    //return this.cards.filter((card) => card._id === id)[0];
    return this.http.get<any>(environment.apiUrl + `set/${id}`);
  }

  editSet(id: string, set: Set) {
    console.log('editSet aangeroepen');
    return this.http.put<any>(environment.apiUrl + `set/${id}`, set);
  }

  newSet(set: Set) {
    console.log('newSet aangeroepen');
    return this.http.post<any>(environment.apiUrl + `set`, set);
  }

  deleteSet(id: string) {
    console.log('deleteSet aangeroepen');
    return this.http.delete<any>(environment.apiUrl + `set/${id}`);
  }
}
