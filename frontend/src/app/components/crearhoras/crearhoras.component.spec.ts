import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearhorasComponent } from './crearhoras.component';

describe('CrearhorasComponent', () => {
  let component: CrearhorasComponent;
  let fixture: ComponentFixture<CrearhorasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearhorasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearhorasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
