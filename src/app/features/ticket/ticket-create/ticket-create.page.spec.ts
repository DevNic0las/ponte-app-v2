import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketCreatePage } from './ticket-create.page';

describe('TicketCreatePage', () => {
  let component: TicketCreatePage;
  let fixture: ComponentFixture<TicketCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
