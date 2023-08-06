
import { register } from '@tauri-apps/api/globalShortcut';
import Mousetrap from 'mousetrap'
import App from './App.svelte'
import { toggleMode } from './store/mutations'
import { setBrushTypeArrow, setBrushTypeEllipse, setBrushTypeLine, setBrushTypeNext, setBrushTypeNone, setBrushTypeRect, setBrushTypeSmooth, setStrokeColorRandom, setStrokeColorSourceRandom, setStrokeColorSourceTheme, setStrokeColorThemeIndex, setStrokeColorThemeIndexNext, setStrokeDisappearGroup, setStrokeDisappearIndependent, setStrokeDisappearInstant, setStrokeDisappearLevelNext, setStrokeDisappearNever, setStrokeWidthHeavy, setStrokeWidthMedium, setStrokeWidthNext, setStrokeWidthThin } from './store/settings';
import { closeWindow, openHelp } from './utils/appwindow'

const app = new App({
  target: document.body,
  props: {},
})

Mousetrap.bind('?', () => {
  openHelp()
})
Mousetrap.bind('esc', () => {
  toggleMode()
})
Mousetrap.bind('mod+w', () => {
  closeWindow()
})

Mousetrap.bind('b', () => {
  setBrushTypeNext()
})
Mousetrap.bind('b 1', () => {
  setBrushTypeNone()
})
Mousetrap.bind('b 2', () => {
  setBrushTypeSmooth()
})
Mousetrap.bind('b 3', () => {
  setBrushTypeRect()
})
Mousetrap.bind('b 4', () => {
  setBrushTypeEllipse()
})
Mousetrap.bind('b 5', () => {
  setBrushTypeLine()
})
Mousetrap.bind('b 6', () => {
  setBrushTypeArrow()
})

Mousetrap.bind('c', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndexNext()
})
Mousetrap.bind('c 1', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(0)
})
Mousetrap.bind('c 2', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(1)
})
Mousetrap.bind('c 3', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(2)
})
Mousetrap.bind('c 4', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(3)
})
Mousetrap.bind('c 5', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(4)
})
Mousetrap.bind('c 6', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(5)
})
Mousetrap.bind('c 7', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(6)
})
Mousetrap.bind('c 8', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(7)
})
Mousetrap.bind('c 9', () => {
  setStrokeColorSourceTheme()
  setStrokeColorThemeIndex(8)
})
Mousetrap.bind('r', () => {
  setStrokeColorSourceRandom()
  setStrokeColorRandom()
})

Mousetrap.bind('s', () => {
  setStrokeWidthNext()
})
Mousetrap.bind('s 1', () => {
  setStrokeWidthThin()
})
Mousetrap.bind('s 2', () => {
  setStrokeWidthMedium()
})
Mousetrap.bind('s 3', () => {
  setStrokeWidthHeavy()
})

Mousetrap.bind('d', () => {
  setStrokeDisappearLevelNext()
})
Mousetrap.bind('d 1', () => {
  setStrokeDisappearNever()
})
Mousetrap.bind('d 2', () => {
  setStrokeDisappearGroup()
})
Mousetrap.bind('d 3', () => {
  setStrokeDisappearIndependent()
})
Mousetrap.bind('d 4', () => {
  setStrokeDisappearInstant()
})

register('CommandOrControl+Shift+D', () => {
  toggleMode()
});

export default app
