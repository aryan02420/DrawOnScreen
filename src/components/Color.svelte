<script lang="ts">
  export let color = 'transparent'
  export let size: 'small' | 'default' = 'default'
</script>

<div {...$$restProps} style:background={color} class:small={size === 'small'}><slot /></div>

<style>
  div {
    display: flex;
    flex-direction: row;
    gap: 2px;
    justify-content: center;
    align-items: center;
  }
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
