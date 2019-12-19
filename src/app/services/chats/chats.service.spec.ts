import { TestBed } from '@angular/core/testing';

import { ChatsService } from './chats.service';

describe('ChatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatsService = TestBed.get(ChatsService);
    expect(service).toBeTruthy();
  });
});
