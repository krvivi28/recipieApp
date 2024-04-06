import { Component, Inject, OnInit } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { AppService } from "../../services/app.service";
import { HttpClient } from "@angular/common/http";
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { LoaderService } from "../../services/loader.service";
import { ToasterService } from "../../services/toaster.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: "app-recipe-form",
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./recipe-form.component.html",
  styleUrl: "./recipe-form.component.css",
})
export class RecipeFormComponent implements OnInit {
  recipieForm!: FormGroup;
  countriesList: any;
  recipieCategories: any;
  recipieFormDialogRef!: any;

  constructor(
    private fb: FormBuilder,
    public appService: AppService,
    private toaster: ToasterService,
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<RecipeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string | number }
  ) {}

  ngOnInit(): void {
    this.initRecipieForm();
    if (this.data) {
      const formData = this.appService.allRecepies.find((recipie: any) => {
        return recipie.id === this.data.id;
      });
      if (formData) {
        this.recipieForm.patchValue(formData);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  handleAddUpdateRecipe() {
    if (this.recipieForm.valid) {
      if (this.data) {
        this.updateRecipie();
      } else {
        this.postNewRecipie();
      }
      this.closeDialog();
    } else {
      this.toaster.warning("Please enter requied input details");
    }
  }

  initRecipieForm() {
    this.recipieForm = this.fb.group({
      title: ["", []],
      description: ["", []],
      category: ["", []],
      imageUrl: ["", []],
      servings: [1, []],
      ingredients: this.fb.array([this.getNewIngredientsForm()]),
      steps: this.fb.array([this.getNewInstructionForm()]),
      chefDetails: this.fb.group({
        name: ["", []],
        age: ["", []],
        experience: ["", []],
        dateOfBirth: ["", []],
        contact: this.fb.group({
          email: ["", []],
          mobile: ["", []],
          country: ["", []],
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

  postNewRecipie() {
    this.loaderService.isLoading.set(true);
    this.appService.path = this.appService.baseUrl + "/recipies";
    this.appService.postServiceRequest(this.recipieForm.value).subscribe({
      next: (res) => {
        this.toaster.success("Recipie added successfully");
        this.loaderService.isLoading.set(false);
      },
      error: (err) => {
        this.toaster.error(`Error ${err.message}`);
        this.loaderService.isLoading.set(false);
      },
    });
  }

  updateRecipie() {
    this.loaderService.isLoading.set(true);
    this.appService.path =
      this.appService.baseUrl + `/recipies/${this.data.id}`;
    this.appService.putServiceRequest(this.recipieForm.value).subscribe({
      next: (res) => {
        this.toaster.success("Recipie updated successfully");
        this.loaderService.isLoading.set(false);
      },
      error: (err) => {
        this.toaster.error(`Error ${err.message}`);
        this.loaderService.isLoading.set(false);
      },
    });
  }
}
