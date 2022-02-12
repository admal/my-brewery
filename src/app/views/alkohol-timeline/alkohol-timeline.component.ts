import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlcoholsService } from 'src/app/services/alcohols/alcohols.service';
import { map, switchMap, tap } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import * as dayjs from 'dayjs';
import { SlideOverService } from 'src/app/ui/slide-over.service';
import { AlcoholTimelineData, AlcoholStage } from './models';

@Component({
  selector: 'mb-alkohol-timeline',
  templateUrl: './alkohol-timeline.component.html',
  styleUrls: ['./alkohol-timeline.component.scss']
})
export class AlkoholTimelineComponent implements OnInit {
  alcoholRefresh$ = new Subject<void>();
  alcohol$: Observable<AlcoholTimelineData>;
  nowLinePosition: string = "50%";
  now: Date;

  constructor(
    private alcoholsService: AlcoholsService,
    private route: ActivatedRoute,
    private slideOverService: SlideOverService
  ) {
  }

  //tmp
  private _clamp(x: number): number {
    if (x < 0) {
      return 0;
    }
    return x;
  }

  ngOnInit(): void {
    this.alcohol$ =
      this.alcoholRefresh$
        .pipe(
          tap(_ => this.now = new Date()),
          switchMap(_ => this.route.params),
          map(params => params["id"] as number),
          switchMap(alcoholId => {
            return this.alcoholsService.get(alcoholId)
          }),
          tap(data => {
            let currentStage = data.currentStageIndex;
            let nextStage = data.currentStageIndex + 1;

            if (nextStage >= data.recipe.stages.length) {
              this.nowLinePosition = "100%";
              return;
            }

            let allStagesCount = data.recipe.stages.length;
            let percentage = this._clamp(currentStage-1)/allStagesCount * 100 + 5;
            this.nowLinePosition = `${percentage}%`;
          }),
          map(data => {
            let stages: AlcoholStage[] = [];

            stages = data.recipe.stages.map((stage, idx) => {
              let stageDay = 0;
              for (let i = 0; i < idx; i++) {
                stageDay += data.recipe.stages[i].days;
              }

              return {
                index: idx,
                date: dayjs(data.createdAt).add(stage.days, "day").toDate(),
                day: stageDay,
                name: stage.name,
                done: idx <= data.currentStageIndex,
                description: stage.description
              }
            });
            console.log("stages", stages);
            let alcohol = {
              id: data.id,
              createdDate: dayjs(data.createdAt),
              recipeName: data.recipe.name,
              stages: stages
            } as AlcoholTimelineData;

            return alcohol;
          }),
          tap(x => {
            let nowParsed = dayjs(this.now);
            let lastDate = dayjs(x.stages[x.stages.length - 1].date);
            let createdDate = dayjs(x.createdDate);

            console.log("nowParsed", nowParsed.toISOString());
            console.log("lastDate", lastDate.toISOString());
            console.log("createdDate", createdDate.toISOString());

            let durationInDays = lastDate.diff(createdDate, "days");
            let nowFromStartDiff = nowParsed.diff(createdDate, "days");

            console.log("durationInDays", durationInDays);
            console.log("nowFromStartDiff", nowFromStartDiff);

            // this.nowLinePosition = `${nowFromStartDiff / durationInDays * 100}%`;//TODO: fix
          })
        );

    setTimeout(_ => this.alcoholRefresh$.next()); //TEMPORARY HACK, TODO: MAKE IT PROPERLY
  }

  openDetails(recipeName: string, stage: AlcoholStage) {
    let convertedDate = dayjs(stage.date).format("DD/MM/YYYY"); //TODO: add proper date format
    let contents = [
      {
        header: `${stage.name} (${convertedDate})`,
        content: stage.description ? stage.description : "No description was provided"
      }
    ];
    this.slideOverService.popSlideOver({
      title: recipeName,
      contents: contents
    });
  }

  toggleDoneGroupedStage(alcoholId: number, stage: AlcoholStage) {
    if (stage.done) {
      //mark as undone
      this.alcoholsService
        .markStageDone(alcoholId, stage.index - 1)
        .then(_ => this.alcoholRefresh$.next());      
    } else {
      //mark as done
      this.alcoholsService
      .markStageDone(alcoholId, stage.index)
      .then(_ => this.alcoholRefresh$.next());    
    }
  }
}
