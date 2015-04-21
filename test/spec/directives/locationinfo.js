'use strict';

describe('Directive: locationInfo', function () {

  // load the directive's module
  beforeEach(module('hyenaWelcomeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<location-info></location-info>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the locationInfo directive');
  }));
});
