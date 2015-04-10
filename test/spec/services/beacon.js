'use strict';

describe('Service: beacon', function () {

  // load the service's module
  beforeEach(module('hyenaWelcomeApp'));

  // instantiate service
  var beacon;
  beforeEach(inject(function (_beacon_) {
    beacon = _beacon_;
  }));

  it('should do something', function () {
    expect(!!beacon).toBe(true);
  });

});
