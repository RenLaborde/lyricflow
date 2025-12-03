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
        <div class="item-contenido">
          <h3 class="item-titulo">{{ cancion.titulo }}</h3>

          <div class="chips">
            <span class="chip" :class="'chip-estado-' + cancion.estado">
              {{ etiquetaEstado(cancion.estado) }}
            </span>
            <span class="chip chip-tipo">
              {{ etiquetaTipo(cancion.tipo) }}
            </span>
          </div>

          <p v-if="cancion.notas" class="item-notas">
            {{ cancion.notas }}
          </p>

          <p class="item-meta">
            Creada el {{ formatearFecha(cancion.creadaEn) }}
          </p>
        </div>

        <button class="btn-eliminar" @click="eliminar(cancion.id)">
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSongsStore } from '@/stores/songs'

const songsStore = useSongsStore()

const canciones = computed(() => songsStore.canciones)
const totalCanciones = computed(() => songsStore.totalCanciones)

function eliminar(id) {
  if (confirm('¿Seguro que querés borrar esta canción?')) {
    songsStore.eliminarCancion(id)
  }
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
  padding: 1.8rem 1.6rem;
  color: #e5e7eb;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
  max-height: 600px;
  overflow-y: auto;
}

.encabezado {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.6rem;
}

.panel-titulo {
  font-size: 1.4rem;
}

.contador {
  font-size: 0.8rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.15);
  color: #e5e7eb;
}

.texto-vacio {
  margin-top: 0.8rem;
  font-size: 0.9rem;
  color: #9ca3af;
}

.lista {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(31, 41, 55, 0.7);
}

.item:last-child {
  border-bottom: none;
}

.item-titulo {
  margin: 0 0 0.2rem;
  font-size: 1rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 0.25rem;
}

.chip {
  font-size: 0.7rem;
  padding: 0.18rem 0.6rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.5);
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
  border-color: #ca25e8;
  color: #f9a8ff;
}

.item-notas {
  margin: 0.1rem 0;
  font-size: 0.85rem;
  color: #cbd5ff;
}

.item-meta {
  font-size: 0.75rem;
  color: #6b7280;
}

.btn-eliminar {
  align-self: flex-start;
  border: none;
  background: transparent;
  color: #64748b;
  font-size: 1.2rem;
  cursor: pointer;
}
.btn-eliminar:hover {
  color: #f97373;
}
</style>
