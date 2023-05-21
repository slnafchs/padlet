import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypadletListComponent } from './mypadlet-list.component';

describe('MypadletListComponent', () => {
  let component: MypadletListComponent;
  let fixture: ComponentFixture<MypadletListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MypadletListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MypadletListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
