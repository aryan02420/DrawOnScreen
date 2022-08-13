<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-medium" {...$$props}>
  <circle cx="12" cy="12" r="7" />
  <slot />
</Icon>
