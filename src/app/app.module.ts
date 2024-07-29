import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

import { AuthInterceptor } from './interceptors/auth.interceptors';
import { AuthGuard } from './guards/auth.gard';
import { ShowClientsComponent } from './components/show-clients/show-clients.component';
import { RecentClientsComponent } from './components/recent-clients/recent-clients.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ShowInvoicesComponent } from './components/show-invoices/show-invoices.component';
import { DashboardChartComponent } from './components/dashboard-chart/dashboard-chart.component';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { RecentInvoicesComponent } from './components/recent-invoices/recent-invoices.component';

Chart.register(...registerables);
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    CreateClientComponent,
    ShowClientsComponent,
    RecentClientsComponent,
    CreateInvoiceComponent,
    ShowInvoicesComponent,
    DashboardChartComponent,
    RecentInvoicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BaseChartDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
