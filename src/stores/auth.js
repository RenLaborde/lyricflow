import { defineStore } from 'pinia'

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
    },
    logout() {
      this.userId = ''
      localStorage.removeItem('lf_user_id')
    },
  },
})
