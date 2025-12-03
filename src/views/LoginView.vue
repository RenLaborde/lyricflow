<template>
  <div class="login-wrapper">
    <div class="login-card">
      <h1 class="title mb-1">Bienvenida inspiración...</h1>
      <p class="subtitle mb-4">
        Donde tus canciones cobran vida ✨
      </p>

      <form @submit.prevent="onLogin">
        <div class="mb-3">
          <label for="userId" class="label">ID alfanumérico</label>
          <input
            id="userId"
            v-model="userId"
            type="text"
            class="input"
            placeholder="Ej: renata123"
          />
          <p v-if="error" class="error mt-1">{{ error }}</p>
        </div>

        <button class="btn" @click="onLogin">
          Entrar
        </button>
      </form>

      <p class="hint mt-3">
        Más adelante este ID será tu usuario para guardar tus canciones.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const userId = ref('')
const error = ref('')

const router = useRouter()
const authStore = useAuthStore()

function onLogin() {
  const value = userId.value.trim()

  if (!value) {
    error.value = 'Por favor, ingresá un ID.'
    return
  }

  if (!/^[a-z0-9]+$/i.test(value)) {
    error.value = 'Usá solo letras y números, sin espacios (ej: renata123).'
    return
  }

  error.value = ''

  // Guardar en Pinia + localStorage
  authStore.login(value)

  // Ir al dashboard
  router.push('/dashboard')
}
</script>

<style scoped>
.login-wrapper {
  min-height: calc(100vh - 60px); 
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.login-card {
  width: 100%;
  max-width: 640px;
  background: #020617;
  border-radius: 24px;
  border: 1px solid #1f2937;
  padding: 2.2rem 2rem 2rem;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.65);
  color: #e5e7eb;
}


.logo-letter {
  font-weight: 800;
  font-size: 1.2rem;
  color: #e5e7eb;
}

.title {
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 0.1rem;
  color: #f9fafb;
}

.subtitle {
  margin: 0.2rem 0 1.4rem;
  color: #e5e7eb;
  font-size: 0.95rem;
}

.label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
  color: #d1d5db;
}

.input {
  width: 100%;
  padding: 0.55rem 0.75rem;
  border-radius: 10px;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
  outline: none;
  font-size: 0.95rem;
}
.input::placeholder {
  color: #6b7280;
}
.input:focus {
  border-color: #22d3ee;
  box-shadow: 0 0 0 1px rgba(34, 211, 238, 0.3);
}

.error {
  color: #f97373;
  font-size: 0.8rem;
}

.btn {
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
.btn:hover {
  filter: brightness(1.07);
  background: linear-gradient(135deg, #ca25e8, #6366f1, #22d3ee);
}

.hint {
  font-size: 0.8rem;
  color: #6b7280;
  text-align: center;
}
</style>
