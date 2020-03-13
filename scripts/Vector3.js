const Vector3 = class vector3 {
  constructor (x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  /* ---------- static ---------- */
  static add (left, right) {
    if (typeof right === "number") {
      return new Vector3(left.x + right, left.y + right, left.z + right)
    }
    return new Vector3(left.x + right.x, left.y + right.y, left.z + right.z)
  }

  static subtract (left, right) {
    if (typeof right === "number") {
      return new Vector3(left.x - right, left.y - right, left.z - right)
    }
    return new Vector3(left.x - right.x, left.y - right.y, left.z - right.z)
  }

  static multiply (left, right) {
    if (typeof right === "number") {
      return new Vector3(left.x * right, left.y * right, left.z * right)
    }
    return new Vector3(left.x * right.x, left.y * right.y, left.z * right.z)
  }

  static divide (left, right) {
    if (typeof right === "number") {
      return new Vector3(left.x / right, left.y / right, left.z / right)
    }
    return new Vector3(left.x / right.x, left.y / right.y, left.z / right.z)
  }

  static negate (self) {
    return new Vector3(-self.x, -self.y, -self.z)
  }

  static equal (left, right) {
    return left.x === right.x && left.y === right.y && left.z === right.z
  }

  static lerp (left, right, t) {
    return Vector3.add(Vector3.multiply(left, t), Vector3.multiply(right, 1.0 - t))
  }

  /* ---------- self ---------- */
  negate (self) {
    return new Vector3(-self.x, -self.y, -self.z)
  }

  equal (other) {
    return this.x === other.x && this.y === other.y && this.z === other.z
  }

  /* ---------- get ---------- */
  get magnitude () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }
}
