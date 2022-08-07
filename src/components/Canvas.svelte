<script lang="ts">
  // state
  import createCountdown from '../store/factory/countdown'
  // actions
  import useDraw from '../utils/actions/useDraw'
  // utils
  import { CLASSES, colors } from '../consts'
  import { hideCursor, showCursor } from '../utils/appwindow'
  import pickRandom from '../utils/pickRandom'

  const color = pickRandom(colors)
  let start: [number, number] | null, deltas: [number, number][]
  let paths: string[] = []

  const countDown = createCountdown(2, 0.02, 3)
  const opacity = countDown.value

  $: path = start ? `M ${start.join(',')} l 0,0 ${deltas.map((d) => `l ${d.join(',')}`).join(' ')}` : ''
  $: {
    if ($opacity < 0) {
      start = null
      paths = []
    }
  }
</script>

<div
  id="canvas"
  style:--color={color}
  use:useDraw={{
    wait: 50,
    cb: (_type, _start, _deltas) => {
      switch (_type) {
        case 'start': {
          countDown.reset()
          hideCursor()
          // NO break here
        }

        case 'draw': {
          start = _start
          deltas = _deltas
          break
        }

        case 'done': {
          paths = paths.concat(path)
          start = null
          showCursor()
          countDown.start()
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
      <path d={p} stroke-width="12" opacity={0.2} />
      <path d={p} stroke-width="8" opacity={0.33} />
      <path d={p} />
      <path d={p} stroke-width="2" opacity={0.4} stroke="#ffffff" />
    {/each}
    {#if start}
      <path d={path} stroke-width="12" opacity={0.2} />
      <path d={path} stroke-width="8" opacity={0.33} />
      <path d={path} />
      <path d={path} stroke-width="2" opacity={0.4} stroke="#ffffff" />
    {/if}
  </svg>
</div>

<style>
  div {
    position: fixed;
    inset: 0;
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, 1), inset 0px 0px 0px 20px rgba(var(--color), 0.33), inset 0px 0px 0px 15px rgba(var(--color), 0.33),
      inset 0px 0px 0px 10px rgba(255, 255, 255, 0.33);
    cursor: crosshair;
  }
</style>
