<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-heavy" {...$$props}>
  <circle cx="12" cy="12" r="10" />
  <slot />
</Icon>
