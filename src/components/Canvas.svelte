<script lang="ts">
  // state
  import createCountdown from '../store/factory/countdown'
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  // utils
  import { CLASSES, colors } from '../consts'
  import { hideCursor, showCursor } from '../utils/appwindow'
  import pickRandom from '../utils/pickRandom'
  import fastLength from '../utils/fastDistance'
  import angle from '../utils/angle'

  const color = pickRandom(colors)
  let start: [number, number] | null
  let deltas: {
    vec: [number, number]
    len: number
    angle: number
  }[]
  let paths: string[] = []

  const countDown = createCountdown(2, 0.02, 3)
  const opacity = countDown.value

  $: path = start ? `M ${start.join(',')} l 0,0 ${deltas.map((d) => `l ${d.vec.join(',')}`).join(' ')}` : ''
  $: {
    if ($opacity < 0) {
      start = null
      deltas = []
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
    callback: ({ type, payload }) => {
      switch (type) {
        case ActionCallbackType.Start: {
          countDown.reset()
          start = [payload.x, payload.y]
          deltas = []
          hideCursor()
          break
        }

        case ActionCallbackType.Move: {
          const lastDelta = deltas.length ? deltas[deltas.length - 1] : null
          const delta = {
            vec: [payload.dx, payload.dy],
            len: fastLength(payload.dx, payload.dy),
            angle: angle([payload.dx, payload.dy]),
          }
          if (lastDelta === null) {
            // @ts-ignore
            deltas = deltas.concat([delta])
            return
          }
          const nvec = [lastDelta.vec[0] + delta.vec[0], lastDelta.vec[1] + delta.vec[1]]
          // @ts-ignore
          const nlen = fastLength(...nvec)
          // @ts-ignore
          const ang = angle(delta.vec, lastDelta.vec)
          if (nlen < 10 || ang < 0.2) {
            deltas[deltas.length - 1] = {
              // @ts-ignore
              vec: nvec,
              len: nlen,
              // @ts-ignore
              angle: angle(nvec),
            }
            return
          }
          // @ts-ignore
          deltas = deltas.concat([delta])
          break
        }

        case ActionCallbackType.End: {
          paths = paths.concat(path)
          start = null
          deltas = []
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
    box-shadow: inset 0px 0px 0px 5px rgba(255, 255, 255, 1), inset 0px 0px 0px 20px rgba(var(--color), 0.33),
      inset 0px 0px 0px 15px rgba(var(--color), 0.33), inset 0px 0px 0px 10px rgba(255, 255, 255, 0.33);
    cursor: crosshair;
  }
</style>
