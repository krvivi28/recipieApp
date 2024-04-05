import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../services/loader.service";
import { MaterialModule } from "../../material/material.module";

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [MaterialModule],
  templateUrl: "./loader.component.html",
  styleUrl: "./loader.component.css",
})
export class LoaderComponent implements OnInit {
  isLoading!: boolean;

  constructor(public loaderService: LoaderService) {}

  ngOnInit(): void {}
}
