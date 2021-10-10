import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { RecipeAddEditModel, RecipeSaveResult, RecipiesService } from 'src/app/services/recipies/recipies.service';

@Component({
  selector: 'mb-recipe-add-edit',
  templateUrl: './recipe-add-edit.component.html',
  styleUrls: ['./recipe-add-edit.component.scss']
})
export class RecipeAddEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  saveClick$ = new Subject<void>();
  saveResult$: Observable<RecipeSaveResult>;
  setFormValueSubscription: Subscription;

  saving = false; //TODO: make more reactive

  constructor(
    private fb: FormBuilder,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.recipeForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      litres: ["", Validators.required],
      stages: this.fb.array([
        this.fb.group({
          name: ["Prepare ingredients", Validators.required],
          days: [0, Validators.required]
        }),
        this.fb.group({
          name: ["It is ready!", Validators.required],
          days: [14, Validators.required]
        })
      ], [Validators.required]),
      ingredients: this.fb.array([
        this.fb.control("")
      ], [Validators.required])
    });
  }

  ngOnInit(): void {

    this.saveResult$ = this.saveClick$.pipe(
      tap(_ => console.log("valid", this.recipeForm.valid)),
      filter(x => this.recipeForm.valid),
      map(_ => this.recipeForm.value as RecipeAddEditModel),
      tap(_ => this.saving = true),
      switchMap(x => this.recipiesService.save(x)),
      tap(_ => this.saving = false),
      tap(_ => this.router.navigate(["/recipies"]))
    );

    this.setFormValueSubscription =
      this.route.params
        .pipe(
          filter(params => params["id"] != null),
          map(params => params["id"] as number),
          switchMap(id => this.recipiesService.getAddEditModel(id)),
          tap(x => {
            this.recipeForm.get("id").setValue(x.id);
            this.recipeForm.get("name").setValue(x.name);
            this.recipeForm.get("litres").setValue(x.litres);

            this.ingredients.clear();
            for (const ingredient of x.ingredients) {
              this.ingredients.push(this.fb.control(ingredient, [Validators.required]));
            }

            this.stages.clear();
            for (const stage of x.stages) {
              this.stages.push(this.fb.group({
                name: [stage.name, Validators.required],
                days: [stage.days]
              }));
            }
          })
        )
        .subscribe();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get("ingredients") as FormArray;
  }

  get stages(): FormArray {
    return this.recipeForm.get("stages") as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control("", [Validators.required]));
  }

  addStage() {
    this.stages.push(
      this.fb.group({
        name: ["", Validators.required],
        days: [0]
      }));
  }

  removeStage(i: number) {
    this.stages.removeAt(i);
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  save() {
    //TODO: refactor
    if (this.recipeForm.invalid) {
      alert("Please fill all required fields.")
    }
    this.saveClick$.next();
  }

  get isNew() {
    return this.recipeForm.get("id").value == ""; //hack, should be done better
  }

  ngOnDestroy(): void {
    this.setFormValueSubscription.unsubscribe();
  }
}
