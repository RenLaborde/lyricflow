<template>
  <div class="panel-lista">
    <div class="encabezado">
      <h2 class="panel-titulo">Tus canciones</h2>
      <span class="contador">{{ totalCanciones }} en total</span>
    </div>

    <p v-if="canciones.length === 0" class="texto-vacio">
      Todavía no registraste ninguna canción. Empezá con una idea nueva 💡
    </p>

    <ul v-else class="lista">
      <li
        v-for="cancion in canciones"
        :key="cancion.id"
        class="item"
      >
        <div class="item-contenido" @click="seleccionar(cancion.id)">
          <h3 class="item-titulo">{{ cancion.titulo }}</h3>

          <div class="chips">
            <span class="chip" :class="'chip-estado-' + cancion.estado">
              {{ etiquetaEstado(cancion.estado) }}
            </span>
            <span class="chip chip-tipo">
              {{ etiquetaTipo(cancion.tipo) }}
            </span>
            <span v-if="cancion.tonalidad" class="chip chip-extra">
              {{ cancion.tonalidad }}
            </span>
            <span v-if="cancion.bpm" class="chip chip-extra">
              {{ cancion.bpm }} BPM
            </span>
          </div>

          <p v-if="cancion.notas" class="item-notas">
            {{ cancion.notas }}
          </p>

          <p class="item-meta">
            Creada el {{ formatearFecha(cancion.creadaEn) }}
          </p>
        </div>

        <button class="btn-eliminar" @click.stop="eliminar(cancion.id)">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSongsStore } from '@/stores/songs'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits(['seleccionar'])

const songsStore = useSongsStore()
const authStore = useAuthStore()
const { userId } = storeToRefs(authStore)

// filtramos canciones según el usuario actual
const canciones = computed(() =>
  songsStore.canciones.filter(
    (c) => c.userId === userId.value
  )
)

// tmb de usuario actual
const totalCanciones = computed(() => canciones.value.length)

function eliminar(id) {
  if (confirm('¿Seguro que querés borrar esta canción?')) {
    songsStore.eliminarCancion(id)
  }
}

function seleccionar(id) {
  emit('seleccionar', id)
}

function etiquetaEstado(estado) {
  switch (estado) {
    case 'starting':
      return 'Recién naciendo'
    case 'in_progress':
      return 'En proceso'
    case 'done':
      return 'Terminada'
    default:
      return estado
  }
}

function etiquetaTipo(tipo) {
  switch (tipo) {
    case 'single':
      return 'Single'
    case 'ep':
      return 'EP'
    case 'album':
      return 'Álbum'
    case 'show':
      return 'Show / Vivo'
    default:
      return tipo
  }
}

function formatearFecha(iso) {
  const fecha = new Date(iso)
  return fecha.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
</script>

<style scoped>
.panel-lista {
  background: #020617;
  border-radius: 24px;
  border: 1px solid #1f2937;
  padding: 1.6rem 1.5rem 1.4rem;
  color: #e5e7eb;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.panel-titulo {
  font-size: 1.4rem;
  margin: 0;
  color: #f9fafb;
}

.contador {
  font-size: 0.85rem;
  color: #9ca3af;
  background: #020617;
  border-radius: 999px;
  padding: 0.15rem 0.7rem;
  border: 1px solid #374151;
}

.texto-vacio {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #9ca3af;
}

.lista {
  list-style: none;
  margin: 0.5rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.4rem;
  padding: 0.7rem 0.6rem;
  border-radius: 12px;
  transition: background 0.15s ease, transform 0.15s ease;
}

.item:hover {
  background: #020617;
  transform: translateY(-1px);
}

.item-contenido {
  flex: 1;
  cursor: pointer;
}

.item-titulo {
  margin: 0;
  font-size: 1rem;
  color: #f9fafb;
}

.chips {
  margin-top: 0.3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.chip {
  font-size: 0.7rem;
  padding: 0.12rem 0.5rem;
  border-radius: 999px;
  border: 1px solid #374151;
  color: #e5e7eb;
}

.chip-estado-starting {
  border-color: #22c55e;
  color: #bbf7d0;
}

.chip-estado-in_progress {
  border-color: #eab308;
  color: #facc15;
}

.chip-estado-done {
  border-color: #22d3ee;
  color: #a5f3fc;
}

.chip-tipo {
  border-color: #6366f1;
  color: #c7d2fe;
}

.chip-extra {
  border-color: #22d3ee;
  color: #a5f3fc;
}

.item-notas {
  margin: 0.4rem 0 0;
  font-size: 0.85rem;
  color: #e5e7eb;
}

.item-meta {
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: #9ca3af;
}

.btn-eliminar {
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.1rem 0.3rem;
}
.btn-eliminar:hover {
  color: #f97373;
}
</style>
