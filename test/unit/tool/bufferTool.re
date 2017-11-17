open BufferConfigSystem;

/* let minBufferSize (state: StateDataType.state) => {
     (getBufferConfig state).transformDataBufferCount = 5;
     state
   }; */
let setBufferSize =
    (state: StateDataType.state, ~transformDataBufferCount=10, ~meshRendererDataBufferCount=10, ()) => {
  getBufferConfig(state).transformDataBufferCount = transformDataBufferCount;
  getBufferConfig(state).meshRendererDataBufferCount = meshRendererDataBufferCount;
  state
};
