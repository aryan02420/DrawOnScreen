<script lang="ts">
  // components
  import Canvas from './components/Canvas.svelte'
  import Controls from './components/Controls.svelte'
  import Settings from './components/Settings.svelte'
  // state
  import { isDrawMode, isQuietMode } from './store/state'
  import { isSettingsVisible } from './store/settings';
</script>

<main id="app" class:fullsize={$isDrawMode} class:minsize={$isQuietMode}>
  {#if $isDrawMode}
    <Canvas disappear={1} />
    {#if $isSettingsVisible}
      <Settings />
    {/if}
  {/if}
  <Controls />
</main>

<style>
</style>
