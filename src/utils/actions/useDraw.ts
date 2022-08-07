import type { Action } from 'svelte/action'
import throttle from 'lodash.throttle'

interface ActionParams {
  wait?: number
  cb: (type: 'start' | 'draw' | 'done', start: [number, number], deltas: [number, number][]) => void
}

const useDrag: Action<HTMLElement, ActionParams> = (node, { wait = 16, cb }) => {
  let prevX: number, prevY: number
  let start: [number, number], deltas: [number, number][]

  const throttledMouseMove = throttle(mouseMove, wait, {
    leading: true,
    trailing: true,
  })

  function mouseDown(e: MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    document.addEventListener('mousemove', throttledMouseMove)
    document.addEventListener('mouseup', mouseUp)
    start = [e.clientX, e.clientY]
    deltas = []
    cb('start', start, deltas)
    prevX = e.clientX
    prevY = e.clientY
  }

  function mouseUp(e: MouseEvent) {
    document.removeEventListener('mouseup', mouseUp)
    document.removeEventListener('mousemove', throttledMouseMove)
    cb('done', start, deltas)
  }

  function mouseMove(e: MouseEvent) {
    const x = e.clientX - prevX
    const y = e.clientY - prevY
    deltas.push([x, y])
    cb('draw', start, deltas)
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
