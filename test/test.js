// Generated by CoffeeScript 1.7.1
describe('infinite-scroll', function() {
  beforeEach(module('turn/infiniteScroll'));
  beforeEach(function() {
    return inject((function(_this) {
      return function($compile, $rootScope, $controller) {
        _this.$compile = $compile;
        _this.scope = $rootScope.$new();
        _this.scope.items = Array.apply(null, Array(200));
        _this.scope.scroll = function() {};
        _this.scope.isActive = true;
        return _this.element = angular.element("<div infinite-scroll=\"scroll()\">\n	<div ng-repeat=\"item in items\" style=\"height:100px\"></div>\n</div>");
      };
    })(this));
  });
  beforeEach(function() {
    (this.$compile(this.element))(this.scope);
    this.scope.$apply();
    return this.scope = this.element.scope();
  });
  describe('#check', function() {
    it('should return false if a load is already in progress', function() {
      this.scope.isLoading = true;
      return expect(this.scope.check()).toBe(false);
    });
    it('should call #load if the user scrolled to the bottom of the window', inject(function($window) {
      spyOn(this.scope, 'load');
      this.scope.windowHeight = 1;
      this.scope.tolerance = 0;
      this.element[0].scrollHeight = 0;
      this.scope.elementOffset = {
        top: 0
      };
      this.scope.check();
      return expect(this.scope.load).toHaveBeenCalled();
    }));
    return it('should not call #load otherwise', function() {
      spyOn(this.scope, 'load');
      this.scope.windowHeight = 0;
      this.scope.tolerance = 0;
      this.element[0].scrollHeight = 0;
      this.scope.elementOffset = {
        top: 0
      };
      this.scope.check();
      return expect(this.scope.load).not.toHaveBeenCalled();
    });
  });
  describe('#load', function() {
    it('should set scope.isLoading to true', function() {
      this.scope.isLoading = false;
      this.scope.fn = function() {
        return {
          then: function() {}
        };
      };
      this.scope.load();
      return expect(this.scope.isLoading).toBe(true);
    });
    it('should call #fn with no arguments', function() {
      this.scope.fn = function() {
        return {
          then: function() {}
        };
      };
      spyOn(this.scope, 'fn').andCallThrough();
      this.scope.load();
      return expect(this.scope.fn).toHaveBeenCalledWith();
    });
    it('should call #done when #fn is resolved', function() {
      spyOn(this.scope, 'done');
      this.scope.fn = function() {
        return {
          then: function(good) {
            return good();
          }
        };
      };
      this.scope.load();
      return expect(this.scope.done).toHaveBeenCalled();
    });
    return it('should call #deactivate when #fn is rejected', function() {
      spyOn(this.scope, 'deactivate');
      this.scope.fn = function() {
        return {
          then: function(good, bad) {
            return bad();
          }
        };
      };
      this.scope.load();
      return expect(this.scope.deactivate).toHaveBeenCalled();
    });
  });
  describe('#done', function() {
    return it('should set scope.isLoading to false', function() {
      console.log(this.scope);
      this.scope.isLoading = true;
      this.scope.done();
      return expect(this.scope.isLoading).toBe(false);
    });
  });
  describe('#measure', function() {
    return it('should set scope.windowHeight to the window height', inject(function($window) {
      this.scope.windowHeight = 0;
      $window.innerHeight = 100;
      this.scope.measure();
      return expect(this.scope.windowHeight).toBe($window.innerHeight);
    }));
  });
  describe('#deactivate', function() {
    return it('should set scope.active to false', function() {
      this.scope.active = true;
      this.scope.deactivate();
      return expect(this.scope.active).toBe(false);
    });
  });
  return describe('#setActive', function() {
    it('should clear the timer', function() {
      spyOn(window, 'clearInterval');
      this.scope.timer = 42;
      this.scope.setActive();
      return expect(window.clearInterval).toHaveBeenCalledWith(this.scope.timer);
    });
    it('should not set a new timer when passed a falsey argument', function() {
      this.scope.timer = null;
      this.scope.setActive(false);
      expect(this.scope.timer).toBe(null);
      this.scope.setActive(void 0);
      expect(this.scope.timer).toBe(null);
      this.scope.setActive(null);
      return expect(this.scope.timer).toBe(null);
    });
    it('should set a new timer when passed a truthy argument', function() {
      spyOn(window, 'setInterval').andCallThrough();
      this.scope.timer = null;
      this.scope.check = function() {};
      this.scope.interval = 100;
      this.scope.setActive(42);
      expect(typeof this.scope.timer).toBe('number');
      return expect(window.setInterval).toHaveBeenCalledWith(this.scope.check, this.scope.interval);
    });
    it('should remove the disabled class if set to active', function() {
      this.scope.disabledClassName = 'foo';
      this.element.addClass(this.scope.disabledClassName);
      expect(this.element.hasClass(this.scope.disabledClassName)).toBe(true);
      this.scope.setActive(true);
      return expect(this.element.hasClass(this.scope.disabledClassName)).toBe(false);
    });
    return it('should add the disabled class if set to inactive', function() {
      this.scope.disabledClassName = 'foo';
      this.element.removeClass(this.scope.disabledClassName);
      expect(this.element.hasClass(this.scope.disabledClassName)).toBe(false);
      this.scope.setActive(false);
      return expect(this.element.hasClass(this.scope.disabledClassName)).toBe(true);
    });
  });
});
