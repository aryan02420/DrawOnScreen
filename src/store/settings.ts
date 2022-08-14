import { writable, derived } from 'svelte/store'

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
