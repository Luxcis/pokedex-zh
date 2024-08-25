import { StateCreator } from 'zustand'

export interface LayoutSlice {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
}

export const createLayoutSlice: StateCreator<
  LayoutSlice,
  [],
  [],
  LayoutSlice
> = (set, get) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed })
})
