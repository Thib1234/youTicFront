import {
  InvoiceService
} from './../../tools/invoice.service';
import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'app-recent-invoices',
  templateUrl: './recent-invoices.component.html',
  styleUrl: './recent-invoices.component.scss'
})
export class RecentInvoicesComponent implements OnInit {
  invoices: any[] = [];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.invoiceService.getRecentInvoices().subscribe(invoices => {
      this.invoices = invoices;
    });
  }
}
