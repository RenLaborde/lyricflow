<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <h1 class="titulo">
        Hola, {{ userId }} 👋
      </h1>

      <p class="subtitulo">
        Empezá a registrar tus canciones y a darles forma paso a paso.
      </p>

      <div class="grid-paneles">
        <div class="panel">
          <SongForm />
        </div>

        <div class="panel">
          <SongList @seleccionar="seleccionarCancion" />
          <SongDetail
            :cancion-id="cancionSeleccionadaId"
            @cerrar="cancionSeleccionadaId = null"
          />
        </div>
      </div>

      <button class="btn-salir" @click="cerrarSesion">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SongForm from '@/components/songs/SongForm.vue'
import SongList from '@/components/songs/SongList.vue'
import SongDetail from '@/components/songs/SongDetail.vue'

const router = useRouter()
const authStore = useAuthStore()

const userId = computed(() => authStore.userId)
const cancionSeleccionadaId = ref(null)

function cerrarSesion() {
  authStore.logout()
  router.push('/login')
}

function seleccionarCancion(id) {
  cancionSeleccionadaId.value = id
}

if (!authStore.isAuthenticated) {
  router.push('/login')
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: calc(100vh - 60px);
  padding: 2rem 1.5rem 3rem;
  color: #f9fafb;
  background: #010b28; 
}

.dashboard-container {
  max-width: 1100px;
  margin: 0 auto;
}

.titulo {
  font-size: 2rem;
  margin-bottom: 0.3rem;
  color: #f9fafb;
}

.subtitulo {
  color: #e5e7eb;
  margin-bottom: 1.5rem;
}

.grid-paneles {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
}

@media (min-width: 992px) {
  .grid-paneles {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
  }
}

.panel {
  width: 100%;
}

.btn-salir {
  margin-top: 1.8rem;
  border: none;
  border-radius: 999px;
  padding: 0.5rem 1.1rem;
  background: #ef4444;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-salir:hover {
  filter: brightness(1.05);
}
</style>
