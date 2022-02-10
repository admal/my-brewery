import { Injectable } from '@angular/core';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { SupabaseService } from '../supabase/supabase.service';

export interface LoginModel {
  email: string;
  password: string;
}

export interface RegisterModel {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  email: string;
  lastLogin: Date;
  avatarUrl: string;
  updatedAt: Date;
}

export interface RegisterResult {
  success: boolean;
  error: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private supabase: SupabaseService) { }

  async login(model: LoginModel): Promise<User> {
    console.log("signin");
    const { user, session, error } = await this.supabase.getClient().auth.signIn({ email: model.email, password: model.password});
    if (error) {
      throw error;
    }
    console.log("user", user);
    console.log("session", session);
    return user;
  }

  async register(model: RegisterModel): Promise<RegisterResult> {
    const { error, data } = await this.supabase.getClient().auth.signUp({email: model.email, password: model.password});
    console.log("error", error);
    console.log("data", data);
    return {
      error: error?.message,
      success: error == null
    }
  }

  get user() {
    return this.supabase.getClient().auth.user();
  }

  get isAuthenticated(): boolean {
    return this.supabase.getClient().auth.user() != null;
  }

  get session() {
    return this.supabase.getClient().auth.session();
  }

  get profile() {
    return this.supabase.getClient()
      .from<Profile>('profiles')
      .select(`id, email, avatarUrl, lastLogin, updatedAt`)
      .eq('id', this.user?.id)
      .single();
  }

  private _profileExistsCache: boolean | null = null;
  
  async profileExists(): Promise<boolean> {
    console.log("_profileExistsCache", this._profileExistsCache);
    if (this._profileExistsCache != null) {
      return this._profileExistsCache;
    }

    if (!this.isAuthenticated) {
      return false;
    }

    const { data, error }= await this.supabase.getClient()
      .from("profiles")
      .select("id")
      .eq("id", this.user?.id)
      .single();

      if (error) {
        console.error("error", error);
      }
      this._profileExistsCache = data != null;

      console.log("_profileExistsCache", this._profileExistsCache);
      
      return this._profileExistsCache;
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.getClient().auth.onAuthStateChange(callback);
  }

  logOut() {
    return this.supabase.getClient().auth.signOut();
  }
}
