import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-sanction-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule,
  ],
  templateUrl: './sanction-form.component.html',
  styleUrl: './sanction-form.component.scss'
})
export class SanctionFormComponent {
  collection = "sanction"
  formGroup: FormGroup;
  editor: Editor;
  html = '';

  constructor(
    private formBuilder: FormBuilder,
    public route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }



  ngOnInit() {

    this.editor = new Editor();

    this.formGroup = this.formBuilder.group({
      description: ['', Validators.required],
      comments: ['', Validators.required],
      athlete_id: this.route.snapshot.params['id']
    });
    this.createForm();
  }

   // make sure to destory the editor
   ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    console.log(this.route.snapshot.params)
    if (id) {
      console.log('hola')
      this.apiService.getData(this.collection + `/${id}`)
        .subscribe({
          next: (res: any) => {
            console.log(res)
            this.formGroup.patchValue({
              description: res.description,
              comments: res.comments,
            });
          },
          error: (err) => console.log(err),
          complete: () => { }
        });
    }

  }

  onSubmit() {
    console.log(this.formGroup)
    // let id = this.route.snapshot.params['id']
    // if (id) {
    //   this.apiService.putData(this.collection, id, this.formGroup.value)
    //     .subscribe((res: any) => {
    //       this.router.navigate(['admin', "athletes", this.route.snapshot.params['athlete_id'], this.collection])
    //     });
    // } else {
    //   this.apiService.postData(this.collection, this.formGroup.value)
    //     .subscribe((res: any) => {
    //       this.router.navigate(['admin', "athletes", this.route.snapshot.params['athlete_id'], this.collection])
    //     });
    // } 
  }


  onBack() {
    this.router.navigate(['admin', "athletes", this.route.snapshot.params['athlete_id'], this.collection]);
  }


}
