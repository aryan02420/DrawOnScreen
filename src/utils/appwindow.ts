import { exit } from '@tauri-apps/api/process'
import { appWindow, PhysicalPosition } from '@tauri-apps/api/window'
import { type as osType } from '@tauri-apps/api/os'
import { open } from '@tauri-apps/api/shell'

import type { Position } from '../store/state'


export const closeWindow = async () => {
  try {
    await exit()
  } catch {}
}

export const maximizeWindow = async () => {
  try {
    await appWindow.maximize()
  } catch {}
}

export const unmaximizeWindow = async () => {
  try {
    await appWindow.unmaximize()
  } catch {}
}

export const fullscreenWindow = async () => {
  try {
    await appWindow.setFullscreen(true)
  } catch {}
}

export const unfullscreenWindow = async () => {
  try {
    await appWindow.setFullscreen(false)
  } catch {}
}

export const osSpecificFullWindow =async () => {
  try {
    if (await osType() == 'Darwin') {
      await maximizeWindow()
    } else {
      await fullscreenWindow()
    }
  } catch {}
};

export const osSpecificMiniWindow =async () => {
  try {
    if (await osType() == 'Darwin') {
      await unmaximizeWindow()
    } else {
      await unfullscreenWindow()
    }
  } catch {}
};

export const getWindowPosition = async (): Promise<Position> => {
  try {
    const pos = await appWindow.innerPosition()
    return [pos.x, pos.y]
  } catch {
    return [0, 0]
  }
}

export const setWindowPosition = async ([x, y]: Position) => {
  try {
    const pos = new PhysicalPosition(x, y)
    await appWindow.setPosition(pos)
  } catch {}
}

// FIXME: doesnot work on linux
export const hideCursor = async () => {
  try {
    await appWindow.setCursorVisible(false)
  } catch {}
}

export const showCursor = async () => {
  try {
    await appWindow.setCursorVisible(true)
  } catch {}
}

export const openHelp = async () => {
  try {
    open('https://github.com/aryan02420')
  } catch {}
}
