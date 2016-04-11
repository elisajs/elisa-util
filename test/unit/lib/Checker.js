//imports
const justo = require("justo");
const suite = justo.suite;
const test = justo.test;
const init = justo.init;
const fin = justo.fin;
const Checker = require("../../../dist/es5/nodejs/elisa-util").Checker;

//suite
suite("Checker", function() {
  const check = new Checker().check;

  suite("{field: value}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: 1}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 111, y: 222}, {x: 1}).must.be.eq(false);
    });
  });

  suite("{field: {$eq: value}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: {$eq: 1}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 111, y: 222}, {x: {$eq: 1}}).must.be.eq(false);
    });
  });

  suite("{field: {$neq: value}}", function() {
    test("true", function() {
      check({x: 111, y: 222}, {x: {$ne: 1}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 1, y: 2}, {x: {$ne: 1}}).must.be.eq(false);
    });
  });

  suite("{field: {$lt: value}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: {$lt: 2}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 111, y: 222}, {x: {$lt: 2}}).must.be.eq(false);
    });
  });

  suite("{field: {$lte: value}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {y: {$lte: 2}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 111, y: 222}, {x: {$lte: 2}}).must.be.eq(false);
    });
  });

  suite("{field: {$gt: value}}", function() {
    test("true", function() {
      check({x: 111, y: 222}, {x: {$gt: 1}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 1, y: 2}, {x: {$gt: 1}}).must.be.eq(false);
    });
  });

  suite("{field: {$gte: value}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: {$gte: 1}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 0, y: 2}, {x: {$gte: 1}}).must.be.eq(false);
    });
  });

  suite("{field: {$like: value}}", function() {
    suite("value is string", function() {
      test("true", function() {
        check({x: "one", y: "two"}, {x: {$like: "^o"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "one", y: "two"}, {x: {$like: "^t"}}).must.be.eq(false);
      });
    });

    suite("value is regexp", function() {
      test("true", function() {
        check({x: "one", y: "two"}, {x: {$like: /^o/}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "one", y: "two"}, {x: {$like: /^t/}}).must.be.eq(false);
      });
    });
  });

  suite("{field: {$nlike: value}}", function() {
    suite("value is string", function() {
      test("true", function() {
        check({x: "one", y: "two"}, {x: {$nlike: "^t"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "one", y: "two"}, {x: {$nlike: "^o"}}).must.be.eq(false);
      });
    });

    suite("value is regexp", function() {
      test("true", function() {
        check({x: "one", y: "two"}, {x: {$nlike: /^t/}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "one", y: "two"}, {x: {$nlike: /^o/}}).must.be.eq(false);
      });
    });
  });

  suite("{field: {$between: [one, two]}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: {$between: [-3, 3]}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 1, y: 2}, {x: {$between: [-3, 0]}}).must.be.eq(false);
    });
  });

  suite("{field: {$nbetween: [one, two]}}", function() {
    test("true", function() {
      check({x: 1, y: 2}, {x: {$nbetween: [2, 3]}}).must.be.eq(true);
    });

    test("false", function() {
      check({x: 1, y: 2}, {x: {$nbetween: [0, 3]}}).must.be.eq(false);
    });
  });

  suite("{field: {$contain: value}}", function() {
    suite("field is string", function() {
      test("true", function() {
        check({x: "abc"}, {x: {$contain: "b"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "abc"}, {x: {$contain: "z"}}).must.be.eq(false);
      });
    });

    suite("field is array", function() {
      test("true", function() {
        check({x: ["one", "two", "three"]}, {x: {$contain: "two"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: ["one", "two", "three"]}, {x: {$contain: "four"}}).must.be.eq(false);
      });
    });
  });

  suite("{field: {$ncontain: value}}", function() {
    suite("field is string", function() {
      test("true", function() {
        check({x: "abc"}, {x: {$ncontain: "z"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: "abc"}, {x: {$ncontain: "b"}}).must.be.eq(false);
      });
    });

    suite("field is array", function() {
      test("true", function() {
        check({x: ["one", "two", "three"]}, {x: {$ncontain: "four"}}).must.be.eq(true);
      });

      test("false", function() {
        check({x: ["one", "two", "three"]}, {x: {$ncontain: "two"}}).must.be.eq(false);
      });
    });
  });
})();
