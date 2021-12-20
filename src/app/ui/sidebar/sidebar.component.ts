import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'mb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private supabase: SupabaseService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("logout");
    this.supabase.signOut();
    this.router.navigate(["login"]);
  }

}
