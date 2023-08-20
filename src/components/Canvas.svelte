<script lang="ts">
  // actions
  import useDrag, { ActionCallbackType } from '../actions/useDrag'
  import useContextMenu from '../actions/useContextMenu'
  import useAnimationFrame from '../actions/useAnimationFrame'
  // store
  import { brush, setStrokeColorRandom, strokeColor, strokeDisappearLevel, StrokeDisappearLevelType, strokeWidthLevel, StrokeWidthLevelType} from '../store/settings'
  // utils
  import { hideCursor, showCursor } from '../utils/appwindow'
  import { Draw } from '../utils/draw'

  type Path = {
    d: string
    color: string
    opacity: number
    strokes: StrokeWidthLevelType
  }

  setStrokeColorRandom()
  let currentPath: Draw | null = null
  let paths: Path[] = []

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
          currentPath = new Draw()
          currentPath.addPoint([payload.x, payload.y])
          hideCursor()
          break
        }

        case ActionCallbackType.Move: {
          currentPath?.addPoint([payload.x, payload.y])
          currentPath = currentPath
          break
        }

        case ActionCallbackType.End: {
          paths = paths.concat([
            {
              d: currentPath ? $brush(currentPath) : '',
              color: $strokeColor,
              opacity: startOpacity,
              strokes: $strokeWidthLevel,
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
  use:useContextMenu={{
    callback: () => {
      if (currentPath) {
        currentPath = null
      } else {
        paths = []
      }
    }
  }}
  use:useAnimationFrame={(dt) => {
    // FIXME: too many callbacks
    const decreaseOpacity = opactiyPerMS * dt
    const lastPathNewOpacity = paths.length > 0 ? paths[paths.length - 1].opacity - decreaseOpacity : startOpacity
    paths = paths.reduce((newArr, currPath, currIndex) => {
      switch ($strokeDisappearLevel) {
        case StrokeDisappearLevelType.Never:
          currPath.opacity = startOpacity
          break
        case StrokeDisappearLevelType.Group:
          currPath.opacity = currentPath ? startOpacity : lastPathNewOpacity
          break
        case StrokeDisappearLevelType.Independent:
          currPath.opacity -= decreaseOpacity
          break
        case StrokeDisappearLevelType.Single:
          currPath.opacity = currentPath ? 0 : lastPathNewOpacity
          break
        case StrokeDisappearLevelType.Instant:
          currPath.opacity = 0
          break
      }
      // @ts-ignore
      if (currPath.opacity > 0) newArr.push(currPath)
      return newArr
    }, [])
  }}
>
  <svg
    class="fullsize"
    color="rgb(var(--color))"
    stroke="currentColor"
    fill="none"
    stroke-linecap="round"
    stroke-linejoin="round"
    opacity="1"
  >
    {#each paths as p, i (i)}
      <g style:--color={p.color} color="rgb(var(--color))" opacity={p.opacity}>
        {#each p.strokes as strokes, i (i)}
          <path d={p.d} stroke-width={strokes.width} opacity={strokes.opacity} stroke={strokes.color} />
        {/each}
      </g>
    {/each}
    {#if currentPath}
      {@const d = $brush(currentPath)}
      <g>
        {#each $strokeWidthLevel as strokes, i (i)}
          <path d={d} stroke-width={strokes.width} opacity={strokes.opacity} stroke={strokes.color} />
        {/each}
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
    touch-action: none;
  }
</style>
