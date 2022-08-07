<script lang="ts">
  import Canvas from './components/Canvas.svelte'
  import Controls from './components/Controls.svelte'
  import { isDrawMode, isQuietMode } from './store/state'
</script>

<main id="app" class:fullsize={$isDrawMode} class:minsize={$isQuietMode}>
  {#if $isDrawMode}
    <Canvas />
  {/if}
  <Controls />
</main>

<style>
</style>
