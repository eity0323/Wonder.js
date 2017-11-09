open StateSystem;

open StateData;

let _initSystem = (state: StateDataType.state) =>
  state |> TransformSystem.init |> CameraControllerSystem.init |> GeometrySystem.init;

let _init = (state: StateDataType.state) => state |> _initSystem |> WebGLRenderSystem.init;

let _updateSystem = (elapsed: float, state: StateDataType.state) =>
  state |> TransformSystem.update |> CameraControllerSystem.update;

let _sync = (elapsed: float, state: StateDataType.state) => _updateSystem(elapsed, state);

let _run = (~elapsed: float, state: StateDataType.state) =>
  _sync(elapsed, state) |> WebGLRenderSystem.render;

/* todo add time logic */
/* todo add scheduler */
/* todo unit test */
let loopBody = (time: float, state: StateDataType.state) =>
  state |> _run(~elapsed=time);

let start = (state: StateDataType.state) => {
  let rec _loop = (time: float, state: StateDataType.state) =>
    Dom.requestAnimationFrame(
      (time: float) =>
        state
        |> loopBody(time)
        |> _loop(time)
    );
  state |> _init |> _loop(0.)
};