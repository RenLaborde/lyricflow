import { defineStore } from 'pinia'

const STORAGE_KEY = 'lf_songs'

function generarId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function cargarDesdeStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    console.error('Error leyendo canciones de localStorage', e)
    return []
  }
}

function guardarEnStorage(canciones) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(canciones))
  } catch (e) {
    console.error('Error guardando canciones en localStorage', e)
  }
}

export const useSongsStore = defineStore('songs', {
  state: () => ({
    canciones: cargarDesdeStorage(),
  }),

  getters: {
    totalCanciones: (state) => state.canciones.length,
  },

  actions: {
    agregarCancion(datos) {
      const nueva = {
        id: generarId(),
        titulo: datos.titulo,
        estado: datos.estado,         // starting | in_progress | done
        tipo: datos.tipo,             // single | ep | album | show
        notas: datos.notas || '',

        // más datos musicales opcionales:
        letra: datos.letra || '',
        tonalidad: datos.tonalidad || '',
        bpm: datos.bpm || null,
        progresion: datos.progresion || '',
        enlaceAudio: datos.enlaceAudio || '',
        enlaceReferencia: datos.enlaceReferencia || '',
        enlaceImagen: datos.enlaceImagen || '',

        creadaEn: new Date().toISOString(),
      }

      this.canciones.unshift(nueva)
      guardarEnStorage(this.canciones)
    },

    eliminarCancion(id) {
      this.canciones = this.canciones.filter((c) => c.id !== id)
      guardarEnStorage(this.canciones)
    },

    actualizarCancion(id, cambios) {
      const indice = this.canciones.findIndex((c) => c.id === id)
      if (indice === -1) return

      this.canciones[indice] = {
        ...this.canciones[indice],
        ...cambios,
      }

      guardarEnStorage(this.canciones)
    },
  },
})
