<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 text-slate-50 flex flex-col">
    <!-- Top link -->
    <div class="max-w-5xl mx-auto w-full px-4 pt-6">
      <NuxtLink to="/" class="inline-flex items-center gap-2 text-slate-200/80 hover:text-white transition">
        <i class="pi pi-arrow-left text-sm"></i>
        <span class="text-sm">Voltar para home</span>
      </NuxtLink>
    </div>

    <!-- Center card -->
    <div class="flex-1 grid place-items-center px-4 py-10">
      <div
          class="w-full max-w-xl bg-white text-slate-800 rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,.35)] ring-1 ring-black/5 p-6 sm:p-8"
      >
        <!-- Logo -->
        <div class="flex justify-center">
          <div
              class="h-14 w-14 rounded-2xl grid place-items-center bg-gradient-to-br from-orange-400 to-orange-500 text-white shadow-[0_0_40px_rgba(249,115,22,.35)]"
          >
            <i class="pi pi-box text-xl"></i>
          </div>
        </div>

        <h1 class="text-center text-2xl font-bold mt-4">Entrega Express</h1>
        <p class="text-center text-slate-500 mt-1">Entre ou crie sua conta para começar</p>

        <!-- Tabs -->
        <div class="mt-6 grid grid-cols-2 bg-slate-100 rounded-xl p-1 text-sm font-medium">
          <button
              class="py-2 rounded-lg transition"
              :class="tab === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'"
              @click="tab = 'login'"
          >
            Entrar
          </button>
          <button
              class="py-2 rounded-lg transition"
              :class="tab === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500 hover:text-slate-700'"
              @click="tab = 'register'"
          >
            Criar Conta
          </button>
        </div>

        <!-- LOGIN -->
        <form v-if="tab === 'login'" class="mt-6 space-y-4" @submit.prevent="onLogin">
          <div>
            <label class="text-sm text-slate-600">Email</label>
            <InputText v-model="loginForm.email" type="email" class="mt-1 w-full" />
            <p v-if="loginErrors.email" class="text-xs text-red-600 mt-1">{{ loginErrors.email }}</p>
          </div>
          <div>
            <label class="text-sm text-slate-600">Senha</label>
            <Password v-model="loginForm.password" :feedback="false" toggleMask class="mt-1 w-full" inputClass="w-full" />
            <p v-if="loginErrors.password" class="text-xs text-red-600 mt-1">{{ loginErrors.password }}</p>
          </div>

          <button
              type="submit"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_10px_30px_rgba(234,88,12,.35)] hover:from-orange-600 hover:to-orange-700 transition"
          >
            Entrar
          </button>
        </form>

        <!-- REGISTER -->
        <form v-else class="mt-6 space-y-4" @submit.prevent="onRegister">
          <div class="grid sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-slate-600">Nome</label>
              <InputText v-model="registerForm.name" class="mt-1 w-full" />
              <p v-if="registerErrors.name" class="text-xs text-red-600 mt-1">{{ registerErrors.name }}</p>
            </div>
            <div>
              <label class="text-sm text-slate-600">Email</label>
              <InputText v-model="registerForm.email" type="email" class="mt-1 w-full" />
              <p v-if="registerErrors.email" class="text-xs text-red-600 mt-1">{{ registerErrors.email }}</p>
            </div>
          </div>
          <div>
            <label class="text-sm text-slate-600">Senha</label>
            <Password v-model="registerForm.password" :feedback="false" toggleMask class="mt-1 w-full" inputClass="w-full" />
            <p v-if="registerErrors.password" class="text-xs text-red-600 mt-1">{{ registerErrors.password }}</p>
          </div>

          <button
              type="submit"
              class="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_10px_30px_rgba(234,88,12,.35)] hover:from-orange-600 hover:to-orange-700 transition"
          >
            Criar Conta
          </button>

          <button
              class="mt-4 w-full rounded-lg bg-red-600 text-white font-medium py-2 hover:bg-red-700 transition"
              @click="throwError"
          >
            💥 Testar Erro Global
          </button>

        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as yup from 'yup'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import { useToast } from '@/composables/useToast'
import { useAuthStore } from '@/stores/auth'

definePageMeta({ layout: false })

const toast = useToast()
const tab = ref<'login' | 'register'>('login')

const loginForm = reactive({ email: '', password: '' })
const loginErrors = reactive<{ email?: string; password?: string }>({})
const loginSchema = yup.object({
  email: yup.string().email('Email inválido').required('Informe o email'),
  password: yup.string().min(4, 'Mínimo 4 caracteres').required('Informe a senha'),
})

function throwError() {
  // erro proposital
  throw new Error('Erro de teste do Clarity/GA4 (gerado manualmente no botão de login)')
}

async function onLogin() {
  loginErrors.email = loginErrors.password = undefined
  try {
    await loginSchema.validate(loginForm, { abortEarly: false })

    const auth = useAuthStore()

    await auth.loginMock(loginForm.email, loginForm.password)

    toast.success('Login realizado com sucesso!')
    await navigateTo('/deliveries/new')
  } catch (e: any) {
    if (e?.name === 'ValidationError') {
      for (const err of e.inner) loginErrors[err.path as 'email' | 'password'] = err.message
    } else {
      toast.error('Falha no login', e?.message || 'Verifique suas credenciais')
    }
  }
}


const registerForm = reactive({ name: '', email: '', password: '' })
const registerErrors = reactive<{ name?: string; email?: string; password?: string }>({})
const registerSchema = yup.object({
  name: yup.string().required('Informe seu nome'),
  email: yup.string().email('Email inválido').required('Informe o email'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Crie uma senha'),
})

async function onRegister() {
  registerErrors.name = registerErrors.email = registerErrors.password = undefined
  try {
    await registerSchema.validate(registerForm, { abortEarly: false })
    toast.success('Conta criada!')
    tab.value = 'login'
    loginForm.email = registerForm.email
  } catch (e: any) {
    if (e?.name === 'ValidationError') {
      for (const err of e.inner) registerErrors[err.path as 'name' | 'email' | 'password'] = err.message
    } else {
      toast.error('Erro ao criar conta', e?.response?.data?.message)
    }
  }
}
</script>

<style scoped>
:deep(.p-inputtext),
:deep(.p-password .p-inputtext) {
  @apply w-full rounded-lg border border-transparent bg-[#eaf1ff] text-slate-800 placeholder-slate-400;
}
:deep(.p-inputtext:focus),
:deep(.p-password .p-inputtext:focus) {
  @apply ring-2 ring-orange-200 border-orange-400 bg-white;
}

:deep(.p-button) {
  @apply bg-orange-500 border-orange-500 hover:bg-orange-600 hover:border-orange-600 rounded-xl py-3 font-semibold;
}
</style>
