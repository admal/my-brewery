import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';

export interface RegisterProfileResult {
  success: boolean;
  error: string;
}

export interface RegisterProfileModel {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private supabase: SupabaseService) { }

  async exists(email: string): Promise<boolean> {
    let result = await this.supabase.getClient()
      .from("profiles")
      .select(`id`)
      .eq("email", email);

    if (result.error) {
      throw result.error;
    }

    return result.data != null;
  }

  async registerProfile(model: RegisterProfileModel): Promise<RegisterProfileResult> {
    const saveData = {
      updatedAt: new Date(),
      ...model
    };

    const { error } = await this.supabase.getClient()
      .from("profiles")
      .insert(saveData)

    console.error("error", error);
    return {
      success: !error,
      error: error?.message
    }
  }
}
