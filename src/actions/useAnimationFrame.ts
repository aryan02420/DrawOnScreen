import type { Action } from 'svelte/action'

type ActionCallback = (deltaTime: number, animationHandle: number) => void

const useAnimationFrame: Action<HTMLElement, ActionCallback> = (node, cb) => {
  let animationHandle: number
  let prevTimestamp = performance.now()
  let callback = cb

  const animate = (timestamp: number) => {
    const deltaTime = timestamp - prevTimestamp
    prevTimestamp = timestamp
    callback?.(deltaTime, animationHandle)
    animationHandle = requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)

  return {
    destroy() {
      cancelAnimationFrame(animationHandle)
    },
    update(cb) {
      callback = cb
    },
  }
}

export default useAnimationFrame
