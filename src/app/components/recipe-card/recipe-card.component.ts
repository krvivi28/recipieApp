import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { CommonModule } from "@angular/common";
import { AppService } from "../../services/app.service";
import { LoaderService } from "../../services/loader.service";
import { ToasterService } from "../../services/toaster.service";
import { MatDialog } from "@angular/material/dialog";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";

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
    private toaster: ToasterService,
    private dialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
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

  viewRecipieDetails(id: any) {
    this.dialog.open(RecipeDetailsComponent, {
      data: { id },
    });
  }

  editRecipie(id: any) {
    const dialogRef = this.dialog.open(RecipeFormComponent, {
      data: { id },
    });

    dialogRef.afterClosed().subscribe((res) => {
      this.appService.fetchAllRecipies();
    });
  }

  shareOnWhatsApp() {
    const message: string = "Check out this amazing link!";
    const url: string = "https://cubastion.com/";
    const encodedMessage: string = encodeURIComponent(message + " " + url);
    const whatsappUrl: string = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  }
}
