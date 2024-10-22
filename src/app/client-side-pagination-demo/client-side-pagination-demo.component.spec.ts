import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSidePaginationDemoComponent } from './client-side-pagination-demo.component';

describe('ClientSidePaginationDemoComponent', () => {
  let component: ClientSidePaginationDemoComponent;
  let fixture: ComponentFixture<ClientSidePaginationDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientSidePaginationDemoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientSidePaginationDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
