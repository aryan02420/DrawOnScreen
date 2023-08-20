<script>
  import Icon from './BaseIcon.svelte'
</script>

<Icon name="brush-laser" {...$$props}>
  <circle cx="12.1" cy="12.1" r="1"/>
  <slot />
</Icon>
