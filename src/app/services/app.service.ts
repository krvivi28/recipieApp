import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoaderService } from "./loader.service";
import { ToasterService } from "./toaster.service";
import { citiesList } from "./appConstatnts";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppService {
  baseUrl = "http://localhost:3000";
  countriesList: any;
  recipieCategories: any;
  citiesList = citiesList;
  path!: string;
  allRecepies: [] = [];
  isSearching = new BehaviorSubject<boolean>(false);
  filteredRecipies = [];

  constructor(
    private loaderService: LoaderService,
    private http: HttpClient,
    private toatser: ToasterService
  ) {}

  getServiceRequest() {
    return this.http.get(this.path);
  }

  postServiceRequest(requestBody: any) {
    return this.http.post(this.path, requestBody);
  }

  deleteServiceRequest() {
    return this.http.delete(this.path);
  }

  putServiceRequest(requestBody: any) {
    return this.http.put(this.path, requestBody);
  }

  fetchAllRecipies() {
    this.loaderService.isLoading.set(true);
    this.path = this.baseUrl + `/recipies`;
    this.getServiceRequest().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.allRecepies = res;
        this.loaderService.isLoading.set(false);
        // this.toatser.success("Recipies data fetched succeessfully");
      },
      error: (err) => {
        this.loaderService.isLoading.set(false);
        this.toatser.error(
          `Error while fetching recipies data: ${err.message}`
        );
      },
    });
  }
}
