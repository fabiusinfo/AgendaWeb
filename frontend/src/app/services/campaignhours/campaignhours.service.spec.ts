import { TestBed } from '@angular/core/testing';

import { CampaignHoursService } from './campaignhours.service';

describe('CampaignhoursService', () => {
  let service: CampaignHoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignHoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
