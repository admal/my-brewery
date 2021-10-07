import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlkoholTimelineComponent } from './views/alkohol-timeline/alkohol-timeline.component';
import { AlkoholsListComponent } from './views/alkohols-list/alkohols-list.component';
import { LoginComponent } from './views/login/login.component';
import { RecipiesListComponent } from './views/recipies-list/recipies-list.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "beer", component: AlkoholsListComponent
  },
  {
    path: "recipies", component: RecipiesListComponent
  },
  {
    path: "beer/:id/timeline", component: AlkoholTimelineComponent
  },
  {
    path: "", redirectTo: "/beer", pathMatch: "full"
  },
  {
    path: "**", component:AlkoholsListComponent //TODO: maybe add 404 page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
