import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { RecipeAddEditModel, RecipeSaveResult, RecipiesService } from 'src/app/services/recipies/recipies.service';
import { AlertService } from 'src/app/ui/alert/alert.service';
import { ModalService } from 'src/app/ui/modal/modal.service';

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
  $currentStageEdited: BehaviorSubject<CurrentStageData>;

  editStageModalId = "editStageModal";

  saving = false; //TODO: make more reactive

  constructor(
    private fb: FormBuilder,
    private recipiesService: RecipiesService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private alertService: AlertService
  ) {
    this.$currentStageEdited = new BehaviorSubject<CurrentStageData>(null);

    this.recipeForm = this.fb.group({
      id: [""],
      name: ["", Validators.required],
      litres: ["", [Validators.required, Validators.min(0)]],
      stages: this.fb.array([
        this.fb.group({
          name: ["Prepare ingredients", Validators.required],
          days: [0, Validators.required],
          description: [""]
        }),
        this.fb.group({
          name: ["It is ready!", Validators.required],
          days: [14, Validators.required],
          description: [""]
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
      tap(_ => {
        if (this.recipeForm.invalid) {
          this.recipeForm.markAllAsTouched();
        }
      }),
      filter(x => this.recipeForm.valid),
      map(_ => this.recipeForm.value as RecipeAddEditModel),
      tap(_ => this.saving = true),
      switchMap(x => this.recipiesService.save(x)),
      tap(_ => this.saving = false),
      tap(_ => this.alertService.success("Recipe has been saved successfully!")),
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
                days: [stage.days, Validators.required],
                description: [stage.description]
              }));
            }
          })
        )
        .subscribe();
  }

  get recipeName() {
    return this.recipeForm.get("name");
  }

  get litres() {
    return this.recipeForm.get("litres");
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
    this.saveClick$.next();
  }

  get isNew() {
    return this.recipeForm.get("id").value == ""; //hack, should be done better
  }

  getRecipeStage(i: number) {
    return this.stages[i];
  }

  ngOnDestroy(): void {
    this.setFormValueSubscription.unsubscribe();
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  openStageModal(stageIdx: number = null) {
    let isNew = stageIdx == null;

    if (stageIdx == null) {
      this.stages.push(
        this.fb.group({
          name: ["", Validators.required],
          days: [0, [Validators.required, Validators.min(0)]],
          description: [""]
        }));
      stageIdx = this.stages.length - 1;
    }

    let stage = this.stages.controls[stageIdx];
    this.$currentStageEdited.next({
      stageIdx: stageIdx,
      stage: stage,
      isNew: isNew,
      previousValue: this.stages.controls[stageIdx].value
    });
    this.modalService.open(this.editStageModalId);
  }

  get currentStageDays() {
    return this.$currentStageEdited.value.stage.get("days");
  }

  get currentStageName() {
    return this.$currentStageEdited.value.stage.get("name");
  }

  saveCurrentStage() {
    let currentEditedStage = this.$currentStageEdited.value;

    if (currentEditedStage.stage.valid == false) {
      currentEditedStage.stage.markAllAsTouched();
      return;
    }

    this.modalService.close(this.editStageModalId);
    this.$currentStageEdited.next(null);
  }

  cancelCurrentStage() {
    let currentEditedStage = this.$currentStageEdited.value;

    if (currentEditedStage.isNew) {
      //new stage && cancel modal, just remove it
      this.stages.controls.splice(currentEditedStage.stageIdx, 1);
    } else {
      //existing stage && cancel modal, reset value to the old one
      console.log("currentEditedStage", currentEditedStage);
      this.stages.controls[currentEditedStage.stageIdx].setValue(currentEditedStage.previousValue);
    }

    this.$currentStageEdited.next(null);
    this.modalService.close(this.editStageModalId);
  }
}

interface CurrentStageData {
  stageIdx: number;
      stage: AbstractControl;
      isNew: boolean;
      previousValue: any;
}