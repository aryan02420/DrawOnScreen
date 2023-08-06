import { writable, derived, get } from 'svelte/store'
import { colors } from '../consts'
import sample from 'lodash/sample'
import { Draw, DrawSimple, DrawRect, DrawEllipse, DrawLine, DrawArrow } from '../utils/draw'

export const isSettingsVisible = writable(false)

export function openSettings() {
  isSettingsVisible.set(true)
}

export function closeSettings() {
  isSettingsVisible.set(false)
}

export function toggleSettings() {
  isSettingsVisible.update((s) => !s)
}

export const enum StrokeDisappearLevelType {
  Never,
  Group,
  Independent,
  Instant,
}

export const strokeDisappearLevel = writable<StrokeDisappearLevelType>(StrokeDisappearLevelType.Group)

export function setStrokeDisappearNever() {
  strokeDisappearLevel.set(StrokeDisappearLevelType.Never)
}
export function setStrokeDisappearGroup() {
  strokeDisappearLevel.set(StrokeDisappearLevelType.Group)
}
export function setStrokeDisappearIndependent() {
  strokeDisappearLevel.set(StrokeDisappearLevelType.Independent)
}
export function setStrokeDisappearInstant() {
  strokeDisappearLevel.set(StrokeDisappearLevelType.Instant)
}

export function setStrokeDisappearLevelNext() {
  strokeDisappearLevel.update((level) => {
    return (level + 1) % 4
  })
}

export const enum StrokeColorSourceType {
  Random,
  Picker,
  Theme,
}

export const strokeColorSource = writable<StrokeColorSourceType>(StrokeColorSourceType.Random)

export function setStrokeColorSourceRandom() {
  strokeColorSource.set(StrokeColorSourceType.Random)
}
export function setStrokeColorSourcePicker() {
  strokeColorSource.set(StrokeColorSourceType.Picker)
}
export function setStrokeColorSourceTheme() {
  strokeColorSource.set(StrokeColorSourceType.Theme)
}

export const strokeColorThemeIndex = writable(0)

export function setStrokeColorThemeIndex(index: number) {
  strokeColorThemeIndex.set((index + colors.length) % colors.length)
}

export function setStrokeColorThemeIndexNext() {
  setStrokeColorThemeIndex(get(strokeColorThemeIndex) + 1)
}

export function setStrokeColorThemeIndexPrev() {
  setStrokeColorThemeIndex(get(strokeColorThemeIndex) - 1)
}

export const strokeColorRandom = writable(sample(colors)!)

export function setStrokeColorRandom() {
  strokeColorRandom.set(sample(colors)!)
}

export const strokeColorTheme = derived(strokeColorThemeIndex, (index) => colors[index])

export const strokeColor = derived(
  [strokeColorSource, strokeColorTheme, strokeColorRandom],
  ([source, themeColor, randomColor]) => {
    if (source === StrokeColorSourceType.Random) return randomColor
    return themeColor
  }
)


export const enum StrokeWidthType {
  Thin,
  Medium,
  Heavy,
}

export type StrokeWidthLevelType = {
  color: string
  width: number
  opacity: number
}[]

export const StrokeWidthLevels: Record<StrokeWidthType, StrokeWidthLevelType> = {
  [StrokeWidthType.Thin]: [
    {
      color: 'currentColor',
      width: 12,
      opacity: 0.2,
    },
    {
      color: 'currentColor',
      width: 8,
      opacity: 0.33,
    },
    {
      color: 'currentColor',
      width: 4,
      opacity: 1,
    },
    {
      color: '#ffffff',
      width: 2,
      opacity: 0.5,
    },
  ],
  [StrokeWidthType.Medium]: [
    {
      color: 'currentColor',
      width: 18,
      opacity: 0.2,
    },
    {
      color: 'currentColor',
      width: 12,
      opacity: 0.33,
    },
    {
      color: 'currentColor',
      width: 6,
      opacity: 1,
    },
    {
      color: '#ffffff',
      width: 3,
      opacity: 0.4,
    },
  ],
  [StrokeWidthType.Heavy]: [
    {
      color: 'currentColor',
      width: 24,
      opacity: 0.2,
    },
    {
      color: 'currentColor',
      width: 16,
      opacity: 0.33,
    },
    {
      color: 'currentColor',
      width: 8,
      opacity: 1,
    },
    {
      color: '#ffffff',
      width: 4,
      opacity: 0.3,
    },
  ],
}

export const strokeWidth = writable<StrokeWidthType>(StrokeWidthType.Thin)

export function setStrokeWidthThin() {
  strokeWidth.set(StrokeWidthType.Thin)
}
export function setStrokeWidthMedium() {
  strokeWidth.set(StrokeWidthType.Medium)
}
export function setStrokeWidthHeavy() {
  strokeWidth.set(StrokeWidthType.Heavy)
}

export function setStrokeWidthNext() {
  strokeWidth.update((width) => {
    return (width + 1) % 3
  })
}

export const strokeWidthLevel = derived(strokeWidth, (width) => StrokeWidthLevels[width])


export const enum BrushType {
  None,
  Smooth,
  Rect,
  Ellipse,
  Line,
  Arrow,
}

export const BrushMap: Record<BrushType, typeof Draw> = {
  [BrushType.None]: Draw,
  [BrushType.Smooth]: DrawSimple,
  [BrushType.Rect]: DrawRect,
  [BrushType.Ellipse]: DrawEllipse,
  [BrushType.Line]: DrawLine,
  [BrushType.Arrow]: DrawArrow,
}

export const brushType = writable<BrushType>(BrushType.None)

export function setBrushTypeNone() {
  brushType.set(BrushType.None)
}

export function setBrushTypeSmooth() {
  brushType.set(BrushType.Smooth)
}

export function setBrushTypeRect() {
  brushType.set(BrushType.Rect)
}

export function setBrushTypeEllipse() {
  brushType.set(BrushType.Ellipse)
}

export function setBrushTypeLine() {
  brushType.set(BrushType.Line)
}

export function setBrushTypeArrow() {
  brushType.set(BrushType.Arrow)
}

export function setBrushTypeNext() {
  brushType.update((type) => {
    return (type + 1) % 6
  })
}

export const brush = derived(brushType, (type) => BrushMap[type])