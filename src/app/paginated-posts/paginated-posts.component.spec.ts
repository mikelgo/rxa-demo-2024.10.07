import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatedPostsComponent } from './paginated-posts.component';

describe('PaginatedPostsComponent', () => {
  let component: PaginatedPostsComponent;
  let fixture: ComponentFixture<PaginatedPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginatedPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginatedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
