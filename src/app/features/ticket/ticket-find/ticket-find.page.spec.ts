import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketFindPage } from './ticket-find.page';

describe('TicketFindPage', () => {
  let component: TicketFindPage;
  let fixture: ComponentFixture<TicketFindPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketFindPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
