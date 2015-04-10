'use strict';

describe('Service: BoardService', function () {

  // load the service's module
  beforeEach(module('hyenaWelcomeApp'));

  // instantiate service
  var BoardService;
  beforeEach(inject(function (_BoardService_) {
    BoardService = _BoardService_;
  }));

  it('should do something', function () {
    expect(!!BoardService).toBe(true);
  });

});
