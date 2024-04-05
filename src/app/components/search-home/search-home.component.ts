import { Component } from "@angular/core";
import { MaterialModule } from "../../material/material.module";
import { AppService } from "../../services/app.service";

@Component({
  selector: "app-search-home",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./search-home.component.html",
  styleUrl: "./search-home.component.css",
})
export class SearchHomeComponent {
  constructor(public appService: AppService) {}
}
