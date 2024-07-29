import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import { InvoiceService } from '../../tools/invoice.service';
// import { BaseChartDirective } from 'ng2-charts';

interface TotalAmountByDay {
  day: string;
  total_amount: number;
}
interface TotalAmountByMonth {
  totals_by_day: TotalAmountByDay[];
  total_amount_month: number;
}

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss']
})
export class DashboardChartComponent implements OnInit {
  isDone: boolean = false
  public total_amount_month: number = 0;
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],  // Labels pour les dates
    datasets: [
      {
        data: [],
        label: 'Montant Total par Jour',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private invoiceService: InvoiceService) {
    // Enregistre les composants nécessaires de Chart.js
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.invoiceService.getTotalAmountByDay().subscribe(
      (response: TotalAmountByMonth) => {
        // Assigne les données récupérées au dataset du graphique
        this.lineChartData.labels = response.totals_by_day.map((item: TotalAmountByDay) => item.day);
        this.lineChartData.datasets[0].data = response.totals_by_day.map((item: TotalAmountByDay) => item.total_amount);
        // console.log('Total par jour:', this.lineChartData);
        // console.log('Total du mois:', response);
        // console.log("isoss");
        // console.log((response.total_amount_month as any).total_amount_month);
        // console.log("isoss");
        // Vérifie si total_amount_month est un objet et a une propriété total_amount_month
        if (response.total_amount_month && response.total_amount_month.hasOwnProperty('total_amount_month')) {
          this.total_amount_month = (response.total_amount_month as any).total_amount_month;
        } else {
          console.error('Erreur : total_amount_month n\'est pas structuré comme prévu.');
        }

        this.isDone = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération du montant total par jour et du mois:', error);
      }
    );
  }
}
