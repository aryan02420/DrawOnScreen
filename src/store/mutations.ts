import { get } from 'svelte/store'
import { AppMode, appMode, position } from './state'
import type { Position } from './state'
import { closeSettings } from './settings'
import { getWindowPosition, osSpecificFullWindow, setWindowPosition, osSpecificMiniWindow } from '../utils/appwindow'

const devicePixelRatio = window?.devicePixelRatio || 1

export function toggleMode() {
  appMode.update((currentMode) => {
    if (currentMode === AppMode.quiet) {
      getWindowPosition().then(async (windowPosition) => {
        await osSpecificFullWindow()
        const fullScreenOffset = await getWindowPosition()
        setPosition([windowPosition[0] - fullScreenOffset[0], windowPosition[1] - fullScreenOffset[1]])
      })
      return AppMode.draw
    }
    closeSettings()
    getWindowPosition().then(async (fullScreenOffset) => {
      await osSpecificMiniWindow()
      const pos = getPosition()
      setWindowPosition([pos[0] + fullScreenOffset[0], pos[1] + fullScreenOffset[1]])
    })
    return AppMode.quiet
  })
}

export function getPosition() {
  const pos = get(position)
  return [pos[0] * devicePixelRatio, pos[1] * devicePixelRatio] as Position
}

export function setPosition(p: Position) {
  position.set([p[0] / devicePixelRatio, p[1] / devicePixelRatio])
}

export function offsetPosition(p: Position) {
  position.update((pos) => [pos[0] + p[0], pos[1] + p[1]])
}
