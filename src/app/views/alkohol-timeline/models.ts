import * as dayjs from "dayjs";

export interface AlkoholTimetableViewModel {
  id: number;
  recipeName: string;
  stages: AlcoholStage[],
  createdDate: Date;
}

export interface AlcoholStage {
  index: number;
  day: number;
  date: Date;
  name: string;
  description: string;
  done: boolean;
}

export interface AlcoholTimelineData {
  id: number;
  recipeName: string;
  createdDate: dayjs.Dayjs;

  stages: AlcoholStage[];
}