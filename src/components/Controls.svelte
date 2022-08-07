<script lang="ts">
  import { Move, Brush, X } from 'lucide-svelte'
  import Box from './Box.svelte'
  import Button from './Button.svelte'
  import { CLASSES } from '../consts'
  import { closeWindow } from '../utils/appwindow'
  import { isQuietMode, isDrawMode, position } from '../store/state'
  import { toggleMode } from '../store/mutations'
  import useDrag from '../utils/actions/useDrag'
</script>

<div
  id="controls"
  data-tauri-drag-region={$isQuietMode ? true : null}
  data-drag-container={$isDrawMode ? true : null}
  data-drag={$isDrawMode ? true : null}
  style:--position-x={$position[0]}
  style:--position-y={$position[1]}
  class:draggable={$isDrawMode}
  use:useDrag
>
  <Box
    data-tauri-drag-region={$isQuietMode ? true : null}
    data-drag={$isDrawMode ? true : null}
    class={CLASSES.size40}
  >
    <Move size={20} color="#313C44" opacity={0.3} />
  </Box>
  <Button
    onClick={() => {
      toggleMode()
    }}
    class={CLASSES.size40}
    aria-pressed={$isDrawMode}
  >
    <Brush size={20} color="#313C44" />
  </Button>
  <Button
    onClick={() => {
      closeWindow()
    }}
    class={CLASSES.size40}
  >
    <X size={24} color="#ff7e40" />
  </Button>
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-align: center;
    width: min-content;
    height: min-content;
    border-radius: 12px;
    border: 4px solid #2c2d2e;
    background-color: #fefefa;
    padding: 12px;
    box-shadow: 2px 2px 0px 2px #2c2d2e;
  }
</style>
