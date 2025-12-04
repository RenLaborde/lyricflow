import { defineStore } from 'pinia'
import { useSongsStore } from './songs'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // para leer el usuario guardado
    userId: localStorage.getItem('lf_user_id') || '',
  }),

  getters: {
    isAuthenticated: (state) => !!state.userId,
  },

  actions: {
    login(id) {
      this.userId = id
      localStorage.setItem('lf_user_id', id)

      // limpiamos selección de canción al cambiar de usuario
      const songsStore = useSongsStore()
      songsStore.selectedId = null
    },

    logout() {
      this.userId = ''
      localStorage.removeItem('lf_user_id')

      const songsStore = useSongsStore()
      songsStore.selectedId = null
    },
  },
})
