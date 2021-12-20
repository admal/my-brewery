import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private supabase: SupabaseService) {
    console.log("user", supabase.session?.user?.email);
  }
  title = 'my-brewery-frontend';
}
