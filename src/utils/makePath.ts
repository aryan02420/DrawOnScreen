const TAU = 2 * Math.PI
const directions = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75].map(a => a*Math.PI)
// const directions = [0, 0.5, 1, 1.5].map(a => a*Math.PI)

type Vec = [number, number]
type Delta = {
  vec: Vec
  len: number
  angle: number
}

export function fastLength(v1: Vec, v2?: Vec): number {
  let [x, y] = v1
  if (v2 !== undefined) {
    x -= v2[0]
    y -= v2[1]
  }
  const ax = Math.abs(x)
  const ay = Math.abs(y)
  const manhattan = ax + ay
  const chebychev = Math.max(ax, ay)
  return (manhattan + chebychev) / 2
}

export function fastAngle(v1: Vec, v2?: Vec): number {
  const [x1, y1] = v1
  const a1 = Math.atan2(y1, x1)
  if (!v2) return a1
  const [x2, y2] = v2
  const a2 = Math.atan2(y2, x2)
  return angleDiff(a1, a2)
}

export function addVector(v1: Vec, v2: Vec): Vec {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}

export function angleDiff(a1: number, a2: number) {
  const a = Math.abs(a1 - a2)
  return Math.min(TAU - a, a)
}

export class Path {
  #start: Vec
  #deltas: Delta[]
  lengthThresh = 20
  angleThresh = 0.2

  constructor(start: Vec) {
    this.#start = start
    this.#deltas = []
  }

  #getLast() {
    return this.#deltas.length > 0 ? this.#deltas[this.#deltas.length - 1] : null
  }

  #updatePreviousPoint(delta: Delta) {
    if (this.#deltas.length === 0) {
      this.#addNewPoint(delta)
      return
    }
    this.#deltas[this.#deltas.length - 1] = delta
  }

  #addNewPoint(delta: Delta) {
    this.#deltas.push(delta)
  }

  draw(vec: Vec) {
    const delta: Delta = {
      vec: vec,
      len: fastLength(vec),
      angle: fastAngle(vec),
    }
    const lastDelta = this.#getLast()
    if (lastDelta === null) {
      this.#addNewPoint(delta)
      return
    }
    const combinedVec = addVector(lastDelta.vec, delta.vec)
    const combinedLen = fastLength(combinedVec)
    const combinedAngle = fastAngle(combinedVec)
    const angDiff = angleDiff(lastDelta.angle, delta.angle)
    if (combinedLen < this.lengthThresh || angDiff < this.angleThresh) {
      const combinedDelta: Delta = {
        vec: combinedVec,
        len: combinedLen,
        angle: combinedAngle,
      }
      this.#updatePreviousPoint(combinedDelta)
      return
    }
    const minDirDiff = Math.min.apply(null, directions.map(d => angleDiff(d, combinedAngle)))
    if (angDiff < 2 * this.angleThresh && minDirDiff < this.angleThresh) {
      const combinedDelta: Delta = {
        vec: combinedVec,
        len: combinedLen,
        angle: combinedAngle,
      }
      this.#updatePreviousPoint(combinedDelta)
      return
    }
    this.#addNewPoint(delta)
  }

  getSVGPath() {
    return `M${this.#start.join(',')} l0,0 ${this.#deltas.map((d) => `l${d.vec.join(',')}`).join(' ')}`
  }
}
