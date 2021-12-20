import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase/supabase.service';

@Component({
  selector: 'mb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private supabase: SupabaseService, private router: Router) { }

  ngOnInit(): void {
    console.log("this.supabase.isAuthenticated", this.supabase.isAuthenticated);
    setTimeout(() => {
      if (this.supabase.isAuthenticated) {
        this.router.navigate(["beer"]);
      }      
    }, 500);//HACK! Big hack to find out whether user is logged in. It must be fixed later.
  }

  loginGoogle() {
    this.supabase.signIn();
  }
}
