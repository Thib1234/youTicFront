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

}
