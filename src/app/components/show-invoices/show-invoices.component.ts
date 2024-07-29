import { InvoiceService } from '../../tools/invoice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-invoices',
  templateUrl: './show-invoices.component.html',
  styleUrl: './show-invoices.component.scss'
})
export class ShowInvoicesComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) { }

  ngOnInit(): void {
    this.invoiceService.getInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }
  generateInvoice(invoice: any): void {
    this.invoiceService.generateInvoice(invoice.id).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const a = document.createElement('a');
      a.href = url;
      a.download = `facture_${invoice.id}.pdf`;
      a.click();
    });
  }


}
