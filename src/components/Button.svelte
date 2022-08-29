<script lang="ts">
  import { noop } from '../consts'
  export let onClick: (...args: any[]) => any = noop
</script>

<button on:click={onClick} {...$$restProps}><slot /></button>

<style>
</style>
