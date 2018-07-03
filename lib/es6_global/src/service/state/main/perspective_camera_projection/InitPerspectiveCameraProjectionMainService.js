// Generated by BUCKLESCRIPT VERSION 3.1.4, PLEASE EDIT WITH CARE

import * as DirtyArrayService$Wonderjs from "../../../primitive/DirtyArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as UpdatePerspectiveCameraProjectionMainService$Wonderjs from "./UpdatePerspectiveCameraProjectionMainService.js";

var _init = UpdatePerspectiveCameraProjectionMainService$Wonderjs.updateCameraProjection;

function init(state) {
  var perspectiveCameraProjectionRecord = state[/* perspectiveCameraProjectionRecord */14];
  var dirtyArray = perspectiveCameraProjectionRecord[/* dirtyArray */1];
  var match = DirtyArrayService$Wonderjs.getCount(dirtyArray);
  if (match !== 0) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (state, dirtyIndex) {
                  return UpdatePerspectiveCameraProjectionMainService$Wonderjs.updateCameraProjection(dirtyIndex, state);
                }), state, ArrayService$WonderCommonlib.removeDuplicateItems(dirtyArray));
  } else {
    return state;
  }
}

export {
  _init ,
  init ,
  
}
/* DirtyArrayService-Wonderjs Not a pure module */