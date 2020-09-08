import { TestBed } from '@angular/core/testing';

import { BooksOperationsService } from './books-operations.service';

describe('BooksOperationsService', () => {
  let service: BooksOperationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksOperationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
