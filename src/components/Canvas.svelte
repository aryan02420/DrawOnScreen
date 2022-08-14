<script lang="ts">
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  import useAnimationFrame from '../actions/useAnimationFrame'
  // store
  import { setStrokeColorRandom, strokeColor, strokeDisappearLevel, StrokeDisappearLevelType } from '../store/settings'
  // utils
  import { hideCursor, showCursor } from '../utils/appwindow'
  import { Path } from '../utils/makePath'

  setStrokeColorRandom()
  let currentPath: Path | null = null
  let paths: {
    d: string
    color: string
    opacity: number
  }[] = []

  const sustainDuration = 1000
  const decayDuration = 2000
  $: totalDuration = sustainDuration + decayDuration
  $: startOpacity = totalDuration / decayDuration
  $: opactiyPerMS = startOpacity / totalDuration
</script>

<div
  id="canvas"
  style:--color={$strokeColor}
  use:useDrag={{
    wait: 10,
    preventDefault: true,
    stopPropagation: true,
    condition: (e) => e.button === 0,
    callback: ({ type, payload }) => {
      switch (type) {
        case ActionCallbackType.Start: {
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
          paths = paths.concat([
            {
              d: currentPath?.getSVGPath() || '',
              color: $strokeColor,
              opacity: startOpacity,
            },
          ])
          currentPath = null
          showCursor()
          break
        }

        default:
          break
      }
    },
  }}
  use:useAnimationFrame={(dt) => {
    // FIXME: too many callbacks
    const decreaseOpacity = opactiyPerMS * dt
    const lastPathNewOpacity = paths.length > 0 ? paths[paths.length - 1].opacity - decreaseOpacity : startOpacity
    paths = paths.reduce((newArr, curr) => {
      switch ($strokeDisappearLevel) {
        case StrokeDisappearLevelType.Never:
          curr.opacity = startOpacity
          break
        case StrokeDisappearLevelType.Group:
          curr.opacity = currentPath ? startOpacity : lastPathNewOpacity
          break
        case StrokeDisappearLevelType.Independent:
          curr.opacity -= decreaseOpacity
          break
        case StrokeDisappearLevelType.Instant:
          curr.opacity -= startOpacity
          break
      }
      // @ts-ignore
      if (curr.opacity > 0) newArr.push(curr)
      return newArr
    }, [])
  }}
>
  <svg
    class="fullsize"
    stroke="rgb(var(--color))"
    stroke-width="4"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity={1}
  >
    {#each paths as p, i (i)}
      <g style:--color={p.color} stroke="rgb(var(--color))" opacity={p.opacity}>
        <path d={p.d} stroke-width="12" opacity={0.2} />
        <path d={p.d} stroke-width="8" opacity={0.33} />
        <path d={p.d} />
        <path d={p.d} stroke-width="2" opacity={0.4} stroke="#ffffff" />
      </g>
    {/each}
    {#if currentPath}
      {@const d = currentPath.getSVGPath()}
      <g>
        <path {d} stroke-width="12" opacity={0.2} />
        <path {d} stroke-width="8" opacity={0.33} />
        <path {d} />
        <path {d} stroke-width="2" opacity={0.4} stroke="#ffffff" />
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
