import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { MatDialog } from "@angular/material/dialog";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { HttpClientModule } from "@angular/common/http";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit {
  @ViewChild("addNewRecipeForm") newRecipeForm!: TemplateRef<any>;
  title: string = "";
  newRecipeData: any;
  recipieForm!: FormGroup;
  value = 1;
  countriesList: any;
  recipieCategories: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public appService: AppService
  ) {}

  ngOnInit(): void {
    this.initRecipieForm();
    // this.fetchCountriesList();
    // this.fetchCategoriesList();
  }

  openDialog() {
    this.dialog.open(this.newRecipeForm, {
      // height: "80%",
      width: "60%",
    });
  }

  handleAddRecipe(form: any) {
    console.log(form.value);
    this.newRecipeData = form.value;
  }
  handleChange(val: any) {
    console.log("val", val);
  }

  initRecipieForm() {
    this.recipieForm = this.fb.group({
      title: ["", [Validators.required]],
      description: ["", [Validators.required]],
      category: ["", [Validators.required]],
      imageUrl: ["", [Validators.required]],
      servings: [1, [Validators.required]],
      ingredients: this.fb.array([this.getNewIngredientsForm()]),
      steps: this.fb.array([this.getNewInstructionForm()]),
      chefDetails: this.fb.group({
        name: ["", [Validators.required]],
        age: ["", [Validators.required]],
        experience: ["", [Validators.required]],
        dateOfBirth: ["", [Validators.required]],
        contact: this.fb.group({
          email: ["", [Validators.required]],
          mobile: ["", [Validators.required]],
          country: ["", [Validators.required]],
        }),
      }),
      published: [""],
    });
  }

  get ingredientsFormArray(): FormArray {
    return this.recipieForm.get("ingredients") as FormArray;
  }

  get instructionsFormArray(): FormArray {
    return this.recipieForm.get("steps") as FormArray;
  }

  getNewIngredientsForm = () => {
    return this.fb.group({
      name: [""],
      quantity: [""],
      notes: [""],
    });
  };

  getNewInstructionForm = () => {
    return this.fb.group({
      step: [""],
    });
  };

  addNewIngredient() {
    this.ingredientsFormArray.push(this.getNewIngredientsForm());
  }

  addNewInstruction() {
    this.instructionsFormArray.push(this.getNewInstructionForm());
  }
}
