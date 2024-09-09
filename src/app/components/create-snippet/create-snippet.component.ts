import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbService } from '../../services/db.service';
import { Snippet } from '../../../models/snippetType';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-snippet',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-snippet.component.html',
  styleUrl: './create-snippet.component.css'
})
export class CreateSnippetComponent {
  isUpdate: boolean = false;
  constructor(private dbService: DbService, private toastr: ToastrService, private route: ActivatedRoute) {}
  snippetId: string = ""
  title = new FormControl("",[
    Validators.required
  ]);

  snippet = new FormControl("",[
    Validators.required
  ]);

  snippetForm = new FormGroup({
    title: this.title,
    snippet: this.snippet
  });

  ngOnInit() {
    this.route.params.subscribe(async(param) => {
      if(param['id']) {
        this.isUpdate = true;
        try {
          let data = await this.dbService.getSnippetById(param['id'])
          if(data) {
            this.snippetForm.patchValue({
              title: data['title'],
              snippet: data['snippet']
            })
          }
        } catch (error) {
          console.log("error in ngoninit in create snippet", error);
        }
      }
    })
  }

  async saveSnippet() {
    if (this.snippetForm.valid) {
      await this.dbService.createSnippet(this.snippetForm.value as Snippet);
    } else {
      this.toastr.error("Please fill all required fields.");
    }
  }
}
