module wd {
    export class GameObject extends EntityObject{
        public static create() {
            var obj = new this();

            obj.initWhenCreate();

            return obj;
        }

        public transform:ThreeDTransform;

        public name:string = `gameObject${String(this.uid)}`;

        protected children:wdCb.Collection<GameObject>;


        public getSpacePartition(){
            return this.getComponent<SpacePartition>(SpacePartition);
        }

        public addChild(child:GameObject):EntityObject {
            if(child.hasComponent(CameraController)){
                Director.getInstance().scene.gameObjectScene.addToCameraList(child);
            }

            return super.addChild(child);
        }

        protected createTransform(){
            return ThreeDTransform.create();
        }

        protected getRenderList(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().getRenderListByFrustumCull();
            }

            return this.children;
        }

        protected afterInitChildren(){
            if(this.hasComponent(Octree)){
                return this.getSpacePartition().build();
            }
        }
    }
}

