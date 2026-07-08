import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardTickets } from './dashboard-tickets';

describe('DashboardTickets', () => {
  let component: DashboardTickets;
  let fixture: ComponentFixture<DashboardTickets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardTickets],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardTickets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
