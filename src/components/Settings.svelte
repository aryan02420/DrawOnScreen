<script lang="ts">
  import { ChevronLeft, ChevronRight, Edit3, Eraser, GripVertical, HelpCircle, Palette, Pipette } from 'lucide-svelte'
  import {
    StrokeWidth,
    StrokeThin,
    StrokeMedium,
    StrokeHeavy,
    DisappearNever,
    DisappearGroup,
    DisappearIndependent,
    DisappearInstant,
    StrokeSharp,
    StrokeSmooth,
  } from './Icons'
  import Box from './Box.svelte'
  import Button from './Button.svelte'
  import Color from './Color.svelte'
  import { colors } from '../consts'
  import {
    setStrokeDisappearGroup,
    setStrokeDisappearIndependent,
    setStrokeDisappearInstant,
    setStrokeDisappearNever,
    strokeDisappearLevel,
    StrokeDisappearLevelType,
  } from '../store/settings'
</script>

<div id="settings" class="widget">
  <div class="settings_row">
    <Box class="size-40">
      <GripVertical size={20} class="text-disabled" />
    </Box>
    <div class="flex-fill" />
    <Button class="size-40">
      <HelpCircle size={20} class="text-primary" />
    </Button>
  </div>
  <div class="settings_row">
    <Box class="size-40">
      <Eraser size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeDisappearNever}
        aria-pressed={$strokeDisappearLevel === StrokeDisappearLevelType.Never}
      >
        <DisappearNever size={20} class="text-primary" /></Button
      >
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeDisappearGroup}
        aria-pressed={$strokeDisappearLevel === StrokeDisappearLevelType.Group}
        ><DisappearGroup size={20} class="text-primary" /></Button
      >
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeDisappearIndependent}
        aria-pressed={$strokeDisappearLevel === StrokeDisappearLevelType.Independent}
        ><DisappearIndependent size={20} class="text-primary" /></Button
      >
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeDisappearInstant}
        aria-pressed={$strokeDisappearLevel === StrokeDisappearLevelType.Instant}
        ><DisappearInstant size={20} class="text-primary" /></Button
      >
    </div>
  </div>
  <div class="settings_row">
    <Box class="size-40">
      <Edit3 size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button class="size-40 flex-fill" aria-pressed={true}>
        <StrokeSharp size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill">
        <StrokeSmooth size={20} class="text-primary" />
      </Button>
    </div>
  </div>
  <div class="settings_row">
    <Box class="size-40">
      <StrokeWidth size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button class="size-40 flex-fill" aria-pressed={true}>
        <StrokeThin size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill">
        <StrokeMedium size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill">
        <StrokeHeavy size={20} class="text-primary" />
      </Button>
    </div>
  </div>
  <div class="settings_row">
    <Box class="size-40">
      <Palette size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button class="flex-fill" aria-pressed={true}>
        <Color color={'conic-gradient(#1ff, #11f, #f1f, #f11, #ff1, #1f1, #1ff)'} />
      </Button>
      <Button class="flex-fill">
        <Pipette size={16} class="text-disabled" />
        <Button>
          <Color color={'red'} />
        </Button>
      </Button>
      <Button>
        <Button><ChevronLeft size={16} class="text-primary" /></Button>
        <Color class="flex-fill" color={'red'} />
        <Button><ChevronRight size={16} class="text-primary" /></Button>
      </Button>
    </div>
  </div>
</div>

<style>
  #settings {
    position: absolute;
    inset: 50%;
    width: 260px;
    height: min-content;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .settings_row {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 6px;
    width: 100%;
    height: min-content;
  }
  /* .settings_group {
    display: flex;
    flex-direction: column;
    gap: 0px;
    width: 100%;
    height: min-content;
  } */
  .settings_button_group {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 0px;
    width: 100%;
  }
</style>
