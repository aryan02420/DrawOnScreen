import { writable } from 'svelte/store'

/**
 * 
 * @param from start countdown from
 * @param step decrease by amount
 * @param duration finish countdown in seconds
 * 
 */
const createCountown = (from: number, step: number, duration: number) => {
  let interval: NodeJS.Timer
  let next = from

  const value = writable(from)

  const start = () => {
    interval = setInterval(() => {
      next -= step
      value.set(next)
      if (next < 0) clearInterval(interval)
    }, duration * 1000 / from * step)
  }

  const pause = () => {
    clearInterval(interval)
  }

  const reset = () => {
    pause()
    next = from
    value.set(from)
  }

  const restart = () => {
    reset()
    start()
  }

  return { value, start, pause, reset, restart }
}

export default createCountown
