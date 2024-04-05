import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { AllRecipesComponent } from "./components/all-recipes/all-recipes.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader.service";
import { HeaderComponent } from "./components/header/header.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppService } from "./services/app.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    MaterialModule,
    AllRecipesComponent,
    LoaderComponent,
    HeaderComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent implements OnInit {
  title = "myapp";

  constructor(
    public loaderService: LoaderService,
    private http: HttpClient,
    private appService: AppService
  ) {}
  ngOnInit(): void {
    this.fetchCategoriesList();
    this.fetchCountriesList();
    this.fetchIndiaCitiesList();
  }

  fetchIndiaCitiesList() {
    const path = this.appService.baseUrl + "/cities";
    this.http.get(path).subscribe((res) => {
      this.appService.citiesList = res;
      console.log(res);
    });
  }

  fetchCountriesList() {
    this.http.get("http://localhost:3000/countries").subscribe((res) => {
      this.appService.countriesList = res;
    });
  }

  fetchCategoriesList() {
    this.http.get("http://localhost:3000/categories").subscribe((res) => {
      this.appService.recipieCategories = res;
    });
  }
}
