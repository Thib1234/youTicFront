import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../tools/register.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  isCompanyInfoLoaded: boolean = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private http: HttpClient) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      nom_societe: [''],
      num_bce: [''],
      adresse: [''],
      ville: [''],
      code_postal: [''],
      telephone: ['']
    });
  }

  onBceChange() {
    console.log('onBceChange called');
    const num_bceControl = this.registerForm.get('num_bce');
    let num_bce = num_bceControl ? num_bceControl.value : null;
    console.log('num_bce:', num_bce);
    if (num_bce) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer TdlH6J4MOQeE2cBr2Sw8vpL1MfOodtSE');
      this.http.get(`https://cbeapi.be/api/v1/company/${num_bce}`, { headers }).subscribe(
        (response: any) => {
          console.log('API response:', response);
          if (response.data) {
            const company = response.data;
            console.log(company);

            this.registerForm.patchValue({
              nom_societe: company.denomination_with_legal_form,
              adresse: company.address.full_address,
              ville: company.address.city,
              code_postal: company.address.post_code,
              telephone: company.contact_infos.phone
            });
            this.isCompanyInfoLoaded = true;
            console.log('Company info loaded:', this.registerForm.value);
          }
        },
        error => {
          console.error('API error:', error);
          this.isCompanyInfoLoaded = false;
        }
      );
    }
  }

  onSubmit() {
    console.log('onSubmit called');
    if (this.registerForm.valid && this.isCompanyInfoLoaded) {
      const { username, email, password, nom_societe, num_bce, adresse, ville, code_postal, telephone } = this.registerForm.value;
      console.log('Form values:', this.registerForm.value);
      this.registerService.register(username, email, password, nom_societe, num_bce, adresse, ville, code_postal, telephone).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration error:', error);
        }
      );
    } else {
      console.log('Form is invalid or company info not loaded');
    }
  }
}
