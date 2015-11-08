"use strict";
var debug=require('debug')('mocha:ttsreporter');

module.exports = mocha_tts_reporter;

function mocha_tts_reporter(runner, options) {
  var db = null;

  var passes = 0,
      failures = 0,
      _options=options;

  if(!(this instanceof mocha_tts_reporter)) {
    return new mocha_tts_reporter(runner, options);
  }

  var tts = require("node-tts-google").tts;

  runner.on('pass', function(test){
    debug("test pass");
    tts.speak(_options.testPass || "test passed" );
    passes++;
  });

  runner.on('fail', function(test, err){
    debug("test fail");
    tts.speak( _options.testFail || "test failed" );
    failures++;
  });

  runner.on('end', function(){
    debug("runner end %d %d", failures, passes);
    if( failures > 0 ) {
      tts.speak( _options.onSuiteFail || "suite failed"); 
    } else {
      tts.speak( _options.onSuitePass || "suite passed");
    }
  });
}