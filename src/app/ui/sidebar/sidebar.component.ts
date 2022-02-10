import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'mb-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    console.log("logout");
    this.auth.logOut();
    this.router.navigate(["login"]);
  }

}
