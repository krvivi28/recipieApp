import { Component, OnInit } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { AppService } from "../../services/app.service";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { map, Observable, startWith } from "rxjs";
import { AsyncPipe, CommonModule } from "@angular/common";
import { citiesList } from "../../services/appConstatnts";

@Component({
  selector: "app-search-home",
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: "./search-home.component.html",
  styleUrl: "./search-home.component.css",
})
export class SearchHomeComponent implements OnInit {
  bgImage = "assets/images/vintage-old-rustic-cutlery-dark.jpg";
  cityControl = new FormControl("");
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  searchKeyword: any;

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

  handleSearchInput() {
    // console.log("search start" + val);
    this.appService.filteredRecipies = this.appService.allRecepies.filter(
      (el: any) => {
        return el.title
          .toLowerCase()
          .includes(this.searchKeyword.toLowerCase());
      }
    );
    setTimeout(() => {
      this.appService.isSearching.next(true);
    }, 50);
  }

  handleSearchBlur() {
    if (!this.searchKeyword) {
      this.appService.isSearching.next(false);
    }
  }
}
