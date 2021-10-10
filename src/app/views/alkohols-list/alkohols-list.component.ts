import { Component, OnInit } from '@angular/core';
import * as dayjs from 'dayjs';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlcoholsService } from 'src/app/services/alcohols/alcohols.service';

export interface AlcoholListModel {
  id: number;
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

  ngOnInit(): void {
    this.alcohols$ = from(this.alcoholService.getAll())
      .pipe(
        map(data => {
          let alcohols = data.map(x => {
            let currentStage = x.recipe.stages[x.currentStageIndex];
            let nextStage = x.currentStageIndex + 1 < x.recipe.stages.length ? x.recipe.stages[x.currentStageIndex + 1] : null;

            let currentStageFullDays = 0;
            for (const stage of x.recipe.stages) {
              currentStageFullDays += stage.days;
            }
            let currentStageDate = dayjs(x.createdAt).add(currentStageFullDays, "day");

            let nextStageDate = currentStageDate.add(nextStage.days);
            let nextStageInDays = nextStageDate.diff(new Date(), "days");

            return {
              id: x.id,
              litres: x.litres,
              recipeName: x.recipe.name,
              currentStageName: currentStage.name,
              nextStageName: nextStage != null ? nextStage.name : null,
              nextStageInDays: nextStage != null ? nextStageInDays : 0
            } as AlcoholListModel;
          });
          return alcohols;
        })
      );
  }

}
