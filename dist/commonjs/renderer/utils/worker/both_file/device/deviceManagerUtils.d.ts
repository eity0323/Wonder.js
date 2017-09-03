import { IO } from "Wonder-Fantasy-Land/dist/commonjs/types/IO";
import { Map } from "immutable";
import { Color } from "../../../../../structure/Color";
import { ESide } from "../../../../enum/ESide";
import { ContextConfigOptionsData } from "../../../../type/dataType";
import { EBlendFunc } from "../../../../enum/EBlendFunc";
import { EBlendEquation } from "../../../../enum/EBlendEquation";
export declare var getGL: (DeviceManagerDataFromSystem: any, state: Map<any, any>) => WebGLRenderingContext;
export declare var setGL: any;
export declare var setContextConfig: any;
export declare var setPixelRatio: any;
export declare var getViewport: (state: Map<any, any>) => any;
export declare var setViewport: (x: number, y: number, width: number, height: number, state: Map<any, any>) => Map<any, any>;
export declare var setCanvasPixelRatio: any;
export declare var setViewportOfGL: any;
export declare var getScreenSize: (state: Map<any, any>) => any;
export declare var setScreen: (canvas: HTMLCanvasElement, setScreenData: Function, DeviceManagerDataFromSystem: any, state: Map<any, any>, DomQuery: any) => IO;
export declare var clear: (gl: WebGLRenderingContext, DeviceManagerDataFromSystem: any) => void;
export declare var clearColorBuffer: (gl: WebGLRenderingContext) => void;
export declare var setClearColor: (gl: WebGLRenderingContext, color: Color, DeviceManagerDataFromSystem: any) => void;
export declare var setColorWrite: (gl: WebGLRenderingContext, writeRed: boolean, writeGreen: boolean, writeBlue: boolean, writeAlpha: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var setSide: (gl: WebGLRenderingContext, side: ESide, DeviceManagerDataFromSystem: any) => void;
export declare var setDepthWrite: (gl: any, value: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var setBlend: (gl: any, value: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var setBlendFunc: (gl: any, blendSrc: EBlendFunc, blendDst: EBlendFunc, DeviceManagerDataFromSystem: any) => void;
export declare var setBlendEquation: (gl: any, blendEquation: EBlendEquation, DeviceManagerDataFromSystem: any) => void;
export declare var setBlendSeparate: (gl: any, blendFuncSeparate: EBlendFunc[], DeviceManagerDataFromSystem: any) => void;
export declare var setDepthTest: (gl: any, value: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var setScissorTest: (gl: any, value: boolean, DeviceManagerDataFromSystem: any) => void;
export declare var getOnlyGL: (canvas: HTMLCanvasElement, options: ContextConfigOptionsData, WebGLDetectDataFromSystem: any) => CanvasRenderingContext2D | WebGLRenderingContext;
export declare var initData: (DeviceManagerDataFromSystem: any) => void;