import { Router } from '@angular/router';
// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../tools/register.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.value;
      this.registerService.register(username, email, password).subscribe(
        response => {
          // Gérer ici la réponse de l'inscription
          this.router.navigate(['/login']);
        },
        error => {
          console.error(error);
          // Gérer ici les erreurs de l'inscription
        }
      );
    }
  }
}
