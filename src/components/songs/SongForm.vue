<template>
  <div class="panel-cancion">
    <h2 class="panel-titulo">Nueva canción</h2>
    <p class="panel-subtitulo">
      Guardá una idea para no olvidarla ✨
    </p>

    <form @submit.prevent="manejarEnvio">
      <!-- Título -->
      <div class="campo">
        <label for="titulo" class="campo-label">Título *</label>
        <input
          id="titulo"
          v-model="titulo"
          type="text"
          class="campo-input"
          placeholder="Ej: Modo menor"
        />
        <p v-if="errores.titulo" class="campo-error">
          {{ errores.titulo }}
        </p>
      </div>

      <!-- Estado -->
      <div class="campo">
        <label for="estado" class="campo-label">Estado</label>
        <select
          id="estado"
          v-model="estado"
          class="campo-select"
        >
          <option value="starting">Recién naciendo</option>
          <option value="in_progress">En proceso</option>
          <option value="done">Terminada</option>
        </select>
      </div>

      <!-- Tipo -->
      <div class="campo">
        <label for="tipo" class="campo-label">Tipo</label>
        <select
          id="tipo"
          v-model="tipo"
          class="campo-select"
        >
          <option value="single">Single</option>
          <option value="ep">EP</option>
          <option value="album">Álbum</option>
          <option value="show">Show / Vivo</option>
        </select>
      </div>

      <!-- Tonalidad -->
      <div class="campo">
        <label for="tonalidad" class="campo-label">Tonalidad</label>
        <select
          id="tonalidad"
          v-model="tonalidad"
          class="campo-select"
        >
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

      <!-- BPM + Progresión -->
      <div class="campo fila-doble">
        <div class="columna">
          <label for="bpm" class="campo-label">BPM</label>
          <input
            id="bpm"
            v-model.number="bpm"
            type="number"
            min="40"
            max="260"
            class="campo-input"
            placeholder="Ej: 120"
          />
        </div>

        <div class="columna">
          <label for="progresion" class="campo-label">
            Progresión de acordes
          </label>
          <input
            id="progresion"
            v-model="progresion"
            type="text"
            class="campo-input"
            placeholder="Ej: Am – F – C – G"
          />
        </div>
      </div>

      <!-- Letra -->
      <div class="campo">
        <label for="letra" class="campo-label">Letra</label>
        <textarea
          id="letra"
          v-model="letra"
          rows="4"
          class="campo-textarea"
          placeholder="Escribí acá la letra completa o un primer borrador..."
        ></textarea>
      </div>

      <!-- Enlaces -->
      <div class="campo">
        <label for="enlaceAudio" class="campo-label">
          Enlace a audio / demo
        </label>
        <input
          id="enlaceAudio"
          v-model="enlaceAudio"
          type="url"
          class="campo-input"
          placeholder="Ej: link de Drive, SoundCloud, etc."
        />
      </div>

      <div class="campo">
        <label for="enlaceReferencia" class="campo-label">
          Enlace de referencia
        </label>
        <input
          id="enlaceReferencia"
          v-model="enlaceReferencia"
          type="url"
          class="campo-input"
          placeholder="Ej: tema de referencia en YouTube / Spotify"
        />
      </div>

      <div class="campo">
        <label for="enlaceImagen" class="campo-label">
          Imagen / portada (URL)
        </label>
        <input
          id="enlaceImagen"
          v-model="enlaceImagen"
          type="url"
          class="campo-input"
          placeholder="Moodboard, portada, etc."
        />
      </div>

      <!-- Notas -->
      <div class="campo">
        <label for="notas" class="campo-label">Notas</label>
        <textarea
          id="notas"
          v-model="notas"
          rows="3"
          class="campo-textarea"
          placeholder="Notas sobre la producción, sensaciones, cosas a probar..."
        ></textarea>
      </div>

      <button type="submit" class="btn-primario">
        Guardar canción
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useSongsStore } from '@/stores/songs'

const songsStore = useSongsStore()

const titulo = ref('')
const estado = ref('starting')
const tipo = ref('single')
const notas = ref('')

const letra = ref('')
const tonalidad = ref('')
const bpm = ref(null)
const progresion = ref('')
const enlaceAudio = ref('')
const enlaceReferencia = ref('')
const enlaceImagen = ref('')

const errores = reactive({
  titulo: '',
})

function limpiarFormulario() {
  titulo.value = ''
  estado.value = 'starting'
  tipo.value = 'single'
  notas.value = ''
  letra.value = ''
  tonalidad.value = ''
  bpm.value = null
  progresion.value = ''
  enlaceAudio.value = ''
  enlaceReferencia.value = ''
  enlaceImagen.value = ''
  errores.titulo = ''
}

function manejarEnvio() {
  errores.titulo = ''

  if (!titulo.value.trim()) {
    errores.titulo = 'El título es obligatorio.'
    return
  }

  songsStore.agregarCancion({
    titulo: titulo.value.trim(),
    estado: estado.value,
    tipo: tipo.value,
    notas: notas.value.trim(),
    letra: letra.value.trim(),
    tonalidad: tonalidad.value,
    bpm: bpm.value || null,
    progresion: progresion.value.trim(),
    enlaceAudio: enlaceAudio.value.trim(),
    enlaceReferencia: enlaceReferencia.value.trim(),
    enlaceImagen: enlaceImagen.value.trim(),
  })

  limpiarFormulario()
}
</script>

<style scoped>
.panel-cancion {
  background: #020617;
  border-radius: 24px;
  border: 1px solid #1f2937;
  padding: 1.8rem 1.6rem;
  color: #e5e7eb;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
}

.panel-titulo {
  font-size: 1.4rem;
  margin-bottom: 0.2rem;
  color: #f9fafb;
}

.panel-subtitulo {
  font-size: 0.9rem;
  color: #9ca3af;
  margin-bottom: 1.4rem;
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

.campo-input::placeholder,
.campo-textarea::placeholder {
  color: #6b7280;
}

.campo-input:focus,
.campo-select:focus,
.campo-textarea:focus {
  border-color: #22d3ee;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.3);
}

.campo-error {
  margin-top: 0.25rem;
  font-size: 0.8rem;
  color: #f97373;
}

.fila-doble {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 0.75rem;
}

@media (min-width: 600px) {
  .fila-doble {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
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
</style>
