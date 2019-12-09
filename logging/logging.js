const ArrayUtils = require('../utils/arrayUtils.js');
const DateUtils = require('../utils/dateUtils.js');
const Terminal = require('./terminal.js');

const colorPallet = {
  ERROR: Terminal.color.red,
  WARN: Terminal.color.yellow,
  INFO: Terminal.color.cyan,
  DEBUG: Terminal.color.green
}

const logLevels = ["DEBUG", "INFO", "WARN", "ERROR"];
const logLevelIndex = {"DEBUG" : 0, "INFO" : 1, "WARN" : 2, "ERROR" : 3};
let loggerLogLevel = "DEBUG";

if( process.env.LOG_LEVEL !== undefined ){
  let logLevel = process.env.LOG_LEVEL;
  if( ArrayUtils.contains(logLevels, logLevel) ){
    loggerLogLevel = logLevel;
  } else {
    warn("Log level invalid, defaulting to " + colorPallet.DEBUG("DEBUG"));
  }
} else {
  info("Log level not set, defaulting to " + colorPallet.DEBUG("DEBUG"));
}

function logIndex(level){
  let index;
  if( level === undefined ){
    index = logLevelIndex[loggerLogLevel];
  } else {
    index = logLevelIndex[level];
  }
  return index;
}

function debug(object) {
  if( logIndex() <= logIndex("DEBUG") ) {
    log("DEBUG", object);
  }
}

function info(object) {
  if( logIndex() <= logIndex("INFO") ) {
    log("INFO", object);
  }
}

function warn(object) {
  if( logIndex() <= logIndex("WARN") ) {
    log("WARN", object);
  }
}

function error(object) {
  if( logIndex() <= logIndex("ERROR") ) {
    log("ERROR", object);
  }
}

function log(level, object) {
  const printableTypes = ["string", "number", "boolean"];
  if(ArrayUtils.contains(printableTypes, typeof object)){
    console.log(
      '[' + DateUtils.format("Y-m-d H:i:s", new Date()) + '] |' + colorPallet[level](level.padEnd(5)) + '| %s',
      object
    );
  }
}

exports.debug = debug;
exports.info = info;
exports.warn = warn;
exports.error = error;
