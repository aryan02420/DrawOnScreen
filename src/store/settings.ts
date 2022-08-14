import { writable, derived, get } from 'svelte/store'
import { colors } from '../consts'
import pickRandom from '../utils/pickRandom'


export const isSettingsVisible = writable(false)

export function openSettings() {
  isSettingsVisible.set(true)
}

export function closeSettings() {
  isSettingsVisible.set(false)
}

export function toggleSettings() {
  isSettingsVisible.update(s => !s)
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

export const strokeColorRandom = writable(pickRandom(colors))

export function setStrokeColorRandom() {
  strokeColorRandom.set(pickRandom(colors))
}

export const strokeColorTheme = derived(strokeColorThemeIndex, index => colors[index])

export const strokeColor = derived([strokeColorSource, strokeColorTheme, strokeColorRandom], ([source, themeColor, randomColor]) => {
  if (source === StrokeColorSourceType.Random) return randomColor
  return themeColor
})
