import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppService {
  baseUrl = "http://localhost:3000";
  path!: string;
  countriesList: any;
  recipieCategories: any;
  citiesList: any;

  // getServiceRequest() {
  //   return this.http.get(this.path);
  // }
}
