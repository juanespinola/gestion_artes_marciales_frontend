import { Component } from '@angular/core';
import { MaterialModule } from '../../../../components/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../utils/api.service';
import { Editor, NgxEditorModule } from 'ngx-editor';

@Component({
  selector: 'app-event-form-content',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEditorModule
  ],
  templateUrl: './event-form-content.component.html',
  styleUrl: './event-form-content.component.scss'
})
export class EventFormContentComponent {
  collection = "event"
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
      // introduction: [''],
      content: [''],
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
              // introduction: res.introduction,
              content: res.content,
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
      this.apiService.putData('eventcontent', id, this.formGroup.value)
        .subscribe((res: any) => {
          // this.router.navigate(['admin', 'event'])
          console.log(res)
        });
    }
  }


  onBack() {
    this.router.navigate(['admin', 'events']);
  }
}
