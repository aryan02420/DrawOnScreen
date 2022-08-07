import { open } from '@tauri-apps/api/shell';
import Mousetrap from 'mousetrap'
import App from './App.svelte'
import { toggleMode } from './store/mutations'
import { closeWindow } from './utils/appwindow'

const app = new App({
  target: document.body,
  props: {},
})

Mousetrap.bind('?', () => {
  // FIXME: does not open browser
  open('https://github.com/aryan02420')
})
Mousetrap.bind('d', () => {
  toggleMode()
})
Mousetrap.bind('mod+w', () => {
  closeWindow()
})

export default app
