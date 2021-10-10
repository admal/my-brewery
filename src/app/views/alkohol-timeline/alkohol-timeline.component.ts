import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlcoholsService } from 'src/app/services/alcohols/alcohols.service';
import { map, switchMap, tap } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import * as dayjs from 'dayjs';
import { SlideOverDataContent, SlideOverService } from 'src/app/ui/slide-over.service';
import { AlcoholGroupedStageByDate, AlcoholTimelineData, AlkoholTimetableViewModel, RecipeStage } from './models';

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

            
          }),
          map(data => {
            let stages: RecipeStage[] = [];

            stages = data.recipe.stages.map((stage, idx) => {
              let stageDay = 0;
              for (let i = 0; i < idx; i++) {
                stageDay += data.recipe.stages[i].days;
              }

              return {
                date: dayjs(data.createdAt).add(stage.days, "day").toDate(),
                day: stageDay,
                name: stage.name,
                done: idx <= data.currentStageIndex,
                description: "TODO"
              }
            });

            let alcohol = {
              id: data.id,
              createdDate: data.createdAt,
              recipeName: data.recipe.name,
              stages: stages
            } as AlkoholTimetableViewModel;

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
          }),
          map(x => new AlcoholTimelineData(x))
        );

    setTimeout(_ => this.alcoholRefresh$.next()); //TEMPORARY HACK, TODO: MAKE IT PROPERLY
  }

  openDetails(name: string, groupedStage: AlcoholGroupedStageByDate) {
    let contents = groupedStage.stages.map(x => {
      return {
        header: x.name,
        content: x.description
      } as SlideOverDataContent
    });

    this.slideOverService.popSlideOver({
      title: name,
      contents: contents
    });
  }

  toggleDoneGroupedStage(alcoholId: number, groupedStage: AlcoholGroupedStageByDate) {
    // groupedStage.done = !groupedStage.done;
    // for (const stage of groupedStage.stages) {
    //   stage.done = groupedStage.done;
    // }
    if (groupedStage.done) {
      this.alcoholsService
        .markStageDone(alcoholId, groupedStage.lastStageIndex - 1)
        .then(_ => this.alcoholRefresh$.next());
    } else {
      this.alcoholsService
        .markStageDone(alcoholId, groupedStage.lastStageIndex)
        .then(_ => this.alcoholRefresh$.next());
    }
  }
}
