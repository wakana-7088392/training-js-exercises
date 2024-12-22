import * as _ from "lodash";

export const obj = {
  r: 0,
  theta: 0,
  _x: 0,
  _y: 0,
  get x() {
    return this._x;
  },
  set x(value) {
    if (Number.isNaN(value)) {
      throw new Error();
    }
    this._x = value;
    this.calc();
  },
  get y() {
    return this._y;
  },
  set y(value) {
    if (Number.isNaN(value)) {
      throw new Error();
    }
    this._y = value;
    this.calc();
  },
  calc() {
    this.r = Math.sqrt(this.x ** 2 + this.y ** 2);
    this.theta = _.round((Math.acos(this.x / this.r) * 180) / Math.PI, 7);
  },
};
