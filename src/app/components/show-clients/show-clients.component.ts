import { ClientService } from './../../tools/client.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-clients',
  templateUrl: './show-clients.component.html',
  styleUrl: './show-clients.component.scss'
})
export class ShowClientsComponent implements OnInit {
  clients: any[] = [];

  constructor(private ClientService: ClientService) { }

  ngOnInit(): void {
    this.ClientService.getClients().subscribe(clients => {
      this.clients = clients;
    });
  }

}
