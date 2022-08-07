import type { Action } from 'svelte/action'

interface ActionParams {
  throttle: number
  cb: (type: 'temp' | 'done', start: [number, number], deltas: [number, number][]) => void
}

const useDrag: Action<HTMLElement, ActionParams> = (node, { throttle, cb }) => {
  let prevX: number, prevY: number
  let start: [number, number], deltas: [number, number][]

  function mouseDown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    start = [e.clientX, e.clientY]
    deltas = []
    cb('temp', start, deltas)
    prevX = e.clientX
    prevY = e.clientY
  }

  function mouseUp(e: MouseEvent) {
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mousemove', mouseMove)
    cb('done', start, deltas)
  }

  function mouseMove(e: MouseEvent) {
    const x = e.clientX - prevX
    const y = e.clientY - prevY
    deltas.push([x, y])
    cb('temp', start, deltas)
    prevX = e.clientX
    prevY = e.clientY
  }

  node.addEventListener('mousedown', mouseDown)
  return {
    destroy() {
      node.removeEventListener('mousedown', mouseDown)
    },
  }
}

export default useDrag
