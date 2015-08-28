/// <reference path="../definitions.d.ts"/>
module dy{
    export class Vector3{
        public static up = Vector3.create(0, 1, 0);
        public static forward = Vector3.create(0, 0, 1);
        public static right = Vector3.create(1, 0, 0);

        public static create(x, y, z):Vector3 ;
        public static create():Vector3 ;
        public static create():Vector3 {
            var m = null;

            if(arguments.length === 0){
                m = new this();
            }
            else{
                m = new this(arguments[0], arguments[1], arguments[2]);
            }

            return m;
        }

        constructor(x, y, z);
        constructor();
        constructor(){
            this._values = new Float32Array(3);

            if(arguments.length > 0){
                this._values[0] = arguments[0];
                this._values[1] = arguments[1];
                this._values[2] =arguments[2];
            }
        }

        private _values: Float32Array;
        get values():Float32Array { return this._values; }
        set values(values: Float32Array) {
            this._values = values;
        }

        get x(){
            return this._values[0];
        }
        set x(x:number){
            this._values[0] = x;
        }

        get y(){
            return this._values[1];
        }
        set y(y:number){
            this._values[1] = y;
        }

        get z(){
            return this._values[2];
        }
        set z(z:number){
            this._values[2] = z;
        }

        public normalize(): Vector3{
            var v = this._values;
            var d = Math.sqrt(
                v[0] * v[0] + v[1] * v[1] + v[2] * v[2]
            );

            if(d === 0){
                return this;
            }

            v[0] = v[0] / d;
            v[1] = v[1] / d;
            v[2] = v[2] / d;

            return this;
        }

        public scale(scalar:number) {
            var v = this._values;

            v[0] *= scalar;
            v[1] *= scalar;
            v[2] *= scalar;

            return this;
        }

        public set(x:number, y:number, z:number){
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public sub(v:Vector3):Vector3 {
            this._values[0] = this._values[0] - v.values[0];
            this._values[1] = this._values[1] - v.values[1];
            this._values[2] = this._values[2] - v.values[2];

            return this;
        }

        public sub2(v1:Vector3, v2:Vector3){
            this._values[0] = v1.values[0] - v2.values[0];
            this._values[1] = v1.values[1] - v2.values[1];
            this._values[2] = v1.values[2] - v2.values[2];

            return this;
        }

        public add(v:Vector3){
            this._values[0] = this._values[0] + v.values[0];
            this._values[1] = this._values[1] + v.values[1];
            this._values[2] = this._values[2] + v.values[2];

            return this;
        }

        public add2(v1:Vector3, v2:Vector3){
            this._values[0] = v1.values[0] + v2.values[0];
            this._values[1] = v1.values[1] + v2.values[1];
            this._values[2] = v1.values[2] + v2.values[2];

            return this;
        }

        public reverse():Vector3{
            this._values[0] = -this._values[0];
            this._values[1] = -this._values[1];
            this._values[2] = -this._values[2];

            return this;
        }

        public copy(): Vector3{
            var result = Vector3.create(),
                i = 0,
                len = this._values.length;

            for(i = 0; i < len; i++){
                result.values[i] = this._values[i];
            }

            return result;
        }

        public toVec4(): Vector4{
            return Vector4.create(this._values[0], this._values[1], this._values[2], 1.0);
        }

        public length() {
            var v = this._values;

            return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
        }

        /**
         * @function
         * @name pc.Vec3#cross
         * @description Returns the result of a cross product operation performed on the two specified 3-dimensional vectors.
         * @param {pc.Vec3} lhs The first 3-dimensional vector operand of the cross product.
         * @param {pc.Vec3} rhs The second 3-dimensional vector operand of the cross product.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var back = new pc.Vec3().cross(pc.Vec3.RIGHT, pc.Vec3.UP);
         *
         * // Should print the Z axis (i.e. [0, 0, 1])
         * console.log("The result of the cross product is: " + back.toString());
         */
        public cross(lhs:Vector3, rhs:Vector3) {
            var a, b, r, ax, ay, az, bx, by, bz;

            a = lhs.values;
            b = rhs.values;
            r = this._values;

            ax = a[0];
            ay = a[1];
            az = a[2];
            bx = b[0];
            by = b[1];
            bz = b[2];

            r[0] = ay * bz - by * az;
            r[1] = az * bx - bz * ax;
            r[2] = ax * by - bx * ay;

            return this;
        }

        /**
         * @function
         * @name pc.Vec3#lerp
         * @description Returns the result of a linear interpolation between two specified 3-dimensional vectors.
         * @param {pc.Vec3} lhs The 3-dimensional to interpolate from.
         * @param {pc.Vec3} rhs The 3-dimensional to interpolate to.
         * @param {Number} alpha The value controlling the point of interpolation. Between 0 and 1, the linear interpolant
         * will occur on a straight line between lhs and rhs. Outside of this range, the linear interpolant will occur on
         * a ray extrapolated from this line.
         * @returns {pc.Vec3} Self for chaining.
         * @example
         * var a = new pc.Vec3(0, 0, 0);
         * var b = new pc.Vec3(10, 10, 10);
         * var r = new pc.Vec3();
         *
         * r.lerp(a, b, 0);   // r is equal to a
         * r.lerp(a, b, 0.5); // r is 5, 5, 5
         * r.lerp(a, b, 1);   // r is equal to b
         */
        public lerp(lhs:Vector3, rhs:Vector3, alpha:number) {
            var a = lhs.values,
                b = rhs.values,
                r = this._values;

            r[0] = a[0] + alpha * (b[0] - a[0]);
            r[1] = a[1] + alpha * (b[1] - a[1]);
            r[2] = a[2] + alpha * (b[2] - a[2]);

            return this;
        }
    }
}
