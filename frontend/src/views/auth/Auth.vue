<template>
  <div class="min-h-screen bg-background flex items-center justify-center p-4 font-sans text-text-primary">
    <div class="w-full max-w-md bg-surface border border-border-light rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
      
      <div class="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full"></div>

      <div class="text-center mb-10">
        <div class="inline-block p-4 bg-surface-light border border-primary/30 rounded-3xl mb-4 shadow-teal-glow">
          <Rocket class="text-primary" :size="32" />
        </div>
        <h1 class="text-4xl font-black italic tracking-tighter uppercase">
          <span class="text-transparent bg-clip-text bg-accent">Pad</span><span class="text-text-primary">PRO</span>
        </h1>
        <p class="text-[10px] font-bold text-text-tertiary tracking-[0.4em] mt-2 uppercase">Strategy Board</p>
      </div>

      <div class="flex p-1.5 bg-background border border-border rounded-2xl mb-8">
        <button @click="isLogin = true" :class="[
          'flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-500',
          isLogin ? 'bg-primary text-background shadow-lg' : 'text-text-tertiary hover:text-primary/70'
        ]">
          Login
        </button>
        <button @click="isLogin = false" :class="[
          'flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all duration-500',
          !isLogin ? 'bg-primary text-background shadow-lg' : 'text-text-tertiary hover:text-primary/70'
        ]">
          Register
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="group">
          <label class="block text-[10px] font-black text-text-tertiary uppercase tracking-[0.25em] mb-2 ml-1 group-focus-within:text-accent">
            Username
          </label>
          <div class="relative flex items-center">
            <div class="absolute left-4 text-text-tertiary group-focus-within:text-accent transition-colors">
              <User :size="20" />
            </div>
            <input v-model="form.username" type="text"
              class="w-full bg-surface-light border border-border text-text-primary p-4 pl-12 rounded-2xl focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all placeholder:text-text-disabled/20 font-medium"
              placeholder="Your username" required />
          </div>
        </div>

        <div class="pt-2">
          <div class="flex justify-between items-center mb-4">
            <span class="text-[10px] font-black text-text-tertiary uppercase tracking-[0.25em] ml-1">Security</span>
            <div class="flex gap-2">
              <button type="button" @click="authMethod = 'password'" :class="[
                'text-[9px] px-3 py-1.5 rounded-lg border-2 transition-all font-black uppercase',
                authMethod === 'password' ? 'border-primary text-primary bg-primary/5' : 'border-border text-text-tertiary'
              ]">
                Password
              </button>
              <button type="button" @click="authMethod = 'pattern'" :class="[
                'text-[9px] px-3 py-1.5 rounded-lg border-2 transition-all font-black uppercase',
                authMethod === 'pattern' ? 'border-primary text-primary bg-primary/5' : 'border-border text-text-tertiary'
              ]">
                Pattern
              </button>
            </div>
          </div>

          <div v-if="authMethod === 'password'" class="group animate-in fade-in zoom-in-95 duration-500">
            <div class="relative flex items-center">
              <div class="absolute left-4 text-text-tertiary group-focus-within:text-primary transition-colors">
                <Lock :size="20" />
              </div>
              <input v-model="form.password" type="password"
                class="w-full bg-surface-light border border-border text-text-primary p-4 pl-12 rounded-2xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-text-disabled/20 shadow-inner font-medium"
                placeholder="Password" />
            </div>
          </div>
          

          <div v-else class="animate-in fade-in zoom-in-95 duration-500">
  <PatternLock v-model="form.pattern" />
</div>
        </div>

        <button type="submit" class="group relative w-full py-5 font-black rounded-2xl 
          transition-all duration-300 mt-4 tracking-[0.3em] overflow-hidden 
          border border-white/10
          bg-primary text-white shadow-[0_0_15px_rgba(0,161,155,0.4)]
          hover:bg-accent hover:text-background hover:shadow-[0_0_25px_rgba(204,255,0,0.6)]
          active:scale-[0.97]">

          <span class="relative z-10 flex items-center justify-center gap-2 drop-shadow-lg uppercase">
            <LogIn :size="18" />
            {{ isLogin ? 'Login' : 'Register' }}
          </span>

          <div class="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12">
          </div>
        </button>
      </form>

      <div class="mt-8 pt-6 border-t border-border/50 text-center">
        <p class="text-[9px] text-text-tertiary font-medium uppercase tracking-[0.3em]">
          PadPRO Todo • <span class="text-primary/70">v1.0</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Zap, User, Lock, FingerprintPattern, Power ,Rocket, Fingerprint ,LogIn} from 'lucide-vue-next';
import { mapActions } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { authApi } from '@/api/auth'
import PatternLock from '@/components/PatternLock.vue';

export default {

  components: {
    Zap,
    User,
    PatternLock,
    Lock,
    FingerprintPattern,
    Power,
    Rocket,
    Fingerprint,
    LogIn
  },

  data() {
    return {
      isLogin: true,
      authMethod: 'password',
      form: {
        username: '',
        password: '',
        pattern: ''
      }
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['login']),

    async handleSubmit() {
      const payload = {
        username: this.form.username,
        ...(this.authMethod === 'password' ? { password: this.form.password } : { pattern: this.form.pattern })
      };

      try {
        if (this.isLogin) {
          await this.login(payload);
          this.$router.push('/dashboard');
        } else {
          await authApi.register(payload);
          this.isLogin = true;
          alert('Welcome to the Team! Please login.');
        }
      } catch (err) {
        alert(err.response?.data?.error || 'System Error: Access Denied');
      }
    }
  }
}
</script>