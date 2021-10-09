import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlkoholAddEditComponent } from './views/alkohol-add-edit/alkohol-add-edit.component';
import { AlkoholTimelineComponent } from './views/alkohol-timeline/alkohol-timeline.component';
import { AlkoholsListComponent } from './views/alkohols-list/alkohols-list.component';
import { LoginComponent } from './views/login/login.component';
import { RecipeAddEditComponent } from './views/recipe-add-edit/recipe-add-edit.component';
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
    path: "recipe/:id/edit", component: RecipeAddEditComponent
  },
  {
    path: "recipe/add", component: RecipeAddEditComponent
  },
  {
    path: "beer/:id/timeline", component: AlkoholTimelineComponent
  },
  {
    path: "beer/:id/edit", component: AlkoholAddEditComponent
  },
  {
    path: "beer/add", component: AlkoholAddEditComponent
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
