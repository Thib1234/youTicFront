import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.gard';
import { LoginComponent } from './components/login/login.component';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { ShowClientsComponent } from './components/show-clients/show-clients.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ShowInvoicesComponent } from './components/show-invoices/show-invoices.component';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create-client', component: CreateClientComponent, canActivate: [AuthGuard]
  },
  {
    path: 'clients', component: ShowClientsComponent, canActivate: [AuthGuard]
  },
  {
    path: 'create-invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard]
  },
  {
    path: 'invoices', component: ShowInvoicesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
