import { get } from 'svelte/store'
import { AppMode, appMode, position } from './state'
import type { Position } from './state'
import { getWindowPosition, fullscreenWindow, setWindowPosition, unfullscreenWindow } from '../utils/appwindow'

export function toggleMode() {
  appMode.update((m) => {
    if (m === AppMode.quiet) {
      setPosition(null)
      fullscreenWindow()
      return AppMode.draw
    }
    unfullscreenWindow().then(() => {
      setWindowPosition(get(position))
    })
    return AppMode.quiet
  })
}

export function setPosition(p: Position | null) {
  if (p !== null) {
    position.set(p)
    return
  }

  getWindowPosition().then((pos) => {
    position.set(pos)
  })
}

export function offsetPosition(p: Position) {
  position.update((pos) => [pos[0] + p[0], pos[1] + p[1]])
}
