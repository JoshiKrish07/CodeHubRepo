import { Component } from '@angular/core';
import { DbService } from '../../services/db.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Snippet } from '../../../models/snippetType';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items?: any = [];
  constructor(private dbService: DbService, private router: Router, private authService: AuthService, private toastr: ToastrService) {}

  ngOnInit() {
    this.dbService.getAllSnippets().then((data) => {
      this.items = data;
    })
  }

  navigateToSnippet(id: string, snippet: any) {
    if(snippet['by'] == this.authService.getUid()) {
      this.router.navigate([`/snippet/${id}`])
    } else {
      this.toastr.error("You are not allowed to edit this snippet");
    }
  }

}
