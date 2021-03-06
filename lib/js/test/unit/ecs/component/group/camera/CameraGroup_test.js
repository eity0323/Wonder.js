'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Sinon$1 = require("sinon");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var TestTool$Wonderjs = require("../../../../../tool/TestTool.js");
var GameObjectAPI$Wonderjs = require("../../../../../../src/api/GameObjectAPI.js");
var MainStateTool$Wonderjs = require("../../../../../tool/service/state/MainStateTool.js");
var CameraGroupTool$Wonderjs = require("../../../../../tool/service/group/CameraGroupTool.js");

describe("CameraGroup", (function () {
        var sandbox = Sinon.getSandboxDefaultVal(/* () */0);
        var state = /* record */[/* contents */MainStateTool$Wonderjs.createState(/* () */0)];
        beforeEach((function () {
                sandbox[0] = Sinon$1.sandbox.create();
                state[0] = TestTool$Wonderjs.init(sandbox, undefined, undefined, /* () */0);
                return /* () */0;
              }));
        afterEach((function () {
                return Curry._1(Sinon.restoreSandbox, sandbox[0]);
              }));
        describe("createCameraGroup", (function () {
                Wonder_jest.test("create cameraView and cameraProjection", (function () {
                        var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                        var match$1 = match[1];
                        return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                        match$1[/* cameraView */0],
                                        match$1[/* cameraProjection */1]
                                      ]), /* tuple */[
                                    0,
                                    0
                                  ]);
                      }));
                describe("change state", (function () {
                        return Wonder_jest.test("state->index + 1", (function () {
                                      var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                                      var state$1 = match[0];
                                      return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                                      state$1[/* basicCameraViewRecord */13][/* index */0],
                                                      state$1[/* perspectiveCameraProjectionRecord */14][/* index */0]
                                                    ]), /* tuple */[
                                                  1,
                                                  1
                                                ]);
                                    }));
                      }));
                return /* () */0;
              }));
        describe("addCameraGroupComponents", (function () {
                return Wonder_jest.test("add cameraView and cameraProjection component", (function () {
                              var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = CameraGroupTool$Wonderjs.addGameObjectCameraGroupComponents(gameObject, match[1], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state$1),
                                              GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent(gameObject, state$1)
                                            ]), /* tuple */[
                                          true,
                                          true
                                        ]);
                            }));
              }));
        describe("disposeGameObjectCameraGroupComponents", (function () {
                return Wonder_jest.test("dispose cameraView and cameraProjection component", (function () {
                              var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                              var cameraGroup = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = CameraGroupTool$Wonderjs.addGameObjectCameraGroupComponents(gameObject, cameraGroup, match$1[0]);
                              var state$2 = CameraGroupTool$Wonderjs.disposeGameObjectCameraGroupComponents(gameObject, cameraGroup, state$1);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](/* tuple */[
                                              GameObjectAPI$Wonderjs.hasGameObjectBasicCameraViewComponent(gameObject, state$2),
                                              GameObjectAPI$Wonderjs.hasGameObjectPerspectiveCameraProjectionComponent(gameObject, state$2)
                                            ]), /* tuple */[
                                          false,
                                          false
                                        ]);
                            }));
              }));
        describe("unsafeGetGameObjectCameraGroupComponents", (function () {
                return Wonder_jest.test("unsafe get cameraView and cameraProjection components", (function () {
                              var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                              var cameraGroup = match[1];
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = CameraGroupTool$Wonderjs.addGameObjectCameraGroupComponents(gameObject, cameraGroup, match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CameraGroupTool$Wonderjs.unsafeGetGameObjectCameraGroupComponents(gameObject, state$1)), cameraGroup);
                            }));
              }));
        describe("hasGameObjectCameraGroupComponents", (function () {
                return Wonder_jest.test("has cameraView and cameraProjection components", (function () {
                              var match = CameraGroupTool$Wonderjs.createCameraGroup(state[0]);
                              var match$1 = GameObjectAPI$Wonderjs.createGameObject(match[0]);
                              var gameObject = match$1[1];
                              var state$1 = CameraGroupTool$Wonderjs.addGameObjectCameraGroupComponents(gameObject, match[1], match$1[0]);
                              return Curry._2(Wonder_jest.Expect[/* Operators */23][/* = */5], Wonder_jest.Expect[/* expect */0](CameraGroupTool$Wonderjs.hasGameObjectCameraGroupComponents(gameObject, state$1)), true);
                            }));
              }));
        return /* () */0;
      }));

/*  Not a pure module */
