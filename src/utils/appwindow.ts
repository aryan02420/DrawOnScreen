import { exit } from '@tauri-apps/api/process'
import { appWindow, PhysicalPosition } from '@tauri-apps/api/window'

import type { Position } from '../store/state'


export const closeWindow = async () => {
  await exit()
}

export const maximizeWindow = async () => {
  await appWindow.maximize()
}

export const unmaximizeWindow = async () => {
  await appWindow.unmaximize()
}

export const getWindowPosition = async () => {
  return await appWindow.innerPosition()
}

export const setWindowPosition = async ([x, y]: Position) => {
  const pos = new PhysicalPosition(x, y)
  await appWindow.setPosition(pos)
}

// FIXME: doesnot work on linux
export const hideCursor = async () => {
  await appWindow.setCursorVisible(false)
}

export const showCursor = async () => {
  await appWindow.setCursorVisible(true)
}
