import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrightItemComponent } from './userright-item.component';

describe('UserrightItemComponent', () => {
  let component: UserrightItemComponent;
  let fixture: ComponentFixture<UserrightItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrightItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrightItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
