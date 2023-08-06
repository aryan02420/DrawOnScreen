<script lang="ts">
  import {
    ChevronLeft,
    ChevronRight,
    Dice5,
    Edit3,
    Eraser,
    GripVertical,
    HelpCircle,
    Palette,
    Pipette,
    Square,
    Circle,
    Minus,
    ArrowRight,
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
    strokeColorThemeIndex,
    setStrokeColorThemeIndex,
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
    brushType,
    BrushType,
    setBrushTypeNone,
    setBrushTypeSmooth,
    setBrushTypeRect,
    setBrushTypeEllipse,
    setBrushTypeLine,
    setBrushTypeArrow,
  } from '../store/settings'
  import { openHelp } from '../utils/appwindow'
  import { colors } from '../consts'
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
    <!-- <Divider /> -->
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
      <Edit3 size={20} class="text-disabled" />
    </Box>
    <div class="settings_button_group">
      <Button class="size-40 flex-fill" onClick={setBrushTypeNone} aria-pressed={$brushType === BrushType.None}>
        <StrokeSharp size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill" onClick={setBrushTypeSmooth} aria-pressed={$brushType === BrushType.Smooth}>
        <StrokeSmooth size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill" onClick={setBrushTypeRect} aria-pressed={$brushType === BrushType.Rect}>
        <Square size={20}  class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill" onClick={setBrushTypeEllipse} aria-pressed={$brushType === BrushType.Ellipse}>
        <Circle size={20}  class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill" onClick={setBrushTypeLine} aria-pressed={$brushType === BrushType.Line}>
        <Minus size={20} class="text-primary" />
      </Button>
      <Button class="size-40 flex-fill" onClick={setBrushTypeArrow} aria-pressed={$brushType === BrushType.Arrow}>
        <ArrowRight size={20} class="text-primary" />
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
        onClick={() => {
          setStrokeColorSourceRandom()
          setStrokeColorRandom()
        }}
        aria-pressed={$strokeColorSource === StrokeColorSourceType.Random}
      >
        <Color color={`rgb(${$strokeColorRandom})`}>
          <Dice5 size={12} color="rgb(var(--fg)" strokeWidth={2} class="text-primary" />
        </Color>
      </Button>
      <!--
      <Button class="flex-fill">
        <Button>
          <Pipette size={16} strokeWidth={1.5} class="text-primary" />
        </Button>
        <Color />
      </Button>
      -->
      {#each colors as color, i (i)}
      <Button
        class="flex-fill"
        onClick={() => {
          setStrokeColorSourceTheme()
          setStrokeColorThemeIndex(i)
        }}
        aria-pressed={$strokeColorSource === StrokeColorSourceType.Theme && $strokeColorThemeIndex === i}
      >
        <Color color={`rgb(${color})`} />
      </Button>
    {/each}

    </div>
  </div>
</div>

<style>
  #settings {
    position: absolute;
    inset: 50%;
    width: 480px;
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
