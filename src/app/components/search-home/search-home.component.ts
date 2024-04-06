import { Component, OnInit } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { AppService } from "../../services/app.service";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";
import { citiesList } from "../../services/appConstatnts";

@Component({
  selector: "app-search-home",
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./search-home.component.html",
  styleUrl: "./search-home.component.css",
})
export class SearchHomeComponent implements OnInit {
  bgImage = "assets/images/vintage-old-rustic-cutlery-dark.jpg";
  cityControl = new FormControl("");
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(public appService: AppService) {}
  ngOnInit(): void {
    this.options = citiesList;
    this.filteredOptions = this.cityControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value || ""))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  handleSearchInput(val: any) {
    // console.log("search start" + val);
    this.appService.filteredRecipies = this.appService.allRecepies.filter(
      (el: any) => {
        return el.title.toLowerCase().includes(val.toLowerCase());
      }
    );
    setTimeout(() => {
      this.appService.isSearching.next(true);
    }, 50);
  }

  handleSearchBlur() {
    this.appService.isSearching.next(false);
  }
}
