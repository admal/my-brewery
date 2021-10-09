import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeAddEditModel, RecipiesService } from 'src/app/services/recipies/recipies.service';

@Component({
  selector: 'mb-recipies-list',
  templateUrl: './recipies-list.component.html',
  styleUrls: ['./recipies-list.component.scss'],
})
export class RecipiesListComponent implements OnInit {
  recipes: RecipeAddEditModel[];

  constructor(private recipiesService: RecipiesService,
    private router: Router) {
    this.recipes = [
      {
        name: 'Duel Master Black IPA',
        id: 1,
        litres: 10,
        ingredients: ['water', 'barley'],
        stages: [
          { name: 'a', days: 1 },
          { name: 'a', days: 1 },
        ],
      },
    ];
  }

  ngOnInit(): void {}
}
