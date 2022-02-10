import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
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

  constructor(
    private supabase: SupabaseService,
    private auth: AuthService
  ) { }

  async save(model: RecipeAddEditModel): Promise<RecipeSaveResult> {
    //TODO: refactor that
    if (model.id > 0) {
      const { error } = await this.supabase.getClient().from("recipe").update(model).match({ id: model.id, profileId: this.auth.user.id });
      return {
        success: error == null
      };
    } else {
      delete model.id;
      
      let saveModel = {
        profileId: this.auth.user.id,
        ...model
      };

      const { error } = await this.supabase.getClient().from("recipe").insert(saveModel);
      return {
        success: error == null
      };
    }
  }

  async getAddEditModel(id: number): Promise<RecipeAddEditModel> {
    const { data, error } = await this.supabase.getClient()
      .from<RecipeAddEditModel>("recipe")
      .select()
      .match({ id: id, profileId: this.auth.user.id })
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async getSimple(): Promise<RecipieSimpleModel[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from("recipe")
      .select(`
        id,
        name
      `)
      .eq("profileId", this.auth.user.id);
    if (error) {
      throw error;
    }

    return data;
  }

  async getAll(): Promise<RecipeAddEditModel[]> {
    const { data, error } = await this.supabase.getClient()
      .from("recipe")
      .select()
      .eq("profileId", this.auth.user.id);;

    return data;
  }
}
