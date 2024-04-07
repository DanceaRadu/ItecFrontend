import { Injectable } from '@angular/core';
import {environment} from "../environments/environment.development";
import {Bug} from "../entity/Bug";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BugService {

  baseUrl = environment.baseUrl + '/bug';
  constructor(private http: HttpClient) {
  }

  createBugReport(bugReport: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.baseUrl, bugReport)
  }

  deleteBugReport(id: number) {
    return this.http.delete(this.baseUrl + '/' + id)
  }

}
