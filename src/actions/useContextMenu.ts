import type { Action } from 'svelte/action'

interface ActionOptions {
  condition?: (event: MouseEvent) => boolean
  preventDefault?: boolean
  stopPropagation?: boolean
  callback?: (e: MouseEvent) => void
}

const useContextMenu: Action<HTMLElement, ActionOptions> = (node, options = {}) => {
  let { condition = null, preventDefault = true, stopPropagation = false, callback } = options

  function handler(e: MouseEvent) {
    if (condition ? condition(e) : true) {
      if (preventDefault) e.preventDefault()
      if (stopPropagation) e.stopPropagation()
      callback?.(e)
    }
  }

  node.addEventListener('contextmenu', handler)

  return {
    destroy() {
      node.removeEventListener('contextmenu', handler)
    },
    update(options = {}) {
      let {
        condition: _condition = null,
        preventDefault: _preventDefault = true,
        stopPropagation: _stopPropagation = false,
        callback: _callback,
      } = options
      condition = _condition
      preventDefault = _preventDefault
      stopPropagation = _stopPropagation
      callback = _callback
    },
  }
}

export default useContextMenu
