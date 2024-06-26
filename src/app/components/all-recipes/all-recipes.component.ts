import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { RecipeCardComponent } from "../recipe-card/recipe-card.component";
import { HeaderComponent } from "../header/header.component";
import { MaterialModule } from "../../material/material.module";
import { MatDialog } from "@angular/material/dialog";
import { SearchHomeComponent } from "../search-home/search-home.component";
import { AppService } from "../../services/app.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { LoaderService } from "../../services/loader.service";

@Component({
  selector: "app-all-recipes",
  standalone: true,
  imports: [
    HttpClientModule,
    RecipeCardComponent,
    HeaderComponent,
    MaterialModule,
    SearchHomeComponent,
  ],
  templateUrl: "./all-recipes.component.html",
  styleUrl: "./all-recipes.component.css",
})
export class AllRecipesComponent implements OnInit {
  isSearching: boolean = false;

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private http: HttpClient,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.appService.isSearching.subscribe((res) => {
      this.isSearching = res;
    });
  }
}
