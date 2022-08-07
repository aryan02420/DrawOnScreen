<script lang="ts">
  export let onClick: (...args: any[]) => any | undefined = undefined
</script>

<button on:click|stopPropagation={onClick} {...$$restProps}><slot /></button>

<style>
</style>
