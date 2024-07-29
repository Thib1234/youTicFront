import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentInvoicesComponent } from './recent-invoices.component';

describe('RecentInvoicesComponent', () => {
  let component: RecentInvoicesComponent;
  let fixture: ComponentFixture<RecentInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
