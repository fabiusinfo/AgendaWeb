import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AghoraComponent } from './aghora.component';

describe('AghoraComponent', () => {
  let component: AghoraComponent;
  let fixture: ComponentFixture<AghoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AghoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AghoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
