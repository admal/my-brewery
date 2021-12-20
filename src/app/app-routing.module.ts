import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard as AuthGuard } from './guards/auth-guard.guard';
import { AlkoholAddEditComponent } from './views/alkohol-add-edit/alkohol-add-edit.component';
import { AlkoholTimelineComponent } from './views/alkohol-timeline/alkohol-timeline.component';
import { AlkoholsListComponent } from './views/alkohols-list/alkohols-list.component';
import { LoginComponent } from './views/login/login.component';
import { RecipeAddEditComponent } from './views/recipe-add-edit/recipe-add-edit.component';
import { RecipiesListComponent } from './views/recipies-list/recipies-list.component';
import { RegisterComponent } from './views/register/register.component';
import { AppLayoutComponent } from './_layouts/app-layout/app-layout.component';

const routes: Routes = [
  //app layout routes
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "", redirectTo: "/beer", pathMatch: "full"
      },
      {
        path: "beer", component: AlkoholsListComponent, canActivate: [AuthGuard]
      },
      {
        path: "recipies", component: RecipiesListComponent, canActivate: [AuthGuard]
      },
      {
        path: "recipe/:id/edit", component: RecipeAddEditComponent, canActivate: [AuthGuard]
      },
      {
        path: "recipe/add", component: RecipeAddEditComponent, canActivate: [AuthGuard]
      },
      {
        path: "beer/:id/timeline", component: AlkoholTimelineComponent, canActivate: [AuthGuard]
      },
      {
        path: "beer/:id/edit", component: AlkoholAddEditComponent, canActivate: [AuthGuard]
      },
      {
        path: "beer/add", component: AlkoholAddEditComponent, canActivate: [AuthGuard]
      }
    ]
  },

  //no layout routes
  {
    path: "login", component: LoginComponent
  },
  //TODO: make proper registration
  // {
  //   path: "register", component: RegisterComponent
  // },
  {
    path: "**", component: AlkoholsListComponent //TODO: maybe add 404 page
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
