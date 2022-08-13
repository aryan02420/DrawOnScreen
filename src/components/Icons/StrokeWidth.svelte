<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-width" {...$$props}>
  <line x1="3" y1="3" x2="21" y2="3" />
  <rect x="3" y="7" width="18" height="4" rx="2" />
  <rect x="3" y="15" width="18" height="6" rx="2" />
  <slot />
</Icon>
