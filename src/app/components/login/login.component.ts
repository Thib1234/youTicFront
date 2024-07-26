import { AuthService } from './../../tools/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log('Form submitted:', this.loginForm.value);

    if (this.loginForm.valid) {
        const { username, password } = this.loginForm.value;
        this.authService.login(username, password).subscribe(
            response => {
                console.log('Login successful:', response);
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.error('Login failed:', error);
                // Afficher un message d'erreur à l'utilisateur
                alert(error.message || 'Login failed');
            }
        );
    }
}

}
