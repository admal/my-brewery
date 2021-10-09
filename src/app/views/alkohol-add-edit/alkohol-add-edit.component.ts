import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mb-alkohol-add-edit',
  templateUrl: './alkohol-add-edit.component.html',
  styleUrls: ['./alkohol-add-edit.component.scss']
})
export class AlkoholAddEditComponent implements OnInit {
  alcoholForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.route.params
    //   .pipe(
    //     map(params => params["id"] as number | undefined)

    //   )
    this.alcoholForm = this.fb.group(
      {
        
      }
    )
  }

}
