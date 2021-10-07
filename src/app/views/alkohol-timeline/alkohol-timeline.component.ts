import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlcoholsService, AlkoholTimetableViewModel, RecipeStage } from 'src/app/services/alcohols/alcohols.service';
import { map, switchMap, tap } from "rxjs/operators";
import { Observable } from 'rxjs';
import * as dayjs from 'dayjs';

class AlcoholTimelineData {
  constructor(data: AlkoholTimetableViewModel) {
    this.id = data.id;
    this.recipeName = data.recipeName;

    let createdDate = dayjs(data.createdDate);
    this._createdDate = createdDate;

    this.groupedStages = [];

    let lastGroupedStageDate = this._createdDate;

    let i = 0;
    let groupedStage = new AlcoholGroupedStageByDate(createdDate);
    this.groupedStages.push(groupedStage);
    
    do {
      let stage = data.stages[i];
      let stageDate = createdDate.add(stage.day, "day");

      if (stageDate.isSame(lastGroupedStageDate, "day") == false) {
        groupedStage = new AlcoholGroupedStageByDate(stageDate);
        lastGroupedStageDate = stageDate;
        this.groupedStages.push(groupedStage);
      }

      groupedStage.done = groupedStage.done && stage.done;
      groupedStage.stages.push(stage);
      i++;
    } while (i < data.stages.length);
  }

  id: number;
  recipeName: string;

  private _createdDate: dayjs.Dayjs;

  get createdDate(): Date {
    return this._createdDate.toDate();
  }

  groupedStages: AlcoholGroupedStageByDate[];
}

class AlcoholGroupedStageByDate {
  constructor(stageDate: dayjs.Dayjs) {
    this._date = stageDate;
    this.stages = [];
  }

  private _date: dayjs.Dayjs;
  get date(): Date {
    return this._date.toDate();
  }

  done: boolean = true;
  stages: RecipeStage[];
}

// class AlcoholStage {
//   day: number;
//   name: string;
//   description: string;
//   done: boolean;
// }

@Component({
  selector: 'mb-alkohol-timeline',
  templateUrl: './alkohol-timeline.component.html',
  styleUrls: ['./alkohol-timeline.component.scss']
})
export class AlkoholTimelineComponent implements OnInit {
  alcohol$: Observable<AlcoholTimelineData>;
  nowLinePosition: string = "50%";
  now: Date;

  constructor(
    private alcoholsService: AlcoholsService,
    private route: ActivatedRoute
  ) {
    this.now = new Date(); //TODO: get from server
  }

  ngOnInit(): void {
    this.alcohol$ = this.route.params
      .pipe(
        map(params => params["id"] as number),
        switchMap(alcoholId => {
          return this.alcoholsService.get(alcoholId)
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
  }

  openDetails(stage: RecipeStage) {
    console.log("stage", stage);//TODO: open modal
  }

  toggleDoneGroupedStage(groupedStage: AlcoholGroupedStageByDate) {
    groupedStage.done = !groupedStage.done;
    for (const stage of groupedStage.stages) {
      stage.done = groupedStage.done;
    }
  }
}
