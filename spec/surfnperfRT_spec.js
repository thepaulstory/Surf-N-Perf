define('spec/surfnperfRT_spec', [
  'surfnperf/resource-timing'
], function(
  SurfNPerfRT
) {
  describe('SurfNPerfRT', function() {
    var NOW_TS = 1388595600000, // Wed Jan 01 2014 12:00:00 GMT-0500 (EST)
      NOW_HIGH_RES = 3.1415926;

    beforeEach(function() {
      var name = "a";
      if(!window.performance) {
        window.performance = {
          now: function() {
            return NOW_HIGH_RES;
          },
          getEntriesByName: function(name) {},
          timing: {}
        };
      }
    });

    describe('Singleton Behavior', function() {
      it('is only instantiated once, even if the library is attempted to be instantiated more than once (as good singletons do)', function() {
        var a = SurfNPerfRT,
          b = SurfNPerfRT;
        expect(a).toBe(b);
      });
    });

    describe('#initialize', function() {

      beforeEach(function() {
        SurfNPerfRT.initialize();
      });

      it('sets the Resource Timing API properties appropriately', function() {
        expect(SurfNPerfRT._resourceTiming).not.toBeNull();
      });

    });

    describe('#_inList', function() {
      // Minsu
      describe('whitelist as a key', function() {
        var options = {
          "whitelist": ["A", "B", "C"]
        }
        it('returns true if the given origin is listed in whitelist', function() {
          expect(SurfNPerfRT._inList("A", options)).toEqual(true);
        });
        it('returns false if the given origin is not listed in whitelist', function() {
          expect(SurfNPerfRT._inList("D", options)).toEqual(false);
        });
      });
      describe('blackList as a key', function() {
        var options = {
          "blacklist": ["A", "B", "C"]
        }
        it('returns true if the given origin is not listed in blacklist', function() {
          expect(SurfNPerfRT._inList("D", options)).toEqual(true);
        });
        it('returns false if the given origin is listed in blacklist', function() {
          expect(SurfNPerfRT._inList("A", options)).toEqual(false);
        });
      });
      describe('none specific key', function() {
        options = {}
        it('returns true no matter what if options does not have any key', function() {
          expect(SurfNPerfRT._inList("A", options)).toBe(true);
        });
      });

    });

    describe('#_getURLOrigin', function() {
      describe('when the provided URL has no port', function() {
        it('returns the origin', function() {
          expect(SurfNPerfRT._getURLOrigin("http://johnriv.github.io/Surf-N-Perf/")).toEqual("http://johnriv.github.io");
        });
      });
      describe('when the provided URL has a port', function() {
        it('returns the origin', function() {
          expect(SurfNPerfRT._getURLOrigin("http://johnriv.github.io:3000/Surf-N-Perf/")).toEqual("http://johnriv.github.io:3000");
        });
      });
    });

    describe('#getOrigins', function() {
      // Minsu

    });

    describe('#getResourcesFromOrigin', function() {
      describe('when the browser does not support resource timings', function() {
        SurfNPerfRT._resourceTiming = false;
        it('returns null', function() {
          expect(SurfNPerfRT.getResourcesFromOrigin("http://johnriv.github.io:3000")).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {

      });
    });

    describe('#_name', function() {
      // Minsu
    });

    describe('#getResource', function() {
      // Ros
      describe('when the browser does not support resource timings', function() {
        SurfNPerfRT._resourceTiming = false;
        it('returns null', function() {
          expect(SurfNPerfRT.getResource(name)).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {

      });
    });

    describe('#duration', function() {
      // Minsu
      describe('when the browser does not support resource timings', function() {
        SurfNPerfRT._resourceTiming = false;
        it('returns null', function() {
          expect(SurfNPerfRT.duration("http://johnriv.github.io:3000", "A", "B", {})).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {

      });
    });

    describe('#start', function() {
      // Ros
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.start(name)).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        it("returns the start time of the resource", function() {
          SurfNPerfRT._resourceTiming = true;
          spyOn(window.performance, 'getEntriesByName').andReturn([{
            startTime: 487.05
          }]);
          expect(SurfNPerfRT._resourceTiming).toEqual(true)
          expect(SurfNPerfRT.start(name)).toEqual(487);
        });
      });
    });

    describe('#end', function() {
      // Minsu
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.end("http://johnriv.github.io:3000")).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        it("returns the end time of the resource response", function() {
          SurfNPerfRT._resourceTiming = true;
          spyOn(window.performance, 'getEntriesByName').andReturn([{
            responseEnd: 487.05
          }]);
          expect(SurfNPerfRT.end(name)).toEqual(487);
        });
      });
    });

    describe('#getFullRequestLoadTime', function() {
      // Ros
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.getFullRequestLoadTime(name)).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        it("returns the duration of the resource load time", function() {
          SurfNPerfRT._resourceTiming = true;
          spyOn(window.performance, 'getEntriesByName').andReturn([{
            duration: 487.05
          }]);
          expect(SurfNPerfRT.getFullRequestLoadTime(name)).toEqual(487);
        });

      });
    });

    describe('#getNetworkTime', function() {
      // Minsu
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.getNetworkTime("http://johnriv.github.io:3000", {})).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        it("returns the network time while loading the resource", function() {
          SurfNPerfRT._resourceTiming = true;
          spyOn(window.performance, 'getEntriesByName').andReturn([{
            fetchStart: 480.05,
            connectEnd: 490.05
          }]);
          expect(SurfNPerfRT.getNetworkTime(name)).toEqual(10.0);
        });
      });
    });

    describe('#getServerTime', function() {
      // Ros
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.getServerTime(name)).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        it("returns the server time while loading the resource", function() {
          SurfNPerfRT._resourceTiming = true;
          spyOn(window.performance, 'getEntriesByName').andReturn([{
            requestStart: 480.05,
            responseEnd: 490.05
          }]);
          expect(SurfNPerfRT.getServerTime(name)).toEqual(10.0);
        });
      });
    });

    describe('#getBlockingTime', function() {
      // Minsu
      describe('when the browser does not support resource timings', function() {
        it('returns null', function() {
          SurfNPerfRT._resourceTiming = false;
          expect(SurfNPerfRT.getBlockingTime("http://johnriv.github.io:3000", {})).toEqual(null);
        });
      });
      describe('when the browser supports resource timings', function() {
        SurfNPerfRT._resourceTiming = true;
      });
    });

  });
});
