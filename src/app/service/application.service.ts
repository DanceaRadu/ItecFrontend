import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {Application} from "../entity/Application";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl = environment.baseUrl + "/application";

  constructor(private http: HttpClient,) {
  }

  createApp(app: Application): Observable<Application> {
    return this.http.post<Application>(this.baseUrl, app);
  }
}
