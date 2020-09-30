import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarhorasComponent } from './confirmarhoras.component';

describe('ConfirmarhorasComponent', () => {
  let component: ConfirmarhorasComponent;
  let fixture: ComponentFixture<ConfirmarhorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarhorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarhorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
