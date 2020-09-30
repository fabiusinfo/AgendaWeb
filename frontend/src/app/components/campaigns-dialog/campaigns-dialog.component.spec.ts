import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDialogComponent } from './campaigns-dialog.component';

describe('CampaignsDialogComponent', () => {
  let component: CampaignsDialogComponent;
  let fixture: ComponentFixture<CampaignsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
