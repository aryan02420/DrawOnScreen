import { process, window } from '@tauri-apps/api'
import type { Position } from '../store/state'

const appWin = window.appWindow

export const closeWindow = () => process.exit()

export const maximizeWindow = async () => {
  await appWin.maximize()
}

export const unmaximizeWindow = async () => {
  await appWin.unmaximize()
}

export const getWindowPosition = async () => {
  return await appWin.innerPosition()
}

export const setWindowPosition = async ([x, y]: Position) => {
  const pos = new window.PhysicalPosition(x, y)
  await appWin.setPosition(pos)
}
