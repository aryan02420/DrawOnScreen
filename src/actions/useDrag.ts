import type { Action } from 'svelte/action'
import throttle from 'lodash/throttle'

export enum ActionCallbackType {
  Start = 'Start',
  Move = 'Move',
  End = 'End',
}

type ActionCallbackParams = {
  type: ActionCallbackType
  payload: { x: number; y: number; dx: number; dy: number }
}

interface ActionOptions {
  wait?: number
  condition?: (event: PointerEvent) => boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  callback?: (params: ActionCallbackParams) => void
}

const useDrag: Action<HTMLElement, ActionOptions> = (node, options = {}) => {
  let { wait = 16, condition = null, preventDefault = true, stopPropagation = true, callback } = options
  let prevX: number, prevY: number
  let currentPointer: number | null = null

  const throttledPointerMove = throttle(pointerMove, wait, {
    leading: true,
    trailing: true,
  })

  function pointerDown(e: PointerEvent) {
    // only track first pointer that satisfies the condition
    const validCondition = condition ? condition(e) : true
    if (!validCondition) return
    if (currentPointer) return
    currentPointer = e.pointerId

    if (preventDefault) e.preventDefault()
    if (stopPropagation) e.stopPropagation()

    document.addEventListener('pointermove', throttledPointerMove)
    document.addEventListener('pointerup', pointerUp)

    callback?.({
      type: ActionCallbackType.Start,
      payload: {
        x: e.clientX,
        y: e.clientY,
        dx: 0,
        dy: 0,
      },
    })

    prevX = e.clientX
    prevY = e.clientY
  }

  function pointerUp(e: PointerEvent) {
    if (currentPointer !== e.pointerId) return
    currentPointer = null

    document.removeEventListener('pointermove', throttledPointerMove)
    document.removeEventListener('pointerup', pointerUp)

    callback?.({
      type: ActionCallbackType.End,
      payload: {
        x: e.clientX,
        y: e.clientY,
        dx: e.clientX - prevX,
        dy: e.clientY - prevY,
      },
    })
  }

  function pointerMove(e: PointerEvent) {
    if (currentPointer !== e.pointerId) return

    callback?.({
      type: ActionCallbackType.Move,
      payload: {
        x: e.clientX,
        y: e.clientY,
        dx: e.clientX - prevX,
        dy: e.clientY - prevY,
      },
    })
    
    prevX = e.clientX
    prevY = e.clientY
  }

  node.addEventListener('pointerdown', pointerDown)
  return {
    destroy() {
      node.removeEventListener('pointerdown', pointerDown)
      document.removeEventListener('pointermove', throttledPointerMove)
      document.removeEventListener('pointerup', pointerUp)
    },
    update(options = {}) {
      let {
        wait: _wait = 16,
        condition: _condition = null,
        preventDefault: _preventDefault = true,
        stopPropagation: _stopPropagation = true,
        callback: _callback,
      } = options
      wait = _wait
      condition = _condition
      preventDefault = _preventDefault
      stopPropagation = _stopPropagation
      callback = _callback
    },
  }
}

export default useDrag
