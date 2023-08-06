
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

const keyMap = {
  // General shortcuts
  '?': openHelp,
  esc: toggleMode,
  'mod+w': closeWindow,
  // Brush shortcuts
  b: setBrushTypeNext,
  'b 1': setBrushTypeNone,
  'b 2': setBrushTypeSmooth,
  'b 3': setBrushTypeRect,
  'b 4': setBrushTypeEllipse,
  'b 5': setBrushTypeLine,
  'b 6': setBrushTypeArrow,
  // Color shortcuts
  c: () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndexNext()
  },
  'c 1': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(0)
  },
  'c 2': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(1)
  },
  'c 3': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(2)
  },
  'c 4': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(3)
  },
  'c 5': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(4)
  },
  'c 6': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(5)
  },
  'c 7': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(6)
  },
  'c 8': () => {
    setStrokeColorSourceTheme()
    setStrokeColorThemeIndex(7)
  },
  'c r': () => {
    setStrokeColorSourceRandom()
    setStrokeColorRandom()
  },
  // Stroke width shortcuts
  s: setStrokeWidthNext,
  's 1': setStrokeWidthThin,
  's 2': setStrokeWidthMedium,
  's 3': setStrokeWidthHeavy,
  // Stroke disappear shortcuts
  d: setStrokeDisappearLevelNext,
  'd 1': setStrokeDisappearNever,
  'd 2': setStrokeDisappearGroup,
  'd 3': setStrokeDisappearIndependent,
  'd 4': setStrokeDisappearInstant,
}

for (const [key, callback] of Object.entries(keyMap)) {
  Mousetrap.bind(key, callback)
}

register('CommandOrControl+Shift+D', () => {
  toggleMode()
});

export default app
