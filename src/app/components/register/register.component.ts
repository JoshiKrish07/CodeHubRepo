import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor( private authService: AuthService) {}

  name = new FormControl("",[
    Validators.required,
  ]);

  email = new FormControl("",[
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)
  ]);

  password = new FormControl("",[
    Validators.required,
    Validators.minLength(6)
  ]);

  registerForm = new FormGroup({
    name: this.name,
    email: this.email,
    password: this.password
  });

  handleRegister(){
    this.authService.registerUser(this.registerForm.value.email, this.registerForm.value.password);
  }
}
