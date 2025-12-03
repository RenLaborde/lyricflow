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

      <!-- Notas -->
      <div class="campo">
        <label for="notas" class="campo-label">Notas</label>
        <textarea
          id="notas"
          v-model="notas"
          rows="3"
          class="campo-textarea"
          placeholder="Referencias, atmósfera, ideas de letra, tono, etc."
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

const errores = reactive({
  titulo: '',
})

function limpiarFormulario() {
  titulo.value = ''
  estado.value = 'starting'
  tipo.value = 'single'
  notas.value = ''
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

/* Campos */

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

/* Botones */

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
