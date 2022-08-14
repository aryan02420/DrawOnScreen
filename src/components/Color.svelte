<script lang="ts">
  export let color = 'transparent'
  export let size: 'small' | 'default' = 'default'
</script>

<div {...$$restProps} style:background={color} class:small={size === 'small'} />

<style>
  div {
    border: 2px solid rgb(var(--invisible));
    border-radius: 24px;
    width: 24px;
    height: 24px;
  }
  .small {
    border-radius: 16px;
    width: 16px;
    height: 8px;
  }
</style>
