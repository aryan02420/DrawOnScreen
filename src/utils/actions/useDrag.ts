import { offsetPosition } from '../../store/mutations'

import type { Action } from 'svelte/action'

const useDrag: Action = (node) => {
  let prevX: number, prevY: number

  function mouseDown(e: MouseEvent) {
    // FIXME
    // @ts-ignore
    if (e.target.hasAttribute?.('data-drag')) {
      document.addEventListener('mousemove', mouseMove)
      document.addEventListener('mouseup', mouseUp)
      prevX = e.clientX
      prevY = e.clientY
    }
  }

  function mouseUp(e: MouseEvent) {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
  }

  function mouseMove(e: MouseEvent) {
    const x = e.clientX - prevX
    const y = e.clientY - prevY
    offsetPosition([x, y])
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