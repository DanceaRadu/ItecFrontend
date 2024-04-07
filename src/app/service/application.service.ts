import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment.development";
import {Application} from "../entity/Application";
import {Observable} from "rxjs";
import {Ratio} from "../entity/Ratio";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  baseUrl = environment.baseUrl + "/application";

  constructor(private http: HttpClient,) {
  }

  search(query: string): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl + "/search?query=" + query);
  }

  createApp(app: Application): Observable<Application> {
    return this.http.post<Application>(this.baseUrl, app);
  }

  deleteApp(appId: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/" + appId);
  }

  getAppById(id: number): Observable<Application> {
    return this.http.get<Application>(this.baseUrl + "/" + id);
  }

  updateApp(app: Application, id: number): Observable<Application> {
    console.log(app)
    return this.http.put<Application>(this.baseUrl + '/' + id, app);
  }

  getRatioByEndpointId(id: number) {
    return this.http.get<Ratio>(this.baseUrl + "/ratio/" + id);
  }
}
