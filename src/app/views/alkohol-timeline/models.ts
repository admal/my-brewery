import * as dayjs from "dayjs";

export interface AlkoholTimetableViewModel {
    id: number;
    recipeName: string;
    stages: RecipeStage[],
    createdDate: Date;
}

export interface RecipeStage {
    day: number;
    date: Date;
    name: string;
    description: string;
    done: boolean;
}

export class AlcoholTimelineData {
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
            groupedStage.lastStageIndex = i;
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

export class AlcoholGroupedStageByDate {
    constructor(stageDate: dayjs.Dayjs) {
        this._date = stageDate;
        this.stages = [];
    }

    private _date: dayjs.Dayjs;
    get date(): Date {
        return this._date.toDate();
    }

    lastStageIndex: number;
    done: boolean = true;
    stages: RecipeStage[];
}
