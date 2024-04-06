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

import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppService } from "../../services/app.service";
import { Observable } from "rxjs";
import { ToasterService } from "../../services/toaster.service";
import { LoaderService } from "../../services/loader.service";

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
  recipieFormDialogRef!: any;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    public appService: AppService,
    private http: HttpClient,
    private toaster: ToasterService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.initRecipieForm();
    // this.fetchCountriesList();
    // this.fetchCategoriesList();
  }

  openDialog() {
    this.recipieFormDialogRef = this.dialog.open(this.newRecipeForm, {
      // height: "80%",
      width: "60%",
    });
    this.recipieFormDialogRef.afterClosed().subscribe((res: any) => {
      this.appService.fetchAllRecipies();
    });
  }

  handleAddRecipe() {
    if (this.recipieForm.valid) {
      this.postNewRecipie();
      this.recipieFormDialogRef.close();
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
}
