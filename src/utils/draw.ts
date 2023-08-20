import simplifySvgPath from '@luncheon/simplify-svg-path'
import simplify from 'simplify-js'
import { clamp } from 'lodash'

type Point = [number, number]

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
}

export function getDefaultPath(draw: Draw) {
  if (draw.points.length == 1) {
    return `M${draw.points[0].join(',')} l0,0`
  }
  return `M${draw.points[0].join(',')} l0,0 ${draw.points.slice(1).map((d) => `L${d.join(',')}`).join(' ')}`
}

export function getSmoothPath(draw: Draw) {
  if (draw.points.length == 1) {
    return `M${draw.points[0].join(',')} l0,0`
  }
  return simplifySvgPath(draw.points)
}

export function getRectPath(draw: Draw) {
  const startPoint = draw.points.at(0)
  const endPoint = draw.points.at(-1)
  if (!startPoint) {
    return ``
  }
  if (!endPoint || startPoint === endPoint) {
    return `M${startPoint.join(',')} l0,0`
  }
  const width = endPoint[0] - startPoint[0]
  const height = endPoint[1] - startPoint[1]
  return `M${startPoint.join(',')} l${width},0 l0,${height} l${-width},0 Z`
}

export function getEllipsePath(draw: Draw) {
  const startPoint = draw.points.at(0)
  const endPoint = draw.points.at(-1)
  if (!startPoint) {
    return ``
  }
  if (!endPoint || startPoint === endPoint) {
    return `M${startPoint.join(',')} l0,0`
  }
  const width = endPoint[0] - startPoint[0]
  const height = endPoint[1] - startPoint[1]
  const centerX = startPoint[0] + width / 2
  const centerY = startPoint[1] + height / 2
  return `M${centerX},${centerY} m${-width / 2},0 a${width / 2},${height / 2} 0 1,0 ${width},0 a${width / 2},${height / 2} 0 1,0 ${-width},0`
}

export function getLinePath(draw: Draw) {
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

export function getArrowPath(draw: Draw) {
  console.log(draw.points)
  const arrowHead = draw.points.at(0)
  const arrowTail = draw.points.at(-1)
  if (!arrowHead) {
    return ``
  }
  if (!arrowTail || arrowHead === arrowTail) {
    return `M${arrowHead.join(',')} l0,0`
  }
  const angle = Math.atan2(arrowHead[1] - arrowTail[1], arrowHead[0] - arrowTail[0])
  const length = Math.hypot(arrowHead[0] - arrowTail[0], arrowHead[1] - arrowTail[1])
  const arrowSize = clamp(length / 10, 12, 64)
  const arrowAngle = Math.PI / 6
  const arrowHeadBase = [
    arrowHead[0] - arrowSize * Math.sqrt(3 / 4) * Math.cos(angle),
    arrowHead[1] - arrowSize * Math.sqrt(3 / 4) * Math.sin(angle),
  ]
  const arrowPoint1 = [
    arrowHead[0] - arrowSize * Math.cos(angle + arrowAngle),
    arrowHead[1] - arrowSize * Math.sin(angle + arrowAngle),
  ]
  const arrowPoint2 = [
    arrowHead[0] - arrowSize * Math.cos(angle - arrowAngle),
    arrowHead[1] - arrowSize * Math.sin(angle - arrowAngle),
  ]
  return `M${arrowTail.join(',')} L${arrowHeadBase.join(',')} M${arrowPoint1.join(',')} L${arrowPoint2.join(',')} L${arrowHead.join(',')} Z`
}

export function getLaserPath(draw: Draw) {
  const endPoint = draw.points.at(-1)
  if (!endPoint) {
    return ``
  }
  return `M${endPoint.join(',')} l0,0`
}

export function getTextPath(draw: Draw) {
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
