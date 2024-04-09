import simplifySvgPath from '@luncheon/simplify-svg-path'
import simplify from 'simplify-js'
import { clamp } from 'lodash'

type Point = [number, number]

type PathOptions = {
  /**
   * Whether to snap the shape to grid, lock aspect ratio, etc.
   */
  snap?: boolean
  /**
   * Whether to draw from the center of the shape, change the direction, etc.
   */
  altOrigin?: boolean
}

export class Draw {
  public points: Point[]

  constructor() {
    this.points = []
  }

  addPoint(point: Point) {
    this.simplify()
    this.points.push(point)
  }

  simplify() {
    this.points = simplify(this.points.map(([x, y]) => ({ x, y })), 1).map(({ x, y }) => [x, y])
  }

  // finalize() {
  //   // remove unnecessary data
  // }
}

// TODO: rewrite as static methods of Draw class
export function getDefaultPath(draw: Draw, options: PathOptions = {}) {
  if (draw.points.length == 1) {
    return `M${draw.points[0].join(',')} l0,0`
  }
  return `M${draw.points[0].join(',')} l0,0 ${draw.points.slice(1).map((d) => `L${d.join(',')}`).join(' ')}`
}

export function getSmoothPath(draw: Draw, options: PathOptions = {}) {
  if (draw.points.length == 1) {
    return `M${draw.points[0].join(',')} l0,0`
  }
  return simplifySvgPath(draw.points)
}

export function getRectPath(draw: Draw, options: PathOptions = {}) {
  const anchorPoint1 = draw.points.at(0)
  const anchorPoint2 = draw.points.at(-1)
  if (!anchorPoint1) {
    return ``
  }
  if (!anchorPoint2 || anchorPoint1 === anchorPoint2) {
    return `M${anchorPoint1.join(',')} l0,0`
  }
  if (options.snap) {
    const width = anchorPoint2[0] - anchorPoint1[0]
    const height = anchorPoint2[1] - anchorPoint1[1]
    const ratio = Math.abs(width / height)
    const aspectRatio = 1
    if (ratio > aspectRatio) {
      anchorPoint2[1] = anchorPoint1[1] + (anchorPoint2[1] - anchorPoint1[1]) * width / aspectRatio
    }
    else {
      anchorPoint2[0] = anchorPoint1[0] + (anchorPoint2[0] - anchorPoint1[0]) * height * aspectRatio
    }
  }
  let startX = anchorPoint1[0]
  let startY = anchorPoint1[1]
  let endX = anchorPoint2[0]
  let endY = anchorPoint2[1]
  if (options.altOrigin) {
    const rX = (anchorPoint2[0] - anchorPoint1[0])
    const rY = (anchorPoint2[1] - anchorPoint1[1])
    startX = anchorPoint1[0] - rX
    startY = anchorPoint1[1] - rY
    endX = anchorPoint1[0] + rX
    endY = anchorPoint1[1] + rY
  }
  return `M${startX},${startY} L${endX},${startY} L${endX},${endY} L${startX},${endY} Z`
}

export function getEllipsePath(draw: Draw, options: PathOptions = {}) {
  const anchorPoint1 = draw.points.at(0)
  const anchorPoint2 = draw.points.at(-1)
  if (!anchorPoint1) {
    return ``
  }
  if (!anchorPoint2 || anchorPoint1 === anchorPoint2) {
    return `M${anchorPoint1.join(',')} l0,0`
  }
  let startX = anchorPoint1[0]
  let startY = anchorPoint1[1]
  let endX = anchorPoint2[0]
  let endY = anchorPoint2[1]
  if (options.altOrigin) {
    const rX = (anchorPoint2[0] - anchorPoint1[0])
    const rY = (anchorPoint2[1] - anchorPoint1[1])
    startX = anchorPoint1[0] - rX
    startY = anchorPoint1[1] - rY
    endX = anchorPoint1[0] + rX
    endY = anchorPoint1[1] + rY
  }
  const centerX = (startX + endX) / 2
  const centerY = (startY + endY) / 2
  const radiusX = Math.abs(endX - startX) / 2
  const radiusY = Math.abs(endY - startY) / 2
  return `M${centerX},${centerY} m${-radiusX},0 a${radiusX},${radiusY} 0 1,0 ${radiusX * 2},0 a${radiusX},${radiusY} 0 1,0 ${-radiusX * 2},0 Z`
}

export function getLinePath(draw: Draw, options: PathOptions = {}) {
  const anchorPoint1 = draw.points.at(0)
  const anchorPoint2 = draw.points.at(-1)
  if (!anchorPoint1) {
    return ``
  }
  if (!anchorPoint2 || anchorPoint1 === anchorPoint2) {
    return `M${anchorPoint1.join(',')} l0,0`
  }
  if (options.snap) {
    const width = anchorPoint2[0] - anchorPoint1[0]
    const height = anchorPoint2[1] - anchorPoint1[1]
    const angle = Math.atan2(height, width)
    const length = Math.hypot(width, height)
    const angleSnap = Math.PI / 12
    const snappedAngle = Math.round(angle / angleSnap) * angleSnap
    anchorPoint2[0] = anchorPoint1[0] + length * Math.cos(snappedAngle)
    anchorPoint2[1] = anchorPoint1[1] + length * Math.sin(snappedAngle)
  }
  let startX = anchorPoint1[0]
  let startY = anchorPoint1[1]
  let endX = anchorPoint2[0]
  let endY = anchorPoint2[1]
  if (options.altOrigin) {}
  return `M${startX},${startY} L${endX},${endY}`
}

export function getArrowPath(draw: Draw, options: PathOptions = {}) {
  const anchorPoint1 = draw.points.at(0)
  const anchorPoint2 = draw.points.at(-1)
  if (!anchorPoint1) {
    return ``
  }
  if (!anchorPoint2 || anchorPoint1 === anchorPoint2) {
    return `M${anchorPoint1.join(',')} l0,0`
  }
  const angle = Math.atan2(anchorPoint1[1] - anchorPoint2[1], anchorPoint1[0] - anchorPoint2[0])
  const length = Math.hypot(anchorPoint1[0] - anchorPoint2[0], anchorPoint1[1] - anchorPoint2[1])
  const arrowSize = clamp(length / 10, 12, 64)
  const arrowAngle = Math.PI / 6
  const arrowHeadBase = [
    anchorPoint1[0] - arrowSize * Math.sqrt(3 / 4) * Math.cos(angle),
    anchorPoint1[1] - arrowSize * Math.sqrt(3 / 4) * Math.sin(angle),
  ]
  const arrowPoint1 = [
    anchorPoint1[0] - arrowSize * Math.cos(angle + arrowAngle),
    anchorPoint1[1] - arrowSize * Math.sin(angle + arrowAngle),
  ]
  const arrowPoint2 = [
    anchorPoint1[0] - arrowSize * Math.cos(angle - arrowAngle),
    anchorPoint1[1] - arrowSize * Math.sin(angle - arrowAngle),
  ]
  return `M${anchorPoint2.join(',')} L${arrowHeadBase.join(',')} M${arrowPoint1.join(',')} L${arrowPoint2.join(',')} L${anchorPoint1.join(',')} Z`

}

export function getLaserPath(draw: Draw, options: PathOptions = {}) {
  const endPoint = draw.points.at(-1)
  if (!endPoint) {
    return ``
  }
  return `M${endPoint.join(',')} l0,0`
}

export function getTextPath(draw: Draw, options: PathOptions = {}) {
  const startPoint = draw.points.at(0)
  const endPoint = draw.points.at(-1)
  if (!startPoint) {
    return ``
  }
  if (!endPoint || startPoint === endPoint) {
    return `M${startPoint.join(',')} l0,0`
  }
  return `M${startPoint.join(',')} L${endPoint.join(',')}`
}
