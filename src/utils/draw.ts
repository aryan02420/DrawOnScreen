import simplifySvgPath from '@luncheon/simplify-svg-path'
import simplify from 'simplify-js'

type Point = [number, number]

export class Draw {
  protected points: Point[]

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

  getSVGPath() {
    return `M${this.points[0].join(',')} l0,0 ${this.points.slice(1).map((d) => `L${d.join(',')}`).join(' ')}`
  }
}

export class DrawSimple extends Draw {
  override getSVGPath() {
    if (this.points.length == 1) {
      return `M${this.points[0].join(',')} l0,0`
    }
    return simplifySvgPath(this.points)
  }
}

export class DrawRect extends Draw {
  override getSVGPath() {
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
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
}

export class DrawEllipse extends Draw {
  override getSVGPath() {
    const centerPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
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
}

export class DrawLine extends Draw {
  override getSVGPath() {
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
    if (!startPoint) {
      return ``
    }
    if (!endPoint || startPoint === endPoint) {
      return `M${startPoint.join(',')} l0,0`
    }
    return `M${startPoint.join(',')} L${endPoint.join(',')}`
  }
}

export class DrawArrow extends Draw {
  override getSVGPath() {
    console.log(this.points)
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
    if (!startPoint) {
      return ``
    }
    if (!endPoint || startPoint === endPoint) {
      return `M${startPoint.join(',')} l0,0`
    }
    const angle = Math.atan2(endPoint[1] - startPoint[1], endPoint[0] - startPoint[0])
    const length = Math.hypot(endPoint[0] - startPoint[0], endPoint[1] - startPoint[1])
    const arrowSize = Math.max(10, length / 6)
    const arrowAngle = Math.PI / 6
    const arrowPoint1 = [
      endPoint[0] - arrowSize * Math.cos(angle + arrowAngle),
      endPoint[1] - arrowSize * Math.sin(angle + arrowAngle),
    ]
    const arrowPoint2 = [
      endPoint[0] - arrowSize * Math.cos(angle - arrowAngle),
      endPoint[1] - arrowSize * Math.sin(angle - arrowAngle),
    ]
    return `M${startPoint.join(',')} L${endPoint.join(',')} L${arrowPoint1.join(',')} L${arrowPoint2.join(',')} L${endPoint.join(',')}`
  }
}

export class DrawSharp extends Draw {
  override getSVGPath() {
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
    if (!startPoint) {
      return ``
    }
    if (!endPoint || startPoint === endPoint) {
      return `M${startPoint.join(',')} l0,0`
    }
    return `M${startPoint.join(',')} L${endPoint.join(',')}`
  }
}

export class DrawCurve extends Draw {
  override getSVGPath() {
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
    if (!startPoint) {
      return ``
    }
    if (!endPoint || startPoint === endPoint) {
      return `M${startPoint.join(',')} l0,0`
    }
    return `M${startPoint.join(',')} L${endPoint.join(',')}`
  }
}

export class DrawText extends Draw {
  override getSVGPath() {
    const startPoint = this.points.at(0)
    const endPoint = this.points.at(-1)
    if (!startPoint) {
      return ``
    }
    if (!endPoint || startPoint === endPoint) {
      return `M${startPoint.join(',')} l0,0`
    }
    return `M${startPoint.join(',')} L${endPoint.join(',')}`
  }
}