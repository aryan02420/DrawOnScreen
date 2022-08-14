<script lang="ts">
  // components
  import { GripVertical, Pencil, Settings, X } from 'lucide-svelte'
  import Box from './Box.svelte'
  import Button from './Button.svelte'
  // state
  import { isQuietMode, isDrawMode, position } from '../store/state'
  import { toggleMode, offsetPosition } from '../store/mutations'
  import { toggleSettings, isSettingsVisible } from '../store/settings';
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  // utils
  import { closeWindow } from '../utils/appwindow'
</script>

<div
  id="controls"
  class="widget"
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
  <Box data-tauri-drag-region={$isQuietMode ? true : null} data-drag={$isDrawMode ? true : null} class="size-40">
    <GripVertical size={20} class="text-disabled" />
  </Box>
  <Button
    onClick={() => {
      toggleMode()
    }}
    class="size-40"
    aria-pressed={$isDrawMode}
  >
    <Pencil size={20} class="text-primary" />
  </Button>
  {#if $isDrawMode}
    <Button
      onClick={() => {
        toggleSettings()
      }}
      class="size-40"
      aria-pressed={$isSettingsVisible}
    >
      <Settings size={20} class="text-primary" />
    </Button>
  {/if}
  <Button
    onClick={() => {
      closeWindow()
    }}
    class="size-40"
  >
    <X size={24} class="text-danger" />
  </Button>
</div>

<style>
  #controls {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 6px;
    text-align: center;
    width: min-content;
    height: min-content;
  }
</style>
