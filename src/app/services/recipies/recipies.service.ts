import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { from, observable, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SupabaseService } from '../supabase/supabase.service';


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
  description: string;
}

export interface RecipeSaveResult {
  success: boolean;
}

export interface RecipieSimpleModel {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {

  constructor(private supabase: SupabaseService) { }

  async save(model: RecipeAddEditModel): Promise<RecipeSaveResult> {
    console.log("model", model);

    //TODO: refactor that
    if (model.id > 0) {
      const { error } = await this.supabase.getClient().from("recipe").update(model).match({ id: model.id });
      return {
        success: error == null
      };
    } else {
      delete model.id;
      const { error } = await this.supabase.getClient().from("recipe").insert(model);
      return {
        success: error == null
      };
    }
  }

  async getAddEditModel(id: number): Promise<RecipeAddEditModel> {
    console.log("id", id);

    const { data, error } = await this.supabase.getClient().from<RecipeAddEditModel>("recipe").select().match({ id: id }).single();
    if (error) {
      throw error;
    }
    
    return data;
  }

  async getSimple(): Promise<RecipieSimpleModel[]> {
    const {data, error} = await this.supabase
      .getClient()
      .from<RecipieSimpleModel>("recipe")
      .select(`
        id,
        name
      `);
    if (error) {
      throw error;
    }

    return data;
  }

  async getAll(): Promise<RecipeAddEditModel[]> {
    const { data, error } = await this.supabase.getClient()
    .from<RecipeAddEditModel>("recipe");
    console.log("data", data)

    return data;
  }
}
