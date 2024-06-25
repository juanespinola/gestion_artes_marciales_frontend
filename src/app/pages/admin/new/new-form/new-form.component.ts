import { Component } from '@angular/core';
import { MaterialModule } from '../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Editor, NgxEditorModule } from 'ngx-editor';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';

@Component({
  selector: 'app-new-form',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './new-form.component.html',
  styleUrl: './new-form.component.scss'
})
export class NewFormComponent {
  collection = "new"
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
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['']
    });
    this.createForm();
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  createForm() {
    let id = this.route.snapshot.params['id']
    if (id) {
      this.apiService.getData(this.collection + `/${id}`)
        .subscribe({
          next: (res: any) => {
            this.formGroup.patchValue({
              title: res.title,
              content: res.content,
              status: res.status
            });
          },
          error: (err) => console.log(err),
          complete: () => { }
        });
    }

  }

  onSubmit() {
    console.log(this.formGroup)
    let id = this.route.snapshot.params['id']
    if (id) {
      this.apiService.putData(this.collection, id, this.formGroup.value)
        .subscribe((res: any) => {
          this.router.navigate(['admin', this.collection])
        });
    } else {
      this.apiService.postData(this.collection, this.formGroup.value)
        .subscribe((res:any) => {
          // console.log(res)
          this.router.navigate(["admin", this.collection])
        });
    }
  }


  onBack() {
    this.router.navigate(['admin', 'new']);
  }
}
