<template>
  <div class="min-h-screen bg-pearl flex items-center justify-center p-4 font-sans">
    <!-- Ambient glow -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div class="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-border rounded-full blur-[120px] opacity-50" />
      <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-border rounded-full blur-[100px] opacity-30" />
    </div>

    <div class="relative z-10 w-full max-w-md rounded-2xl bg-surface-glass backdrop-blur-lg border border-border shadow-sm p-8 md:p-10">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent text-surface mb-4">
          <Rocket :size="28" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight text-text-primary">
          Pad<span class="font-black">PRO</span>
        </h1>
        <p class="text-xs font-medium text-text-secondary tracking-widest uppercase mt-1">
          Strategy Board
        </p>
      </div>

      <div class="flex p-1 bg-surface-light rounded-xl mb-6">
        <button
          type="button"
          :class="[
            'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
            isLogin
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          ]"
          @click="isLogin = true"
        >
          Login
        </button>
        <button
          type="button"
          :class="[
            'flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200',
            !isLogin
              ? 'bg-surface text-text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
          ]"
          @click="isLogin = false"
        >
          Register
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-1.5">
            Username
          </label>
          <div class="relative">
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
              <User :size="18" />
            </div>
            <input
              v-model="form.username"
              type="text"
              class="w-full bg-surface border border-border text-text-primary placeholder:text-text-secondary/60 pl-10 pr-4 py-3 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              placeholder="Your username"
              required
            >
          </div>
        </div>

        <div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-xs font-semibold text-text-secondary uppercase tracking-wider">Security</span>
            <div class="flex gap-1.5">
              <button
                type="button"
                :class="[
                  'text-xs px-2.5 py-1 rounded-lg font-medium transition-all',
                  authMethod === 'password'
                    ? 'bg-accent text-surface'
                    : 'bg-surface-light text-text-secondary hover:text-text-primary'
                ]"
                @click="authMethod = 'password'"
              >
                Password
              </button>
              <button
                type="button"
                :class="[
                  'text-xs px-2.5 py-1 rounded-lg font-medium transition-all',
                  authMethod === 'pattern'
                    ? 'bg-accent text-surface'
                    : 'bg-surface-light text-text-secondary hover:text-text-primary'
                ]"
                @click="authMethod = 'pattern'"
              >
                Pattern
              </button>
            </div>
          </div>

          <div v-if="authMethod === 'password'" class="relative">
            <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary">
              <Lock :size="18" />
            </div>
            <input
              v-model="form.password"
              type="password"
              class="w-full bg-surface border border-border text-text-primary placeholder:text-text-secondary/60 pl-10 pr-4 py-3 rounded-xl focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              :placeholder="isLogin ? 'Password' : 'Choose a password (optional with Pattern)'"
            >
          </div>

          <div v-else>
            <PatternLock v-model="form.pattern" />
          </div>
        </div>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full py-3.5 rounded-xl font-semibold text-surface bg-accent hover:bg-accent-hover focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <LogIn v-if="!submitting" :size="18" />
          <span v-if="submitting">Please wait...</span>
          <span v-else>{{ isLogin ? 'Login' : 'Register' }}</span>
        </button>
      </form>

      <p class="mt-6 pt-4 border-t border-border text-center text-xs text-text-secondary">
        PadPRO · Gamified Kanban
      </p>
    </div>
  </div>
</template>

<script>
import { User, Lock, Rocket, LogIn } from 'lucide-vue-next'
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'
import Swal from 'sweetalert2'
import PatternLock from '@/components/PatternLock.vue'

export default {
  name: 'AuthView',

  components: {
    User,
    Lock,
    Rocket,
    LogIn,
    PatternLock,
  },

  data() {
    return {
      isLogin: true,
      authMethod: 'password',
      submitting: false,
      form: {
        username: '',
        password: '',
        pattern: '',
      },
    }
  },

  methods: {
    ...mapActions(useAuthStore, ['login']),

    async handleSubmit() {
      const payload = {
        username: this.form.username.trim(),
        ...(this.authMethod === 'password'
          ? { password: this.form.password }
          : { pattern: this.form.pattern }),
      }

      if (this.isLogin && this.authMethod === 'password' && !payload.password) {
        Swal.fire({
          icon: 'warning',
          title: 'Password required',
          text: 'Please enter your password to login.',
          confirmButtonColor: '#111827',
        })
        return
      }

      if (!this.isLogin && this.authMethod === 'password' && !payload.password && !payload.pattern) {
        Swal.fire({
          icon: 'warning',
          title: 'Security required',
          text: 'Please set either a password or a pattern.',
          confirmButtonColor: '#111827',
        })
        return
      }

      this.submitting = true
      try {
        if (this.isLogin) {
          await this.login(payload)
          await Swal.fire({
            icon: 'success',
            title: 'Welcome back',
            text: 'Redirecting to your board...',
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true,
          })
          this.$router.push('/board')
        } else {
          await authApi.register(payload)
          await Swal.fire({
            icon: 'success',
            title: 'Account created',
            text: 'Please login with your credentials.',
            confirmButtonColor: '#111827',
          })
          this.isLogin = true
          this.form.password = ''
          this.form.pattern = ''
        }
      } catch (err) {
        const msg = err.response?.data?.error || 'Something went wrong. Please try again.'
        Swal.fire({
          icon: 'error',
          title: this.isLogin ? 'Login failed' : 'Registration failed',
          text: msg,
          confirmButtonColor: '#111827',
        })
      } finally {
        this.submitting = false
      }
    },
  },
}
</script>
