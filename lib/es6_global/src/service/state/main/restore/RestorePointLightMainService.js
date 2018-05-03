// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';

import * as CopyArrayBufferService$Wonderjs from "../../../primitive/copy/CopyArrayBufferService.js";

function restore(currentState, targetState) {
  var currentPointLightRecord = currentState[/* pointLightRecord */19];
  var targetPointLightRecord = targetState[/* pointLightRecord */19];
  var newBuffer = CopyArrayBufferService$Wonderjs.copyArrayBufferData(targetPointLightRecord[/* buffer */1], currentPointLightRecord[/* buffer */1]);
  var newrecord = targetState.slice();
  var newrecord$1 = targetPointLightRecord.slice();
  newrecord$1[/* buffer */1] = newBuffer;
  newrecord[/* pointLightRecord */19] = newrecord$1;
  return newrecord;
}

export {
  restore ,
  
}
/* CopyArrayBufferService-Wonderjs Not a pure module */