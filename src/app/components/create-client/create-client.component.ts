import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../tools/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit {
  clientForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private router: Router) {}

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

