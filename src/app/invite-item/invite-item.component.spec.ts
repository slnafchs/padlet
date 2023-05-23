import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteItemComponent } from './invite-item.component';

describe('InviteItemComponent', () => {
  let component: InviteItemComponent;
  let fixture: ComponentFixture<InviteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
