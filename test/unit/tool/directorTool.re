let init = (state: StateDataType.state) => DirectorSystem._init(state);

let initSystem = (state: StateDataType.state) => DirectorSystem._initSystem(state);

let loopBody = (~time: float=0.) =>
  DirectorSystem.loopBody(time);

let updateSystem = (~time: float=0., state: StateDataType.state) =>
  DirectorSystem._updateSystem(time, state);