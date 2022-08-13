<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="stroke-sharp" {...$$props}>
  <path d="m 2 12 l 5 7 l 10 -14 l 5 7" />
  <slot />
</Icon>
