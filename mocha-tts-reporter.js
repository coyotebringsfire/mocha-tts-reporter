var debug=require('debug')('mocha:mongoreporter'),
    Q=require('q'),
    mongo=require('mongodb'),
    dateFormat=require('dateFormat'), now;
    os=require('os');

module.exports = mocha_mongo_reporter;

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
    tts.speak(_options.testPass || "test passed" );
    passes++;
  });

  runner.on('fail', function(test, err){
    tts.speak( _options.testFail || "test failed" );
    failures++;
  });

  runner.on('end', function(){
    debug("runner.end");
    if( failures > 0 ) {
      tts.speak( _options.onSuiteFail || "suite failed"); 
    } else {
      tts.speak( _options.onSuitePass || "suite passed");
    }
  });
}