
import { register } from '@tauri-apps/api/globalShortcut';
import Mousetrap from 'mousetrap'
import App from './App.svelte'
import { toggleMode } from './store/mutations'
import { closeWindow, openHelp } from './utils/appwindow'

const app = new App({
  target: document.body,
  props: {},
})

Mousetrap.bind('?', () => {
  openHelp()
})
Mousetrap.bind('d', () => {
  toggleMode()
})
Mousetrap.bind('mod+w', () => {
  closeWindow()
})

register('CommandOrControl+Shift+D', () => {
  toggleMode()
});

export default app
