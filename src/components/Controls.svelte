<script lang="ts">
  // components
  import { GripVertical, Pencil, Settings, X } from 'lucide-svelte'
  import Box from './Box.svelte'
  import Button from './Button.svelte'
  // state
  import { isQuietMode, isDrawMode, position } from '../store/state'
  import { toggleMode, offsetPosition } from '../store/mutations'
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  // utils
  import { CLASSES } from '../consts'
  import { closeWindow } from '../utils/appwindow'
</script>

<div
  id="controls"
  data-tauri-drag-region={$isQuietMode ? true : null}
  data-drag-container={$isDrawMode ? true : null}
  data-drag={$isDrawMode ? true : null}
  style:--position-x={$position[0]}
  style:--position-y={$position[1]}
  use:useDrag={{
    // FIXME:
    // @ts-ignore
    condition: (e) => e.target.hasAttribute?.('data-drag'),
    callback: ({ type, payload }) => {
      switch (type) {
        case ActionCallbackType.Move: {
          offsetPosition([payload.dx, payload.dy])
          break
        }
        default:
          break
      }
    },
  }}
>
  <Box data-tauri-drag-region={$isQuietMode ? true : null} data-drag={$isDrawMode ? true : null} class={CLASSES.size40}>
    <GripVertical size={20} color="#313C44" opacity={0.3} />
  </Box>
  <Button
    onClick={() => {
      toggleMode()
    }}
    class={CLASSES.size40}
    aria-pressed={$isDrawMode}
  >
    <Pencil size={20} color="#313C44" />
  </Button>
  {#if $isDrawMode}
    <Button class={CLASSES.size40}>
      <Settings size={20} color="#313C44" />
    </Button>
  {/if}
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
