<script lang="ts">
  // state
  import createCountdown from '../store/factory/countdown'
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  // utils
  import { CLASSES, colors } from '../consts'
  import { hideCursor, showCursor } from '../utils/appwindow'
  import pickRandom from '../utils/pickRandom'
  import { Path } from '../utils/makePath'

  const color = pickRandom(colors)
  let currentPath: Path | null = null
  let paths: {
    d: string
    color?: string
    opacity?: number
    created: number
  }[] = []

  const countDown = createCountdown(2, 0.02, 3)
  const opacity = countDown.value

  $: {
    if ($opacity < 0) {
      currentPath = null
      paths = []
    }
  }
</script>

<div
  id="canvas"
  style:--color={color}
  use:useDrag={{
    wait: 10,
    preventDefault: true,
    stopPropagation: true,
    condition: (e) => e.button === 0,
    callback: ({ type, payload }) => {
      switch (type) {
        case ActionCallbackType.Start: {
          countDown.reset()
          currentPath = new Path([payload.x, payload.y])
          hideCursor()
          break
        }

        case ActionCallbackType.Move: {
          currentPath?.draw([payload.dx, payload.dy])
          currentPath = currentPath
          break
        }

        case ActionCallbackType.End: {
          paths = paths.concat([{
            d: currentPath?.getSVGPath() || '',
            color: color,
            created: Date.now()
          }])
          currentPath = null
          countDown.start()
          showCursor()
          break
        }

        default:
          break
      }
    },
  }}
>
  <svg
    class={CLASSES.fullSize}
    stroke="rgb( var(--color) )"
    stroke-width="4"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity={$opacity}
  >
    {#each paths as p, i (i)}
      <g style:--color={p.color} stroke="rgb( var(--color) )" opacity={p.opacity}>
        <path d={p.d} stroke-width="12" opacity={0.2} />
        <path d={p.d} stroke-width="8" opacity={0.33} />
        <path d={p.d} />
        <path d={p.d} stroke-width="2" opacity={0.4} stroke="#ffffff" />
      </g>
    {/each}
    {#if currentPath}
      {@const d = currentPath.getSVGPath()}
      <g>
        <path d={d} stroke-width="12" opacity={0.2} />
        <path d={d} stroke-width="8" opacity={0.33} />
        <path d={d} />
        <path d={d} stroke-width="2" opacity={0.4} stroke="#ffffff" />
      </g>
    {/if}
  </svg>
</div>

<style>
  div {
    position: fixed;
    inset: 0;
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, 1), inset 0px 0px 0px 10px rgba(var(--color), 0.5),
      inset 0px 0px 0px 15px rgba(var(--color), 0.4), inset 0px 0px 0px 20px rgba(var(--color), 0.3);
    cursor: crosshair;
  }
</style>
