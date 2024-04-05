import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-recipe-card",
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: "./recipe-card.component.html",
  styleUrl: "./recipe-card.component.css",
})
export class RecipeCardComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  @Input() recipe: any;

  isVeg(recipie: any) {
    if (recipie.category.toLowerCase() === "veg") return true;
    else return false;
  }
}
