open StateDataMainType;

open GameObjectType;

open VboBufferType;

open ComponentType;

let _addComponent = ((uid, component, componentMap), handleAddComponentFunc, componentRecord) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  [@bs] handleAddComponentFunc(component, uid, componentRecord)
};

let _addSharableComponent =
    (
      (uid, component, componentMap, gameObject),
      (increaseGroupCountFunc, handleAddComponentFunc),
      componentRecord
    ) => {
  componentMap |> ComponentMapService.addComponent(uid, component) |> ignore;
  switch gameObject {
  | Some(_) => [@bs] increaseGroupCountFunc(component, componentRecord)
  | _ => [@bs] handleAddComponentFunc(component, uid, componentRecord)
  }
};

let addBasicCameraViewComponent =
    (uid: int, component: component, {basicCameraViewRecord, gameObjectRecord} as state) => {
  state.basicCameraViewRecord =
    _addComponent(
      (uid, component, gameObjectRecord.basicCameraViewMap),
      AddBasicCameraViewService.handleAddComponent,
      basicCameraViewRecord
    );
  state
};

let addPerspectiveCameraProjectionComponent =
    (
      uid: int,
      component: component,
      {perspectiveCameraProjectionRecord, gameObjectRecord} as state
    ) => {
  state.perspectiveCameraProjectionRecord =
    _addComponent(
      (uid, component, gameObjectRecord.perspectiveCameraProjectionMap),
      AddPerspectiveCameraProjectionService.handleAddComponent,
      perspectiveCameraProjectionRecord
    );
  state
};

let addTransformComponent =
    (uid: int, component: component, {transformRecord, gameObjectRecord} as state) => {
  state.transformRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.transformMap),
        AddTransformService.handleAddComponent,
        state |> RecordTransformMainService.getRecord
      )
    );
  state
};

let _addSharableGeometryComponent =
    (
      (uid, component, gameObject),
      (increaseGroupCountFunc, handleAddComponentFunc),
      componentRecord
    ) =>
  switch gameObject {
  | Some(_) => [@bs] increaseGroupCountFunc(component, componentRecord)
  | _ => [@bs] handleAddComponentFunc(component, uid, componentRecord)
  };

let _addCurrentBoxGeometryComponentData =
    (
      uid,
      component,
      /* {boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap}, */
      {currentGeometryDataMap}
    ) =>
  CurrentComponentDataMapRenderService.addToMap(
    uid,
    (
      component,
      CurrentComponentDataMapRenderService.getBoxGeometryType()
      /* (boxGeometryVertexBufferMap, boxGeometryNormalBufferMap, boxGeometryElementArrayBufferMap),
         (
           VerticesBoxGeometryMainService.getVertices,
           NormalsBoxGeometryMainService.getNormals,
           IndicesBoxGeometryMainService.getIndices,
           IndicesBoxGeometryMainService.getIndicesCount
         ) */
    ),
    currentGeometryDataMap
  );

let addBoxGeometryComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  _addCurrentBoxGeometryComponentData(uid, component, gameObjectRecord) |> ignore;
  let boxGeometryRecord = state |> RecordBoxGeometryMainService.getRecord;
  state.boxGeometryRecord =
    boxGeometryRecord
    |> _addSharableGeometryComponent(
         (
           uid,
           component,
           /* gameObjectRecord.boxGeometryMap, */
           GameObjectBoxGeometryService.getGameObject(component, boxGeometryRecord)
         ),
         (GroupBoxGeometryService.increaseGroupCount, AddBoxGeometryService.handleAddComponent)
       );
  state
};

let _addCurrentCustomGeometryComponentData =
    (
      uid,
      component,
      /* {
           customGeometryVertexBufferMap,
           customGeometryNormalBufferMap,
           customGeometryElementArrayBufferMap
         }, */
      {currentGeometryDataMap}
    ) =>
  CurrentComponentDataMapRenderService.addToMap(
    uid,
    (
      component,
      CurrentComponentDataMapRenderService.getCustomGeometryType()
      /* (
           customGeometryVertexBufferMap,
           customGeometryNormalBufferMap,
           customGeometryElementArrayBufferMap
         ),
         (
           VerticesCustomGeometryMainService.getVertices,
           NormalsCustomGeometryMainService.getNormals,
           IndicesCustomGeometryMainService.getIndices,
           IndicesCustomGeometryMainService.getIndicesCount
         ) */
    ),
    currentGeometryDataMap
  );

let addCustomGeometryComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  _addCurrentCustomGeometryComponentData(uid, component, gameObjectRecord) |> ignore;
  let customGeometryRecord = state |> RecordCustomGeometryMainService.getRecord;
  state.customGeometryRecord =
    Some(
      customGeometryRecord
      |> _addSharableGeometryComponent(
           (
             uid,
             component,
             /* gameObjectRecord.customGeometryMap, */
             GameObjectCustomGeometryService.getGameObject(component, customGeometryRecord)
           ),
           (
             GroupCustomGeometryService.increaseGroupCount,
             AddCustomGeometryService.handleAddComponent
           )
         )
    );
  state
};

let addBasicMaterialComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  let basicMaterialRecord = RecordBasicMaterialMainService.getRecord(state);
  state.basicMaterialRecord =
    Some(
      basicMaterialRecord
      |> _addSharableComponent(
           (
             uid,
             component,
             gameObjectRecord.basicMaterialMap,
             GameObjectBasicMaterialService.getGameObject(component, basicMaterialRecord)
           ),
           (
             GroupBasicMaterialService.increaseGroupCount,
             AddBasicMaterialService.handleAddComponent
           )
         )
    );
  state
};

let addLightMaterialComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  let lightMaterialRecord = RecordLightMaterialMainService.getRecord(state);
  state.lightMaterialRecord =
    Some(
      lightMaterialRecord
      |> _addSharableComponent(
           (
             uid,
             component,
             gameObjectRecord.lightMaterialMap,
             GameObjectLightMaterialService.getGameObject(component, lightMaterialRecord)
           ),
           (
             GroupLightMaterialService.increaseGroupCount,
             AddLightMaterialService.handleAddComponent
           )
         )
    );
  state
};

let addMeshRendererComponent =
    (uid: int, component: component, {meshRendererRecord, gameObjectRecord} as state) => {
  state.meshRendererRecord =
    _addComponent(
      (uid, component, gameObjectRecord.meshRendererMap),
      AddMeshRendererService.handleAddComponent,
      meshRendererRecord
    );
  state
};

let addAmbientLightComponent =
    (uid: int, component: component, {ambientLightRecord, gameObjectRecord} as state) => {
  state.ambientLightRecord =
    _addComponent(
      (uid, component, gameObjectRecord.ambientLightMap),
      AddAmbientLightService.handleAddComponent,
      ambientLightRecord
    );
  state
};

let addDirectionLightComponent =
    (uid: int, component: component, {directionLightRecord, gameObjectRecord} as state) => {
  state.directionLightRecord =
    _addComponent(
      (uid, component, gameObjectRecord.directionLightMap),
      AddDirectionLightService.handleAddComponent,
      directionLightRecord
    );
  state
};

let addPointLightComponent =
    (uid: int, component: component, {pointLightRecord, gameObjectRecord} as state) => {
  state.pointLightRecord =
    _addComponent(
      (uid, component, gameObjectRecord.pointLightMap),
      AddPointLightService.handleAddComponent,
      pointLightRecord
    );
  state
};

let addSourceInstanceComponent = (uid: int, component: component, {gameObjectRecord} as state) => {
  state.sourceInstanceRecord =
    Some(
      _addComponent(
        (uid, component, gameObjectRecord.sourceInstanceMap),
        AddSourceInstanceService.handleAddComponent,
        RecordSourceInstanceMainService.getRecord(state)
      )
    );
  state
};

let addObjectInstanceComponent =
    (uid: int, component: component, {objectInstanceRecord, gameObjectRecord} as state) => {
  state.objectInstanceRecord =
    _addComponent(
      (uid, component, gameObjectRecord.objectInstanceMap),
      AddObjectInstanceService.handleAddComponent,
      objectInstanceRecord
    );
  state
};