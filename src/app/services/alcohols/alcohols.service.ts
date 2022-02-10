import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { SupabaseService } from '../supabase/supabase.service';


export interface AlcoholData {
  id: number;
  createdAt: Date;
  litres: number;
  currentStageIndex: number;
  recipe: AlcoholRecipeData;
}

export interface AlcoholRecipeData {
  id: number;
  name: string;
  stages: AlcoholRecipeStageData[];
}

export interface AlcoholRecipeStageData {
  name: string;
  days: number;
  description: string;
}
export interface AlcoholAddEditModel {
  id: number;
  recipeId: number;
  litres: number;
}

interface AlcoholDbModel {
  id: number;
  recipeId: number;
  litres: number;
  currentStageIndex: number;
}

export interface AlcoholSaveResult {
  success: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlcoholsService {

  constructor(
    private supabase: SupabaseService,
    private auth: AuthService
  ) { }

  async get(id: number): Promise<AlcoholData> {
    const { data, error } = await this.supabase.getClient()
      .from<AlcoholData>("alcohol")
      .select(`
        id,
        litres,
        createdAt,
        currentStageIndex,
        recipe:recipe (
          name,
          stages
        )
      `)
      .match({ id: id, profileId: this.auth.user.id })
      .single();

    return data;
  }

  async markStageDone(id: number, stageIndex: number): Promise<void> {
    const { error } = await this.supabase.getClient()
      .from("alcohol")
      .update({ currentStageIndex: stageIndex })
      .match({ id: id, profileId: this.auth.user.id });

      if (error) {
        throw error;
      }

      return;
  }

  async getEditModel(id: number): Promise<AlcoholAddEditModel> {
    const { data, error } = await this.supabase.getClient()
      .from<AlcoholAddEditModel>("alcohol")
      .select()
      .match({ id: id, profileId: this.auth.user.id  })
      .single();
    if (error) {
      throw error;
    }

    return data;
  }

  async save(model: AlcoholAddEditModel): Promise<AlcoholSaveResult> {
    //TODO: refactor that

    if (model.id > 0) {
      const { error } = await this.supabase.getClient()
        .from("alcohol")
        .update(model)
        .match({ id: model.id, profileId: this.auth.user.id  });

      return {
        success: error == null
      };

    } else {
      delete model.id;
      let saveModel = {
        profileId: this.auth.user.id,
        currentStageIndex: -1,
        ...model
      } as AlcoholDbModel;

      const { error } = await this.supabase.getClient().from("alcohol").insert(saveModel);
      return {
        success: error == null
      };
    }
  }

  async getAll(): Promise<AlcoholData[]> {
    const { data, error } = await this.supabase.getClient()
      .from("alcohol")
      .select(`
        id,
        litres,
        createdAt,
        currentStageIndex,
        recipe:recipe (
          id,
          name,
          stages
        )
    `)
    .eq("profileId", this.auth.user.id);

    return data;
  }

}
