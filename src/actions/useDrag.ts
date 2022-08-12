import type { Action } from 'svelte/action'
import throttle from 'lodash.throttle'

export enum ActionCallbackType {
  Start = 'Start',
  Move = 'Move',
  End = 'End',
}

type ActionCallbackParams =
  | {
      type: ActionCallbackType.Start
      payload: { x: number; y: number }
    }
  | {
      type: ActionCallbackType.Move
      payload: { x: number; y: number; dx: number; dy: number }
    }
  | {
      type: ActionCallbackType.End
      payload: { x: number; y: number }
    }

interface ActionOptions {
  wait?: number
  condition?: (event: MouseEvent) => boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  callback?: (params: ActionCallbackParams) => void
}

const useDrag: Action<HTMLElement, ActionOptions> = (node, options = {}) => {
  const { wait = 16, condition = null, preventDefault = true, stopPropagation = true, callback } = options
  let prevX: number, prevY: number

  const throttledMouseMove = throttle(mouseMove, wait, {
    leading: true,
    trailing: true,
  })

  function mouseDown(e: MouseEvent) {
    if (condition ? condition(e) : true) {
      if (preventDefault) e.preventDefault()
      if (stopPropagation) e.stopPropagation()
      document.addEventListener('mousemove', throttledMouseMove)
      document.addEventListener('mouseup', mouseUp)
      callback?.({
        type: ActionCallbackType.Start,
        payload: {
          x: e.clientX,
          y: e.clientY,
        },
      })
      prevX = e.clientX
      prevY = e.clientY
    }
  }

  function mouseUp(e: MouseEvent) {
    document.removeEventListener('mousemove', throttledMouseMove)
    document.removeEventListener('mouseup', mouseUp)
    callback?.({
      type: ActionCallbackType.End,
      payload: {
        x: e.clientX,
        y: e.clientY,
      },
    })
  }

  function mouseMove(e: MouseEvent) {
    const dx = e.clientX - prevX
    const dy = e.clientY - prevY
    callback?.({
      type: ActionCallbackType.Move,
      payload: {
        x: e.clientX,
        y: e.clientY,
        dx,
        dy,
      },
    })
    prevX = e.clientX
    prevY = e.clientY
  }

  node.addEventListener('mousedown', mouseDown)
  return {
    destroy() {
      node.removeEventListener('mousedown', mouseDown)
      document.removeEventListener('mousemove', throttledMouseMove)
      document.removeEventListener('mouseup', mouseUp)
    },
  }
}

export default useDrag
