import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { CommonModule } from "@angular/common";
import { AppService } from "../../services/app.service";
import { LoaderService } from "../../services/loader.service";
import { ToasterService } from "../../services/toaster.service";

@Component({
  selector: "app-recipe-card",
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: "./recipe-card.component.html",
  styleUrl: "./recipe-card.component.css",
})
export class RecipeCardComponent implements OnChanges {
  constructor(
    private appService: AppService,
    private loader: LoaderService,
    private toaster: ToasterService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
  @Input() recipe: any;

  isVeg(recipie: any) {
    if (recipie.category === "SEA" || recipie.category === "MEA") return false;
    else return true;
  }

  handleDelete(id: any) {
    const ans = window.confirm("Are you sure want to delete this recipie?");
    if (ans) {
      this.loader.isLoading.set(true);
      this.appService.path = this.appService.baseUrl + `/recipies/${id}`;
      this.appService.deleteServiceRequest().subscribe({
        next: (res) => {
          this.toaster.success("Recipie deleted succesfully");
          this.appService.fetchAllRecipies();
          this.loader.isLoading.set(false);
        },
        error: (err) => {
          this.toaster.error(
            `Error occured while deleting recipie ${err.message}`
          );
          this.loader.isLoading.set(false);
        },
      });
    }
  }
}
