import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { AppService } from "../../services/app.service";
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {

  recipieForm!: FormGroup;
  recipieFormDialogRef!: any;

  constructor(private dialog: MatDialog, public appService: AppService) {}

  ngOnInit(): void {}

  openDialog() {
    this.recipieFormDialogRef = this.dialog.open(RecipeFormComponent, {
      width: "60%",
    });
    this.recipieFormDialogRef.afterClosed().subscribe((res: any) => {
      this.appService.fetchAllRecipies();
    });
  }
}
