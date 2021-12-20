import { Injectable } from '@angular/core';
import { AuthChangeEvent, createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supbaseKey);
  }

  public getClient() {
    return this.supabase;
  }


  //maybe move auth to different service
  get user() {
    return this.supabase.auth.user();
  }

  get isAuthenticated() {
    return this.supabase.auth.user() != null;
  }

  get session() {
    return this.supabase.auth.session();
  }
  get profile() {
    return this.supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', this.user?.id)
      .single();
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  signIn() {
    return this.supabase.auth.signIn({ provider: "google" });
  }

  signOut() {
    return this.supabase.auth.signOut();
  }
}
