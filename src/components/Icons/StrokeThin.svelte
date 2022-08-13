<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-thin" {...$$props}>
  <circle cx="12" cy="12" r="4" />
  <slot />
</Icon>
