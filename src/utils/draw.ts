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
  const centerPoint = draw.points.at(0)
  const endPoint = draw.points.at(-1)
  if (!centerPoint) {
    return ``
  }
  if (!endPoint || centerPoint === endPoint) {
    return `M${centerPoint.join(',')} l0,0`
  }
  const radiusX = Math.abs(endPoint[0] - centerPoint[0])
  const radiusY = Math.abs(endPoint[1] - centerPoint[1])
  return `M${centerPoint.join(',')} m${-radiusX},0 a${radiusX},${radiusY} 0 1,0 ${radiusX * 2},0 a${radiusX},${radiusY} 0 1,0 ${-radiusX * 2},0 Z`
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
  const startPoint = draw.points.at(0)
  const endPoint = draw.points.at(-1)
  if (!startPoint) {
    return ``
  }
  if (!endPoint || startPoint === endPoint) {
    return `M${startPoint.join(',')} l0,0`
  }
  const angle = Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0])
  const length = Math.hypot(endPoint[0] - startPoint[0], endPoint[1] - startPoint[1])
  const arrowSize = clamp(length / 10, 12, 64)
  const arrowAngle = Math.PI / 6
  const lineEndPoint = [
    endPoint[0] - arrowSize * Math.sqrt(3 / 4) * Math.cos(angle),
    endPoint[1] - arrowSize * Math.sqrt(3 / 4) * Math.sin(angle),
  ]
  const arrowPoint1 = [
    endPoint[0] - arrowSize * Math.cos(angle + arrowAngle),
    endPoint[1] - arrowSize * Math.sin(angle + arrowAngle),
  ]
  const arrowPoint2 = [
    endPoint[0] - arrowSize * Math.cos(angle - arrowAngle),
    endPoint[1] - arrowSize * Math.sin(angle - arrowAngle),
  ]
  return `M${startPoint.join(',')} L${lineEndPoint.join(',')} M${arrowPoint1.join(',')} L${arrowPoint2.join(',')} L${endPoint.join(',')} Z`
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
