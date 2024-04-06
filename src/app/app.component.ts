import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { MaterialModule } from "./material/material.module";
import { AllRecipesComponent } from "./components/all-recipes/all-recipes.component";
import { LoaderComponent } from "./components/loader/loader.component";
import { LoaderService } from "./services/loader.service";
import { HeaderComponent } from "./components/header/header.component";
import { HttpClientModule } from "@angular/common/http";
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
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.fetchCategoriesList();
    this.fetchCountriesList();
    this.appService.fetchAllRecipies();
  }

  fetchCountriesList() {
    this.appService.path = this.appService.baseUrl + "/countries";
    this.appService.getServiceRequest().subscribe((res) => {
      this.appService.countriesList = res;
    });
  }

  fetchCategoriesList() {
    this.appService.path = this.appService.baseUrl + "/categories";
    this.appService.getServiceRequest().subscribe((res) => {
      this.appService.recipieCategories = res;
    });
  }
}
