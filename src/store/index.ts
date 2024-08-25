import { create } from 'zustand'
import { LayoutSlice, createLayoutSlice } from './layout-slice'

export const useLayoutStore = create<LayoutSlice>()((...a) => ({
  ...createLayoutSlice(...a)
}))
