import { get } from "svelte/store"
import { AppMode, appMode, Position, position } from "./state"
import { getWindowPosition, maximizeWindow, setWindowPosition, unmaximizeWindow } from "../utils/appwindow"


export function toggleMode() {
  appMode.update((m) => {
    if (m === AppMode.quiet) {
      setPosition(null)
      maximizeWindow()
      return AppMode.draw
    }
    unmaximizeWindow().then(() => {
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
  getWindowPosition().then(pos => {
    position.set([pos.x, pos.y])
  })
}

export function offsetPosition(p: Position) {
  position.update(pos => [pos[0] + p[0], pos[1] + p[1]])
}
