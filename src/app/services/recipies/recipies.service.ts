import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';


export interface RecipeAddEditModel {
  id: number;
  name: string;
  litres: number;
  stages: RecipeStage[];
  ingredients: string[];
}

export interface RecipeStage {
  name: string;
  days: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  constructor() { }

  save(model: RecipeAddEditModel): Observable<boolean> {
    console.log("model", model);
    return of(true);
  }

  getAddEditModel(id: number): Observable<RecipeAddEditModel> {
    // if(id != undefined) {
      let ret = {
        id: id,
        ingredients: [
          "dupa ingredient",
          "asd",
          "Adssdada"
        ],
        litres: 10,
        name: "Beer",
        stages: [
          {
            days: 10,
            name: "Dupa"
          }
        ]
      } as RecipeAddEditModel;
  
      return of(ret);
    // }

    // let ret = {

    // } as RecipeAddEditModel;

    // return of(ret);
  }
}
