import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  RecipeAddEditModel,
  RecipiesService,
} from 'src/app/services/recipies/recipies.service';

@Component({
  selector: 'mb-recipies-list',
  templateUrl: './recipies-list.component.html',
  styleUrls: ['./recipies-list.component.scss'],
})
export class RecipiesListComponent implements OnInit {
  recipes: RecipeAddEditModel[];

  constructor(private recipiesService: RecipiesService) {}

  ngOnInit(): void {
    from(this.recipiesService.getAll()).subscribe((recipes) => {
      this.recipes = recipes;
    });
  }
}
