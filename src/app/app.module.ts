import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlkoholTimelineComponent } from './views/alkohol-timeline/alkohol-timeline.component';
import { RecipiesListComponent } from './views/recipies-list/recipies-list.component';
import { SidebarComponent } from './ui/sidebar/sidebar.component';
import { LoginComponent } from './views/login/login.component';
import { RecipeAddEditComponent } from './views/recipe-add-edit/recipe-add-edit.component';
import { AlkoholsListComponent } from './views/alkohols-list/alkohols-list.component';
import { AlkoholAddEditComponent } from './views/alkohol-add-edit/alkohol-add-edit.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SlideOverComponent } from './ui/slide-over/slide-over.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimaryLeftArrowButtonComponent } from './ui/primary-left-arrow-button/primary-left-arrow-button.component';
import { PrimaryRightArrowButtonComponent } from './ui/primary-right-arrow-button/primary-right-arrow-button.component';
import { HeaderComponent } from './ui/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AlkoholTimelineComponent,
    RecipiesListComponent,
    SidebarComponent,
    LoginComponent,
    RecipeAddEditComponent,
    AlkoholsListComponent,
    AlkoholAddEditComponent,
    FooterComponent,
    SlideOverComponent,
    PrimaryLeftArrowButtonComponent,
    PrimaryRightArrowButtonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
