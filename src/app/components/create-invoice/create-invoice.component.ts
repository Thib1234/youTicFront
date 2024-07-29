import { InvoiceService } from './../../tools/invoice.service';
import { LigneFactureService } from '../../tools/ligne-facture.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../tools/client.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {
  factureForm: FormGroup = new FormGroup({});
  clients: any[] = [];

  constructor(private formBuilder: FormBuilder, private clientService: ClientService, private invoiceService: InvoiceService, private ligneFactureService: LigneFactureService) {}

  ngOnInit(): void {
    this.factureForm = this.formBuilder.group({
      client: ['', Validators.required],
      date: ['', Validators.required],
      statut: ['', Validators.required],
      montant_total: [0, Validators.required],
      montant_tva: [0, Validators.required],
      total_htva: [0, Validators.required],
      send: [false],
      lignesFacture: this.formBuilder.array([ this.createLigneFacture() ])
    });

    this.clientService.getClients().subscribe(data => {
      this.clients = data;

    });

    this.factureForm.get('lignesFacture')?.valueChanges.subscribe(values => {
      this.updateTotals();
    });
  }

  createLigneFacture(): FormGroup {
    return this.formBuilder.group({
      description: '',
      quantite: [0, Validators.required],
      prix_unitaire: [0, Validators.required],
      total_ligne: { value: 0, disabled: true },
      total_ligne_htva: { value: 0, disabled: true }
    });
  }

  addLigneFacture(): void {
    const ligneFacture = this.createLigneFacture();
    this.lignesFacture.push(ligneFacture);

    ligneFacture.valueChanges.subscribe(() => {
      this.updateTotals();
    });
  }

  get lignesFacture(): FormArray {
    return this.factureForm.get('lignesFacture') as FormArray;
  }

  updateTotals(): void {
    let total = 0;
    let totalHTVA = 0;

    this.lignesFacture.controls.forEach(control => {
      const quantite = control.get('quantite')?.value || 0;
      const prixUnitaire = control.get('prix_unitaire')?.value || 0;
      const totalLigne = quantite * prixUnitaire;
      const totalLigneHTVA = parseFloat((totalLigne / 1.21).toFixed(2));

      control.get('total_ligne')?.setValue(totalLigne, { emitEvent: false });
      control.get('total_ligne_htva')?.setValue(totalLigneHTVA, { emitEvent: false });

      total += totalLigne;
      totalHTVA += totalLigneHTVA;
    });

    const montantTotal = parseFloat(total.toFixed(2));
    const montantTVA = parseFloat((total - totalHTVA).toFixed(2));

    this.factureForm.get('montant_total')?.setValue(montantTotal, { emitEvent: false });
    this.factureForm.get('montant_tva')?.setValue(montantTVA, { emitEvent: false });
    this.factureForm.get('total_htva')?.setValue(totalHTVA, { emitEvent: false });
  }


  onSubmit(): void {
    if (this.factureForm?.valid) {

      this.invoiceService.createInvoice(this.factureForm.value).subscribe(response => {

          // Vérifie que factureId est bien défini
          const factureId = response.id;
          if (!factureId) {
            console.error('Erreur: factureId est undefined');
            return;
          }

          // Créer les lignes de facture après avoir créé la facture principale
          this.lignesFacture.controls.forEach(control => {
            const ligneFactureData = {
              facture: factureId,
              description: control.get('description')?.value,
              quantite: control.get('quantite')?.value,
              prix_unitaire: control.get('prix_unitaire')?.value,
              total_ligne: control.get('total_ligne')?.value,
              total_ligne_htva: control.get('total_ligne_htva')?.value
            };



            this.ligneFactureService.createLigneFacture(ligneFactureData).subscribe(
              res => {
                console.log('Ligne de facture créée:', res);
              },
              err => {
                console.log('Erreur lors de la création de la ligne de facture:', err);
              }
            );
          });
        },
        error => {
          console.log("Erreur lors de la création de la facture:", error);
        }
      );
    }
  }


}
