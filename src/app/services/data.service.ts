import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private jsonUrl = 'assets/data/db.json';  // Path to the JSON file

  constructor(private http: HttpClient) { }

  getTasks(): Observable<any> {

    console.log("getting data");
    return this.http.get(this.jsonUrl);
  }
}
