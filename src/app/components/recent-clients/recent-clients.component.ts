import { ClientService } from './../../tools/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recent-clients',
  templateUrl: './recent-clients.component.html',
  styleUrl: './recent-clients.component.scss'
})
export class RecentClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private ClientService: ClientService) { }

  ngOnInit(): void {
    this.ClientService.getRecentClients().subscribe(clients => {
      this.clients = clients;
    });
  }

}
