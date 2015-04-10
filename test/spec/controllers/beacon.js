'use strict';

describe('Controller: BeaconCtrl', function () {

  // load the controller's module
  beforeEach(module('hyenaWelcomeApp'));

  var BeaconCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeaconCtrl = $controller('BeaconCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
