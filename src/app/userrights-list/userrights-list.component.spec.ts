import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserrightsListComponent } from './userrights-list.component';

describe('UserrightsListComponent', () => {
  let component: UserrightsListComponent;
  let fixture: ComponentFixture<UserrightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserrightsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserrightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
