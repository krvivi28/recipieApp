import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MaterialModule } from "../../material/material.module";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-recipe-details",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./recipe-details.component.html",
  styleUrl: "./recipe-details.component.css",
})
export class RecipeDetailsComponent implements OnInit {
  recipeDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string|number },
    private appService: AppService
  ) {}

  ngOnInit(): void {
    this.getRecipeDetails();
  }

  getRecipeDetails() {
    this.recipeDetails= this.appService.allRecepies.find((recipe: any) => {
      return recipe.id === this.data.id;
    });
  }
}
