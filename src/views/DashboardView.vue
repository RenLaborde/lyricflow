<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-container">
      <h1 class="titulo">
        Hola, {{ userId }} 👋
      </h1>

      <p class="subtitulo">
        Empezá a registrar tus canciones y ver cómo crece tu universo musical.
      </p>

      <div class="grid-paneles">
        <div class="panel">
          <SongForm />
        </div>

        <div class="panel">
          <SongList />
        </div>
      </div>

      <button class="btn-salir" @click="cerrarSesion">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SongForm from '@/components/songs/SongForm.vue'
import SongList from '@/components/songs/SongList.vue'

const router = useRouter()
const authStore = useAuthStore()

const userId = computed(() => authStore.userId)

function cerrarSesion() {
  authStore.logout()
  router.push('/login')
}

// Si alguien entra a /dashboard sin estar logueado, lo mandamos al login
if (!authStore.isAuthenticated) {
  router.push('/login')
}
</script>

<style scoped>
.dashboard-wrapper {
  min-height: calc(100vh - 60px);
  padding: 2rem 1.5rem 3rem;
  color: #f9fafb;
}

.dashboard-container {
  max-width: 1100px;
  margin: 0 auto;
}

.titulo {
  font-size: 2rem;
  margin-bottom: 0.3rem;
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

/* En pantallas grandes, dos columnas */
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
