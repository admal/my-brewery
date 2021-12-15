import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AlcoholAddEditModel, AlcoholSaveResult, AlcoholsService } from 'src/app/services/alcohols/alcohols.service';
import { RecipieSimpleModel, RecipiesService } from 'src/app/services/recipies/recipies.service';

@Component({
  selector: 'mb-alkohol-add-edit',
  templateUrl: './alkohol-add-edit.component.html',
  styleUrls: ['./alkohol-add-edit.component.scss']
})
export class AlkoholAddEditComponent implements OnInit, OnDestroy {
  alcoholForm: FormGroup;
  saving = false; //TODO: make more reactive
  saveClick$ = new Subject<void>();
  saveResult$: Observable<AlcoholSaveResult>; //change to result
  recipies$: Observable<RecipieSimpleModel[]>;
  setFormValueSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipiesService: RecipiesService,
    private alcoholsService: AlcoholsService
  ) {
    this.alcoholForm = this.fb.group(
      {
        id: [""],
        recipeId: [null, Validators.required],
        litres: [0, [Validators.required, Validators.min(0)]]
      }
    );
  }

  ngOnInit(): void {
    this.recipies$ = from(this.recipiesService.getSimple());

    this.saveResult$ = this.saveClick$.pipe(
      tap(_ => {
        if (this.alcoholForm.invalid) {
          this.alcoholForm.markAllAsTouched();
        }
      }),
      filter(x => this.alcoholForm.valid),
      map(_ => this.alcoholForm.value as AlcoholAddEditModel),
      tap(_ => this.saving = true),
      switchMap(x => this.alcoholsService.save(x)),
      tap(_ => this.saving = false),
      tap(_ => this.router.navigate(["/beer"]))
    );

    //TODO: maybe add some notification

    this.setFormValueSubscription =
      this.route.params.pipe(
        filter(params => params["id"] != null),
        map(params => params["id"] as number),
        switchMap(id => this.alcoholsService.getEditModel(id)),
        tap(x => {
          this.alcoholForm.get("id").setValue(x.id);
          this.alcoholForm.get("recipeId").setValue(x.recipeId);
          this.alcoholForm.get("litres").setValue(x.litres);
        })
      )
        .subscribe();
  }

  get litres() {
    return this.alcoholForm.get("litres");
  }

  get recipeId() {
    return this.alcoholForm.get("recipeId");
  }

  get isNew() {
    return this.alcoholForm.get("id").value == ""; //hack, should be done better
  }

  save() {
    this.saveClick$.next();
  }

  ngOnDestroy(): void {
    this.setFormValueSubscription.unsubscribe();
  }
}
