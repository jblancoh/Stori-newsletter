import { create } from 'zustand'

const useStore = create((set) => ({
  newsletters: [],
  setNewsletters: (newsletters) => set({ newsletters }),
  addNewsletter: (newsletter) => set((state) => ({ newsletters: [...state.newsletters, newsletter] })),
}))

export const setNewsletters = (newsletters) => useStore.getState().setNewsletters(newsletters)

export default useStore