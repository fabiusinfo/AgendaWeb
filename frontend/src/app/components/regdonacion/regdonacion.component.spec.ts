import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegdonacionComponent } from './regdonacion.component';

describe('RegdonacionComponent', () => {
  let component: RegdonacionComponent;
  let fixture: ComponentFixture<RegdonacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegdonacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegdonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
