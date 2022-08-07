import { readable } from 'svelte/store'

const createCountown = (from: number, step: number, duration: number) => {
  return readable(from, (set) => {
    const interval = setInterval(() => {
      from -= step
      set(from)
      if (from < 0) clearInterval(interval)
    }, duration * 1000 / from * step)

    return () => {
      clearInterval(interval)
    }
  })
}

export default createCountown