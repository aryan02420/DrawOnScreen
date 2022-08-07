<script lang="ts">
  import { CLASSES } from '../consts'
  import createCountdown from '../store/factory/countdown'
  import useDraw from '../utils/actions/useDraw'
  let start: [number, number], deltas: [number, number][]
  let paths: string[] = []
  $: path = start ? `M ${start.join(',')} l 0,0 ${deltas.map((d) => `l ${d.join(',')}`).join(' ')}` : ''
  let opacity = createCountdown(1, 0.9, 0.1)
  $: {
    if ($opacity < 0) {
      start = null
      paths = []
    }
  }
  const color = `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`
</script>

<div
  id="canvas"
  use:useDraw={{
    throttle: 0,
    cb: (_type, _start, _deltas) => {
      start = _start
      deltas = _deltas
      if (_type === 'temp') opacity = createCountdown(1, 0.02, 3)
      if (_type === 'done') {
        paths = paths.concat(path)
        console.log(paths)
      }
    },
  }}
>
  <svg
    class={CLASSES.fullSize}
    stroke={color}
    stroke-width="10"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity={$opacity}
  >
    {#each paths as p, i (i)}
      <path d={p} />
    {/each}
    <path d={path} />
  </svg>
</div>

<style>
  div {
    position: fixed;
    inset: 0;
    background-color: transparent;
    box-shadow: inset 0px 0px 0px 8px #ffffff77,
      inset 0px 0px 0px 13px #ffffff77,
      inset 0px 0px 0px 16px #ffffff77,
      inset 0px 0px 0px 18px #ffffff77;
    cursor: crosshair;
  }
</style>
