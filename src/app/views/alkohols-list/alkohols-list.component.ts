import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlcoholsService } from 'src/app/services/alcohols/alcohols.service';

export interface AlcoholListModel {
  id: number;
  recipeId: number;
  recipeName: string;
  litres: number;
  currentStageName: string;
  nextStageName: string;
  nextStageInDays: number;
}
@Component({
  selector: 'mb-alkohols-list',
  templateUrl: './alkohols-list.component.html',
  styleUrls: ['./alkohols-list.component.scss']
})
export class AlkoholsListComponent implements OnInit {
  alcohols$: Observable<AlcoholListModel[]>;

  constructor(
    private alcoholService: AlcoholsService
  ) { }

  //tmp
  private _clamp(x: number): number {
    if (x < 0) {
      return 0;
    }
    return x;
  }

  ngOnInit(): void {
    this.alcohols$ = from(this.alcoholService.getAll())
      .pipe(
        map(data => {
          let alcohols = data.map(x => {

            let currentStage = x.recipe.stages[this._clamp(x.currentStageIndex)];
            let nextStage = x.currentStageIndex + 1 < x.recipe.stages.length ? x.recipe.stages[x.currentStageIndex + 1] : null;

            let currentStageFullDays = 0;
            for (let i = 0; i <= x.currentStageIndex; i++) {
              currentStageFullDays += x.recipe.stages[i].days;
            }

            let currentStageDate = dayjs(x.createdAt).add(currentStageFullDays, "day");
            let nextStageDate = currentStageDate.add(nextStage?.days, "days");
            let nextStageInDays = this._clamp(nextStageDate.diff(new Date(), "days"));

            return {
              id: x.id,
              litres: x.litres,
              recipeName: x.recipe.name,
              recipeId: x.recipe.id,
              currentStageName: currentStage.name,
              nextStageName: nextStage != null ? nextStage.name : null,
              nextStageInDays: nextStage != null ? nextStageInDays : 0,
              createdDate: x.createdAt
            } as AlcoholListModel;
          });
          return alcohols;
        })
      );
  }

}
