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
