import { writable, derived } from 'svelte/store'

export enum AppMode {
  draw = 'APPMODE:DRAW',
  quiet = 'APPMODE:QUIET',
}
export type Position = [number, number]

export const appMode = writable<AppMode>(AppMode.quiet)

export const isDrawMode = derived(appMode, (v) => v === AppMode.draw)
export const isQuietMode = derived(appMode, (v) => v === AppMode.quiet)

export const position = writable<Position>([0, 0])
