import { Component, OnInit } from '@angular/core';
import { AuthService } from './tools/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'invoices';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    // else {
    //   this.router.navigate(['/dashboard']);
    // }
  }
}
