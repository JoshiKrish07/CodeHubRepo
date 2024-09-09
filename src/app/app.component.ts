import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firbaseConfig';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // Initialize Firebase
 app = initializeApp(firebaseConfig);
}
