import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyinvitesListComponent } from './myinvites-list.component';

describe('MyinvitesListComponent', () => {
  let component: MyinvitesListComponent;
  let fixture: ComponentFixture<MyinvitesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyinvitesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyinvitesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
