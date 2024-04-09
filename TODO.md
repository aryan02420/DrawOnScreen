## settings panel

- ### Drawing level

  - 0 => No strokes disappear
  - 1 => All strokes disappear together after timeout
  - 2 => Strokes disappear independently after timeout
  - 3 => Stroke disappears just after drawing

- ### Drawing type

  - lines / polygon
  - curves / circle
  - laser (only point is drawn)
  - auto

- ### Threshold (expert only)

  - throttle value (10-100)
  - length limit (0-200)
  - angle limit (0-1.57)

- ### help button

    links to github which mentions kbd shortuts / config files


## Shortcuts

- global shortcut to toggle draw/quiet mode
- global shortcut to change color
- global shortcut to change drawing level
- global shortcut to clear drawing immediately

> show toast notification of each change

> also use local shortcuts when app is in focus
> eg mod+D to change mode, but also D when app is in focus

## config file

- shortcuts
- default drawing level
- color palette
- default threshold levels [expert only]
- expert mode boolean

## Technical

- give more preference to horizontal, vertical, +-45deg, [+-30deg, +-60deg] lines
- smooth curve after drawing
- pointer / touch event support
- change control panel layout to vertical when near screen edges
- right click to clear


- show toast when settings changed
- show shortcut hints
- show blob under pointer


https://medium.com/@ssamuel.sushant/unifying-state-across-frontend-and-backend-in-tauri-a-detailed-walkthrough-3b73076e912c---