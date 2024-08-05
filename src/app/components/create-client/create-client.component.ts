import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../tools/client.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({});
  isCompanyInfoLoaded: boolean = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      nom: ['', Validators.required],
      adresse: ['', Validators.required],
      code_postal: ['', Validators.required],
      ville: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      num_tva: ['', Validators.required]
    });
  }

  onBceChange() {
    console.log('onBceChange called');
    const num_bceControl = this.clientForm.get('num_tva');
    let num_tva = num_bceControl ? num_bceControl.value : null;
    console.log('num_bce:', num_tva);
    if (num_tva) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer TdlH6J4MOQeE2cBr2Sw8vpL1MfOodtSE');
      this.http.get(`https://cbeapi.be/api/v1/company/${num_tva}`, { headers }).subscribe(
        (response: any) => {
          console.log('API response:', response);
          if (response.data) {
            console.log('ISSSSISIISS BRIA N RELLFLDLFQ');

            const company = response.data;
            console.log(company);

            this.clientForm.patchValue({
              nom: company.denomination_with_legal_form,
              adresse: company.address.full_address,
              ville: company.address.city,
              code_postal: company.address.post_code,
              telephone: company.contact_infos.phone
            });
            this.isCompanyInfoLoaded = true;
            console.log('Company info loaded:', this.clientForm.value);
          }
        },
        error => {
          console.error('API error:', error);
          this.isCompanyInfoLoaded = false;
        }
      );
    }
  }

  onSubmitClient(): void {
    if (this.clientForm?.valid) {
      this.clientService.createClient(this.clientForm.value).subscribe(
        response => {
          console.log('Client créé avec succès', response);
          // Vous pouvez rediriger l'utilisateur vers une autre page ou réinitialiser le formulaire ici
        },
        error => {
          console.error('Erreur lors de la création du client', error);
        }
      );
    }
  }
}

