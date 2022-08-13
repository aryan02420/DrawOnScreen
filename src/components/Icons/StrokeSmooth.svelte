<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-smooth" {...$$props}>
  <path d="m 2 12 c 3 6 7 6 10 0 c 3 -6 7 -6 10 0" />
  <slot />
</Icon>
