import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatepadletListComponent } from './privatepadlet-list.component';

describe('PrivatepadletListComponent', () => {
  let component: PrivatepadletListComponent;
  let fixture: ComponentFixture<PrivatepadletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivatepadletListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivatepadletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
