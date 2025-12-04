<template>
  <div v-if="cancion" class="panel-detalle">
    <div class="detalle-header">
      <h2 class="panel-titulo">Detalle de la canción</h2>
      <button class="btn-cerrar" @click="$emit('cerrar')">Cerrar</button>
    </div>

    <p class="detalle-subtitulo">
      Editá la información musical y de referencia.
    </p>

    <form @submit.prevent="guardarCambios">
      <!-- Título -->
      <div class="campo">
        <label class="campo-label">Título</label>
        <input
          v-model="editable.titulo"
          type="text"
          class="campo-input"
        />
      </div>

      <!-- Estado / Tipo -->
      <div class="campo fila-doble">
        <div class="columna">
          <label class="campo-label">Estado</label>
          <select v-model="editable.estado" class="campo-select">
            <option value="starting">Recién naciendo</option>
            <option value="in_progress">En proceso</option>
            <option value="done">Terminada</option>
          </select>
        </div>
        <div class="columna">
          <label class="campo-label">Tipo</label>
          <select v-model="editable.tipo" class="campo-select">
            <option value="single">Single</option>
            <option value="ep">EP</option>
            <option value="album">Álbum</option>
            <option value="show">Show / Vivo</option>
          </select>
        </div>
      </div>

      <!-- Tonalidad / BPM / Progresión -->
      <div class="campo fila-doble">
        <div class="columna">
          <label class="campo-label">Tonalidad</label>
          <select v-model="editable.tonalidad" class="campo-select">
            <option value="">Seleccionar</option>
            <option value="C mayor">C mayor</option>
            <option value="C menor">C menor</option>
            <option value="D mayor">D mayor</option>
            <option value="D menor">D menor</option>
            <option value="E mayor">E mayor</option>
            <option value="E menor">E menor</option>
            <option value="F mayor">F mayor</option>
            <option value="F menor">F menor</option>
            <option value="G mayor">G mayor</option>
            <option value="G menor">G menor</option>
            <option value="A mayor">A mayor</option>
            <option value="A menor">A menor</option>
            <option value="B mayor">B mayor</option>
            <option value="B menor">B menor</option>
          </select>
        </div>
        <div class="columna">
          <label class="campo-label">BPM</label>
          <input
            v-model.number="editable.bpm"
            type="number"
            min="40"
            max="260"
            class="campo-input"
          />
        </div>
      </div>

      <div class="campo">
        <label class="campo-label">Progresión de acordes</label>
        <input
          v-model="editable.progresion"
          type="text"
          class="campo-input"
        />
      </div>

      <!-- Letra -->
      <div class="campo">
        <label class="campo-label">Letra</label>
        <textarea
          v-model="editable.letra"
          rows="4"
          class="campo-textarea"
        ></textarea>
      </div>

      <!-- Enlaces -->
      <div class="campo">
        <label class="campo-label">Enlace a audio / demo</label>
        <input
          v-model="editable.enlaceAudio"
          type="url"
          class="campo-input"
        />
      </div>

      <div class="campo">
        <label class="campo-label">Enlace de referencia</label>
        <input
          v-model="editable.enlaceReferencia"
          type="url"
          class="campo-input"
        />
      </div>

      <div class="campo">
        <label class="campo-label">Imagen / portada (URL)</label>
        <input
          v-model="editable.enlaceImagen"
          type="url"
          class="campo-input"
        />
      </div>

      <!-- Notas -->
      <div class="campo">
        <label class="campo-label">Notas</label>
        <textarea
          v-model="editable.notas"
          rows="3"
          class="campo-textarea"
        ></textarea>
      </div>

      <button type="submit" class="btn-primario">
        Guardar cambios
      </button>
    </form>
  </div>

  <p v-else class="placeholder">
    Seleccioná una canción de la lista para ver y editar su detalle.
  </p>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useSongsStore } from '@/stores/songs'

const props = defineProps({
  cancionId: {
    type: String,
    default: null,
  },
})

const emit = defineEmits(['cerrar'])

const songsStore = useSongsStore()

const cancion = computed(() =>
  songsStore.canciones.find((c) => c.id === props.cancionId) || null,
)

const editable = reactive({
  titulo: '',
  estado: '',
  tipo: '',
  notas: '',
  letra: '',
  tonalidad: '',
  bpm: null,
  progresion: '',
  enlaceAudio: '',
  enlaceReferencia: '',
  enlaceImagen: '',
})

// cuando cambia la canción seleccionada, copiamos sus datos al objeto editable
watch(
  () => cancion.value,
  (nueva) => {
    if (!nueva) return
    editable.titulo = nueva.titulo
    editable.estado = nueva.estado
    editable.tipo = nueva.tipo
    editable.notas = nueva.notas || ''
    editable.letra = nueva.letra || ''
    editable.tonalidad = nueva.tonalidad || ''
    editable.bpm = nueva.bpm || null
    editable.progresion = nueva.progresion || ''
    editable.enlaceAudio = nueva.enlaceAudio || ''
    editable.enlaceReferencia = nueva.enlaceReferencia || ''
    editable.enlaceImagen = nueva.enlaceImagen || ''
  },
  { immediate: true },
)

function guardarCambios() {
  if (!cancion.value) return

  songsStore.actualizarCancion(cancion.value.id, {
    ...editable,
  })
}
</script>

<style scoped>
.panel-detalle {
  margin-top: 1.5rem;
  background: #020617;
  border-radius: 24px;
  border: 1px solid #1f2937;
  padding: 1.6rem 1.5rem 1.5rem;
  color: #e5e7eb;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
}

.detalle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-titulo {
  font-size: 1.3rem;
}

.detalle-subtitulo {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 1.2rem;
}

.campo {
  margin-bottom: 1rem;
}

.campo-label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: #d1d5db;
}

.campo-input,
.campo-select,
.campo-textarea {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  outline: none;
  font-size: 0.95rem;
  resize: vertical;
}

.campo-input:focus,
.campo-select:focus,
.campo-textarea:focus {
  border-color: #22d3ee;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.3);
}

.fila-doble {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}

@media (min-width: 600px) {
  .fila-doble {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.columna {
  width: 100%;
}

.btn-primario {
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.6rem 0.75rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #22d3ee, #6366f1, #ca25e8);
  color: #020617;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.95rem;
}

.btn-primario:hover {
  filter: brightness(1.07);
  background: linear-gradient(135deg, #ca25e8, #6366f1, #22d3ee);
}

.btn-cerrar {
  border: none;
  border-radius: 999px;
  padding: 0.25rem 0.8rem;
  background: #111827;
  color: #e5e7eb;
  font-size: 0.8rem;
  cursor: pointer;
}
.btn-cerrar:hover {
  background: #1f2937;
}

.placeholder {
  margin-top: 1.5rem;
  font-size: 0.9rem;
  color: #9ca3af;
}
</style>
