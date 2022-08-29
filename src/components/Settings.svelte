<script lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
    Dices,
    Edit3,
    Eraser,
    GripVertical,
    HelpCircle,
    Palette,
    Pipette,
  } from 'lucide-svelte'
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
  import {
    setStrokeColorRandom,
    setStrokeColorSourceRandom,
    setStrokeColorSourceTheme,
    setStrokeColorThemeIndexNext,
    setStrokeColorThemeIndexPrev,
    setStrokeDisappearGroup,
    setStrokeDisappearIndependent,
    setStrokeDisappearInstant,
    setStrokeDisappearNever,
    strokeColorRandom,
    strokeColorSource,
    StrokeColorSourceType,
    strokeColorTheme,
    strokeDisappearLevel,
    StrokeDisappearLevelType,
    setStrokeWidthThin,
    setStrokeWidthMedium,
    setStrokeWidthHeavy,
    strokeWidth,
    StrokeWidthType,
  } from '../store/settings'
  import { openHelp } from '../utils/appwindow'
</script>

<div id="settings" class="widget">
  <div class="settings_row">
    <Box class="size-40">
      <GripVertical size={20} class="text-disabled" />
    </Box>
    <div class="flex-fill" />
    <Button class="size-40" onClick={openHelp}>
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
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeWidthThin}
        aria-pressed={$strokeWidth === StrokeWidthType.Thin}
      >
        <StrokeThin size={20} class="text-primary" />
      </Button>
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeWidthMedium}
        aria-pressed={$strokeWidth === StrokeWidthType.Medium}
      >
        <StrokeMedium size={20} class="text-primary" />
      </Button>
      <Button
        class="size-40 flex-fill"
        onClick={setStrokeWidthHeavy}
        aria-pressed={$strokeWidth === StrokeWidthType.Heavy}
      >
        <StrokeHeavy size={20} class="text-primary" />
      </Button>
    </div>
  </div>
  <div class="settings_row">
    <Box class="size-40">
      <Palette size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button
        class="flex-fill"
        onClick={setStrokeColorSourceRandom}
        aria-pressed={$strokeColorSource === StrokeColorSourceType.Random}
      >
        <Button onClick={setStrokeColorRandom}>
          <Dices size={16} strokeWidth={1.5} class="text-primary" />
        </Button>
        <Color color={`rgb(${$strokeColorRandom})`} />
      </Button>
      <!--
      <Button class="flex-fill">
        <Button>
          <Pipette size={16} strokeWidth={1.5} class="text-primary" />
        </Button>
        <Color />
      </Button>
      -->
      <Button
        class="flex-fill"
        onClick={setStrokeColorSourceTheme}
        aria-pressed={$strokeColorSource === StrokeColorSourceType.Theme}
      >
        <Button onClick={setStrokeColorThemeIndexPrev}
          ><ChevronLeft size={16} strokeWidth={1.5} class="text-primary" /></Button
        >
        <Color color={`rgb(${$strokeColorTheme})`} />
        <Button onClick={setStrokeColorThemeIndexNext}
          ><ChevronRight size={16} strokeWidth={1.5} class="text-primary" /></Button
        >
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
